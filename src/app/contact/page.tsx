import type { Metadata } from "next";
import { site } from "@/config/site";
import { modeProd } from "@/config/mode";
import { PageHeader } from "@/components/PageHeader";
import { Todo, Valeur } from "@/components/Todo";

export const metadata: Metadata = { title: "Contact" };

/** Chaque motif ouvre la messagerie du visiteur avec un objet déjà rempli */
const MOTIFS = [
  { id: "aide", titre: "Je souhaite être aidé", objet: "Demande d'aide", principal: true },
  { id: "soutien", titre: "Je souhaite soutenir l'association", objet: "Soutien à l'association" },
  { id: "benevolat", titre: "Je souhaite devenir bénévole", objet: "Proposition de bénévolat" },
  { id: "autre", titre: "Autre demande", objet: "Question" },
] as const;

export default function Contact() {
  const adresse = site.contact.email.valeur;

  return (
    <>
      <PageHeader titre="Contact">
        <p>Une question, une demande d&apos;aide, une envie d&apos;agir&nbsp;? Écrivez-nous.</p>
      </PageHeader>

      <div className="contenu">
        <div className="conteneur deux-colonnes">
          <div className="cascade">
            <h2>Écrire un e-mail</h2>
            <p>
              Choisissez le motif de votre message : votre messagerie s&apos;ouvre avec l&apos;objet
              déjà rempli. Vous pouvez aussi écrire directement à{" "}
              <a href={`mailto:${adresse}`}>{adresse}</a>.
            </p>
            <ul className="cascade" style={{ listStyle: "none", padding: 0 }}>
              {MOTIFS.map((m) => (
                <li key={m.id} id={m.id}>
                  <a
                    href={`mailto:${adresse}?subject=${encodeURIComponent(m.objet)}`}
                    className={`bouton ${"principal" in m ? "bouton--marine" : "bouton--contour"}`}
                  >
                    {m.titre}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <aside className="encadre cascade">
            <h2>Autres moyens de nous joindre</h2>
            <p>
              <strong>Téléphone</strong>
              <br />
              <Valeur v={site.contact.telephone} />
            </p>
            <p>
              <strong>Adresse</strong>
              <br />
              <Valeur v={site.contact.adresse} />
            </p>
            {modeProd ? null : (
              <p className="texte-doux">
                <Todo>Délai de réponse habituel à préciser.</Todo>
              </p>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
