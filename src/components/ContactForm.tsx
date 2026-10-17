"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

/**
 * Formulaire de contact géré par Netlify Forms (aucun serveur à maintenir).
 * La déclaration du formulaire se trouve dans /public/__forms.html : garder les mêmes champs.
 * Les messages sont visibles dans Netlify > Forms, et envoyés par e-mail selon
 * la notification configurée dans Netlify.
 */

export const OBJETS = [
  { valeur: "aide", label: "Je souhaite être aidé" },
  { valeur: "soutien", label: "Je souhaite soutenir l'association" },
  { valeur: "benevolat", label: "Je souhaite devenir bénévole" },
  { valeur: "autre", label: "Autre demande" },
] as const;

type Etat = "repos" | "envoi" | "envoye" | "erreur";

export function ContactForm({ objetInitial, emailSecours }: { objetInitial?: string; emailSecours: string }) {
  const [etat, setEtat] = useState<Etat>("repos");

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtat("envoi");
    const form = e.currentTarget;
    const donnees = new FormData(form);
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(donnees as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setEtat("envoye");
    } catch {
      setEtat("erreur");
    }
  }

  if (etat === "envoye") {
    return (
      <div className="formulaire__succes" role="status">
        <h2>Message envoyé</h2>
        <p>Merci. Un membre de l&apos;association vous répondra par e-mail.</p>
        <button type="button" className="bouton bouton--contour" onClick={() => setEtat("repos")}>
          Écrire un autre message
        </button>
      </div>
    );
  }

  const objetDefaut = OBJETS.some((o) => o.valeur === objetInitial) ? objetInitial : "aide";

  return (
    <form name="contact" className="formulaire" onSubmit={envoyer}>
      <input type="hidden" name="form-name" value="contact" />
      {/* Piège à robots : champ invisible pour les humains */}
      <p className="sr-only" aria-hidden="true">
        <label>
          Ne pas remplir : <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="champ">
        <label htmlFor="objet">Objet</label>
        <select id="objet" name="objet" defaultValue={objetDefaut}>
          {OBJETS.map((o) => (
            <option key={o.valeur} value={o.valeur}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="champ">
        <label htmlFor="nom">Nom et prénom</label>
        <input id="nom" name="nom" type="text" autoComplete="name" required />
      </div>

      <div className="champ">
        <label htmlFor="email">Adresse e-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
        <p className="champ__aide">Nous l&apos;utilisons uniquement pour vous répondre.</p>
      </div>

      <div className="champ">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={7} required />
      </div>

      <div className="champ champ--case">
        <input id="consentement" name="consentement" type="checkbox" value="oui" required />
        <label htmlFor="consentement">
          J&apos;accepte que mes informations soient utilisées pour traiter ma demande (
          <Link href="/confidentialite">politique de confidentialité</Link>).
        </label>
      </div>

      {etat === "erreur" ? (
        <p className="formulaire__erreur" role="alert">
          L&apos;envoi n&apos;a pas abouti. Réessayez dans un instant, ou écrivez directement à{" "}
          <a href={`mailto:${emailSecours}`}>{emailSecours}</a>.
        </p>
      ) : null}

      <button type="submit" className="bouton bouton--marine" disabled={etat === "envoi"}>
        {etat === "envoi" ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}
