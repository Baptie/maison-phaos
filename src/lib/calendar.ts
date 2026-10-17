import ical, { type VEvent } from "node-ical";
import { site } from "@/config/site";
import { evenementsFactices } from "./mock-data";
import type { Evenement, Resultat } from "./types";

/**
 * Lecture des événements depuis l'agenda Google de l'association,
 * via son « adresse secrète au format iCal ». L'agenda reste privé.
 * Le site relit l'agenda toutes les `site.rafraichissement` secondes, sans redéploiement.
 * Sans GOOGLE_CALENDAR_ICS_URL, renvoie des événements de démonstration.
 */

const icsUrl = process.env.GOOGLE_CALENDAR_ICS_URL;
const HORIZON_JOURS = 180;

function texte(v: unknown): string | undefined {
  if (!v) return undefined;
  if (typeof v === "string") return v.trim() || undefined;
  if (typeof v === "object" && v && "val" in v) return String((v as { val: unknown }).val).trim() || undefined;
  return undefined;
}

type EvBase = {
  start: Date;
  end?: Date;
  datetype?: string;
  summary?: unknown;
  location?: unknown;
  description?: unknown;
};

function versEvenement(ev: EvBase, debut: Date, id: string): Evenement {
  const duree = ev.end ? ev.end.getTime() - ev.start.getTime() : 0;
  const journeeEntiere = ev.datetype === "date";
  return {
    id,
    titre: texte(ev.summary) ?? "Événement",
    debut: debut.toISOString(),
    fin: duree ? new Date(debut.getTime() + duree).toISOString() : undefined,
    journeeEntiere,
    lieu: texte(ev.location),
    description: texte(ev.description),
  };
}

export async function getEvenements(limite = 6): Promise<Resultat<Evenement[]>> {
  if (!icsUrl) return { donnees: evenementsFactices().slice(0, limite), factice: true };

  try {
    const res = await fetch(icsUrl, { next: { revalidate: site.rafraichissement } });
    if (!res.ok) throw new Error(`Google Agenda a répondu ${res.status}`);
    const donnees = ical.sync.parseICS(await res.text());

    const maintenant = new Date();
    // On garde aussi les événements commencés dans la journée
    const depuis = new Date(maintenant);
    depuis.setHours(0, 0, 0, 0);
    const jusqua = new Date(maintenant.getTime() + HORIZON_JOURS * 86400000);

    const liste: Evenement[] = [];
    for (const item of Object.values(donnees)) {
      if (!item || item.type !== "VEVENT") continue;
      const ev = item as VEvent;
      if (ev.status === "CANCELLED") continue;

      if (ev.rrule) {
        const exclues = new Set(
          Object.values(ev.exdate ?? {}).map((d) => new Date(d as Date).toISOString().slice(0, 10))
        );
        for (const occ of ev.rrule.between(depuis, jusqua, true)) {
          const cle = occ.toISOString().slice(0, 10);
          if (exclues.has(cle)) continue;
          // Occurrence modifiée individuellement dans l'agenda
          const modif = ev.recurrences?.[cle];
          if (modif) {
            if (modif.status !== "CANCELLED")
              liste.push(versEvenement(modif as EvBase, (modif as EvBase).start, `${ev.uid}-${cle}`));
          } else {
            liste.push(versEvenement(ev as EvBase, occ, `${ev.uid}-${cle}`));
          }
        }
      } else if (ev.start >= depuis && ev.start <= jusqua) {
        liste.push(versEvenement(ev as EvBase, ev.start, ev.uid));
      }
    }

    liste.sort((a, b) => a.debut.localeCompare(b.debut));
    return { donnees: liste.slice(0, limite), factice: false };
  } catch (e) {
    console.error("[agenda]", e);
    return { donnees: [], factice: false, erreur: "L'agenda est momentanément indisponible." };
  }
}
