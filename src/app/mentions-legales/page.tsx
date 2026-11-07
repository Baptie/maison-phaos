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
          <section className="cascade">
            <h2>Éditeur du site</h2>
            <ul className="liste-simple">
              <li>
                Dénomination : Maison Phaos
              </li>
              <li>
                Forme : association régie par la loi du 1er juillet 1901,{" "}
                <Todo>numéro RNA (W…)</Todo>
              </li>
              <li>
                Siège : Saint-Jean-de-la-Ruelle (45140)
              </li>
              <li>
                Directeur de la publication : Valentine Legrand
              </li>
              <li>
                Contact : <Valeur v={site.contact.email} />
              </li>
            </ul>
          </section>

          <section className="cascade">
            <h2>Hébergement</h2>
            <p>
              OVH SAS, 2 rue Kellermann, 59100 Roubaix, France. Téléphone : 1007 (service client).
            </p>
          </section>

          <section className="cascade">
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
