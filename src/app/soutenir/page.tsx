import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { images } from "@/config/images";
import { PageHeader } from "@/components/PageHeader";
import { SiteImage } from "@/components/SiteImage";
import { Todo, TodoBloc } from "@/components/Todo";

export const metadata: Metadata = { title: "Nous soutenir" };

export default function Soutenir() {
  return (
    <>
      <PageHeader titre="Nous soutenir">
        <p>Dons, adhésions et bénévolat permettent à l&apos;association d&apos;agir.</p>
      </PageHeader>

      <div className="contenu">
        <div className="conteneur">
          <section id="don" className="deux-colonnes bloc">
            <div>
              <h2>Faire un don</h2>
              <p>
                <Todo>À quoi servent les dons, avec un exemple concret.</Todo>
              </p>
              {site.lienDon ? (
                <a href={site.lienDon} className="bouton bouton--marine">
                  Faire un don
                </a>
              ) : (
                <TodoBloc titre="Bouton « Faire un don »">
                  <p>
                    L&apos;outil de collecte en ligne n&apos;est pas encore choisi. Une fois choisi,
                    renseigner son lien dans <code>src/config/site.ts</code> (<code>lienDon</code>) :
                    le bouton apparaîtra ici.
                  </p>
                </TodoBloc>
              )}
              <p className="texte-doux">
                <Todo>Réduction d&apos;impôt : à confirmer selon le statut de l&apos;association.</Todo>
              </p>
            </div>
            <SiteImage image={images.soutenir} />
          </section>

          <section id="adherer" className="bloc">
            <h2>Adhérer</h2>
            <TodoBloc titre="Adhésion">
              <p>Montant de la cotisation, ce qu&apos;elle permet, et comment adhérer (bulletin, en ligne…).</p>
            </TodoBloc>
          </section>

          <section id="benevole" className="bloc">
            <h2>Devenir bénévole</h2>
            <p>
              <Todo>Les missions bénévoles possibles et le temps à prévoir.</Todo>
            </p>
            <Link href="/contact?objet=benevolat" className="bouton bouton--contour">
              Proposer mon aide
            </Link>
          </section>

          <section id="partenaires" className="bloc">
            <h2>Partenaires et mécènes</h2>
            <TodoBloc titre="Partenariats">
              <p>Comment devenir partenaire, et logos des partenaires actuels à afficher.</p>
            </TodoBloc>
          </section>
        </div>
      </div>
    </>
  );
}
