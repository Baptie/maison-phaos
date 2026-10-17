import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { images } from "@/config/images";
import { PageHeader } from "@/components/PageHeader";
import { SiteImage } from "@/components/SiteImage";
import { Todo, TodoBloc, Valeur } from "@/components/Todo";

export const metadata: Metadata = {
  title: "Être aidé",
  description: "Blessé ou proche d'un blessé : comment l'association peut vous accompagner.",
};

export default function EtreAide() {
  return (
    <>
      <PageHeader titre="Être aidé">
        <p>
          Vous êtes blessé, ou proche d&apos;un blessé&nbsp;? L&apos;association peut vous écouter,
          vous orienter et vous accompagner.
        </p>
      </PageHeader>

      <div className="contenu">
        <div className="conteneur">
          <section className="deux-colonnes">
            <div>
              <h2>Qui peut être accompagné&nbsp;?</h2>
              <TodoBloc titre="Critères d'accompagnement">
                <p>
                  Qui peut s&apos;adresser à l&apos;association (blessés, conjoints, enfants, parents…),
                  et les éventuelles conditions.
                </p>
              </TodoBloc>
            </div>
            <SiteImage image={images.etreAide} />
          </section>

          <section>
            <h2>Comment faire une demande</h2>
            <ol className="etapes">
              <li>
                <h3>Prendre contact</h3>
                <p>
                  Par le formulaire de contact ou par téléphone au <Valeur v={site.contact.telephone} />.
                </p>
              </li>
              <li>
                <h3>Un premier échange</h3>
                <p>
                  <Todo>Qui vous rappelle, sous quel délai, et comment se passe ce premier échange.</Todo>
                </p>
              </li>
              <li>
                <h3>Un accompagnement adapté</h3>
                <p>
                  <Todo>Les formes d&apos;accompagnement possibles.</Todo>
                </p>
              </li>
            </ol>
            <div className="encadre">
              <h3>Faire une demande maintenant</h3>
              <p>Décrivez votre situation en quelques lignes. Nous vous répondrons par e-mail.</p>
              <Link href="/contact?objet=aide" className="bouton bouton--marine">
                Demander de l&apos;aide
              </Link>
            </div>
          </section>

          <section>
            <h2>Connaître ses droits</h2>
            <TodoBloc titre="Droits et dispositifs existants">
              <p>
                Présentation courte des principaux droits et des organismes de référence, avec des
                liens vers les sites officiels.
              </p>
            </TodoBloc>
          </section>
        </div>
      </div>
    </>
  );
}
