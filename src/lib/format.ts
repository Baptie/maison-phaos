const TZ = "Europe/Paris";

export function dateLongue(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TZ,
  }).format(new Date(iso));
}

export function dateCourte(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TZ,
  }).format(new Date(iso));
}

export function jourEtMois(iso: string) {
  const d = new Date(iso);
  const jour = new Intl.DateTimeFormat("fr-FR", { day: "numeric", timeZone: TZ }).format(d);
  const mois = new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: TZ })
    .format(d)
    .replace(".", "");
  return { jour, mois };
}

export function heure(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  })
    .format(new Date(iso))
    .replace(":00", " h")
    .replace(":", " h ");
}
