import Link from "next/link";
import { site } from "@/config/site";
import { images } from "@/config/images";
import { getEvenements } from "@/lib/calendar";
import { getArticles } from "@/lib/sanity";
import { EventList } from "@/components/EventList";
import { PostList } from "@/components/PostList";
import { SiteImage } from "@/components/SiteImage";
import { Todo, TodoBloc, Valeur } from "@/components/Todo";

export const revalidate = 600;

export default async function Accueil() {
  const [evenements, articles] = await Promise.all([getEvenements(3), getArticles(3)]);

  return (
    <>
      {/* ---------- Hero : l'accès à l'aide d'abord ---------- */}
      <section className="hero">
        <div className="conteneur hero__grille">
          <div>
            <h1>
              <Todo note="Phrase de mission : proposition à valider par l'association">
                Après la blessure, une maison pour se reconstruire.
              </Todo>
            </h1>
            <p className="lead">
              <Todo note="À réécrire par l'association">
                Présentation de la mission en deux phrases : qui l&apos;association accompagne, et
                comment.
              </Todo>
            </p>
            <div className="hero__liens">
              <Link href="/association">Découvrir l&apos;association</Link>
              <Link href="/soutenir">Nous soutenir</Link>
            </div>
          </div>

          <div className="maison">
            <svg
              className="maison__toit"
              viewBox="0 0 400 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M14 54 L200 8 L386 54"
                fill="none"
                stroke="var(--color-rouge)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="maison__corps">
              <h2>Vous êtes blessé, ou proche d&apos;un blessé&nbsp;?</h2>
              <p>
                L&apos;association vous écoute et vous oriente, quelle que soit votre situation.
                <Todo note="À confirmer par l'association"> La demande est gratuite et confidentielle.</Todo>
              </p>
              <Link href={site.ctaPrincipal.href} className="bouton bouton--blanc">
                Demander de l&apos;aide
              </Link>
              <p className="maison__contact">
                Par téléphone : <Valeur v={site.contact.telephone} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- L'association en bref ---------- */}
      <section className="section section--alt">
        <div className="conteneur deux-colonnes">
          <div>
            <h2>L&apos;association</h2>
            <p>
              <Todo>
                Court texte de présentation : histoire, raison d&apos;être, ce que fait
                l&apos;association au quotidien (4 à 5 lignes).
              </Todo>
            </p>
            <TodoBloc titre="Chiffres clés (facultatif)">
              <p>Deux ou trois chiffres parlants : années d&apos;existence, personnes accompagnées, bénévoles.</p>
            </TodoBloc>
            <Link href="/association" className="bouton bouton--contour">
              Découvrir l&apos;association
            </Link>
            <figure className="citation">
              <blockquote>
                <Todo>Témoignage d&apos;une personne accompagnée, en une ou deux phrases.</Todo>
              </blockquote>
              <figcaption>
                <Todo>Prénom, avec son accord</Todo>
              </figcaption>
            </figure>
          </div>
          <SiteImage image={images.accueil} ratio="4 / 5" />
        </div>
      </section>

      {/* ---------- Agenda ---------- */}
      <section className="section">
        <div className="conteneur">
          <div className="section__entete">
            <h2>Prochains rendez-vous</h2>
            <Link href="/blog#agenda">Tout l&apos;agenda</Link>
          </div>
          <EventList resultat={evenements} />
        </div>
      </section>

      {/* ---------- Actualités ---------- */}
      <section className="section section--alt">
        <div className="conteneur">
          <div className="section__entete">
            <h2>Actualités</h2>
            <Link href="/blog">Toutes les actualités</Link>
          </div>
          <PostList resultat={articles} />
        </div>
      </section>

      {/* ---------- Soutenir ---------- */}
      <section className="section">
        <div className="conteneur">
          <h2>Soutenir l&apos;association</h2>
          <ul className="soutiens">
            <li>
              <h3>Faire un don</h3>
              <p>
                <Todo note="Outil de collecte à choisir">Le don en ligne sera bientôt disponible.</Todo>
              </p>
              <Link href="/soutenir#don">En savoir plus</Link>
            </li>
            <li>
              <h3>Adhérer</h3>
              <p>Rejoindre l&apos;association et participer à sa vie.</p>
              <Link href="/soutenir#adherer">Adhérer</Link>
            </li>
            <li>
              <h3>Devenir bénévole</h3>
              <p>Donner un peu de son temps, selon ses disponibilités.</p>
              <Link href="/soutenir#benevole">Devenir bénévole</Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
