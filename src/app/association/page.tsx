import type { Metadata } from "next";
import { images } from "@/config/images";
import { PageHeader } from "@/components/PageHeader";
import { SiteImage } from "@/components/SiteImage";
import { Todo, TodoBloc } from "@/components/Todo";

export const metadata: Metadata = { title: "L'association" };

export default function Association() {
  return (
    <>
      <PageHeader titre="L'association">
        <p>
          <Todo>Phrase d&apos;introduction : qui nous sommes, en une phrase.</Todo>
        </p>
      </PageHeader>

      <div className="contenu">
        <div className="conteneur">
          <section className="deux-colonnes cascade">
            <div className="cascade">
              <h2>Notre histoire</h2>
              <TodoBloc titre="Histoire de l'association">
                <p>Date et contexte de création, fondateurs, grandes étapes. Deux à trois paragraphes.</p>
              </TodoBloc>
            </div>
            <SiteImage image={images.association} />
          </section>

          <section className="cascade">
            <h2>Nos missions</h2>
            <TodoBloc titre="Missions de l'association">
              <p>Trois à cinq missions, chacune en une phrase. Par exemple :</p>
              <ul>
                <li>accueillir et écouter les blessés et leurs proches ;</li>
                <li>les orienter dans leurs démarches ;</li>
                <li>créer du lien entre les familles.</li>
              </ul>
            </TodoBloc>
          </section>

          <section className="cascade">
            <h2>Gouvernance</h2>
            <TodoBloc titre="Bureau et conseil d'administration">
              <p>Noms et rôles des membres du bureau (président, trésorier, secrétaire), avec leur accord.</p>
            </TodoBloc>
          </section>

          <section className="cascade">
            <h2>Documents officiels</h2>
            <TodoBloc titre="Statuts et rapports d'activité">
              <p>Fichiers PDF à fournir : statuts, dernier rapport d&apos;activité, comptes annuels si publiés.</p>
            </TodoBloc>
          </section>
        </div>
      </div>
    </>
  );
}
