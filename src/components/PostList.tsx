import Image from "next/image";
import Link from "next/link";
import { dateCourte } from "@/lib/format";
import type { Article, Resultat } from "@/lib/types";

export function PostList({ resultat }: { resultat: Resultat<Article[]> }) {
  const { donnees, factice, erreur } = resultat;

  if (erreur) return <p className="vide">{erreur}</p>;
  if (donnees.length === 0)
    return <p className="vide">Aucune actualité n&apos;a encore été publiée.</p>;

  return (
    <div className={factice ? "zone-factice" : undefined}>
      {factice ? (
        <p className="zone-factice__note bloc">
          Articles de démonstration : l&apos;espace d&apos;édition Sanity n&apos;est pas encore
          branché.
        </p>
      ) : null}
      <ul className="articles">
        {donnees.map((a) => (
          <li key={a.slug} className="article-carte bloc">
            {a.image ? (
              <div className="article-carte__image">
                <Image src={`${a.image.url}?w=800&h=500&fit=crop&auto=format`} alt={a.image.alt} fill sizes="(max-width: 48rem) 100vw, 33vw" />
              </div>
            ) : (
              <div className="article-carte__image image-todo" aria-hidden="true">
                <span>Image de l&apos;article</span>
              </div>
            )}
            <p className="article-carte__date">
              <time dateTime={a.date}>{dateCourte(a.date)}</time>
            </p>
            <h3 className="article-carte__titre">
              <Link href={`/blog/${a.slug}`}>{a.titre}</Link>
            </h3>
            {a.resume ? <p className="article-carte__resume">{a.resume}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
