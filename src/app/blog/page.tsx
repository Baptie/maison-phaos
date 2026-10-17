import type { Metadata } from "next";
import { getArticles } from "@/lib/sanity";
import { getEvenements } from "@/lib/calendar";
import { PageHeader } from "@/components/PageHeader";
import { PostList } from "@/components/PostList";
import { EventList } from "@/components/EventList";

export const metadata: Metadata = { title: "Actualités" };
export const revalidate = 600;

export default async function Blog() {
  const [articles, evenements] = await Promise.all([getArticles(), getEvenements(10)]);

  return (
    <>
      <PageHeader titre="Actualités">
        <p>Les nouvelles de l&apos;association et ses prochains rendez-vous.</p>
      </PageHeader>

      <div className="contenu">
        <div className="conteneur">
          <section aria-labelledby="titre-articles">
            <h2 id="titre-articles" className="sr-only">
              Articles
            </h2>
            <PostList resultat={articles} />
          </section>

          <section id="agenda" aria-labelledby="titre-agenda">
            <h2 id="titre-agenda" className="bloc">Agenda</h2>
            <EventList resultat={evenements} />
          </section>
        </div>
      </div>
    </>
  );
}
