import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHeader } from "@/components/PageHeader";
import { Todo, Valeur } from "@/components/Todo";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegales() {
  return (
    <>
      <PageHeader titre="Mentions légales" />
      <div className="contenu">
        <div className="conteneur">
          <section>
            <h2>Éditeur du site</h2>
            <ul className="liste-simple">
              <li>
                Dénomination : <Todo>nom officiel de l&apos;association</Todo>
              </li>
              <li>
                Forme : association régie par la loi du 1er juillet 1901,{" "}
                <Todo>numéro RNA (W…)</Todo>
              </li>
              <li>
                Siège : <Valeur v={site.contact.adresse} />
              </li>
              <li>
                Directeur de la publication : <Todo>nom du président ou de la présidente</Todo>
              </li>
              <li>
                Contact : <Valeur v={site.contact.email} />
              </li>
            </ul>
          </section>

          <section>
            <h2>Hébergement</h2>
            <p>
              Netlify, Inc., États-Unis.{" "}
              <Todo>Adresse postale et téléphone de l&apos;hébergeur à reprendre depuis netlify.com.</Todo>
            </p>
          </section>

          <section>
            <h2>Propriété intellectuelle</h2>
            <p>
              Les textes, photos et logos de ce site appartiennent à l&apos;association ou sont
              utilisés avec l&apos;accord de leurs auteurs.{" "}
              <Todo>Crédits photos à compléter.</Todo>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
