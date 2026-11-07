import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getArticle, getArticles, blogFactice } from "@/lib/sanity";
import { dateLongue } from "@/lib/format";
import { modeProd } from "@/config/mode";

// Site statique : seuls les articles connus à la construction existent (reconstruire pour en publier)
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { donnees, factice } = await getArticles();
  // En prod, les articles de démonstration ne sont pas publiés
  const slugs = factice && modeProd ? [] : donnees.map((a) => a.slug);
  // L'export statique exige au moins une page : sans article, ce faux article affiche la page 404
  return (slugs.length ? slugs : ["aucun-article"]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  return article ? { title: article.titre, description: article.resume } : {};
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle((await params).slug);
  if (!article || (modeProd && blogFactice)) notFound();

  return (
    <div className="contenu">
      <article className="conteneur article-page cascade">
        <p>
          <Link href="/blog">Retour aux actualités</Link>
        </p>
        {blogFactice ? (
          <p className="zone-factice__note">Article de démonstration</p>
        ) : null}
        <h1>{article.titre}</h1>
        <p className="texte-doux">
          Publié le <time dateTime={article.date}>{dateLongue(article.date)}</time>
        </p>
        {article.image ? (
          <div className="article-page__image">
            <Image
              src={`${article.image.url}?w=1400&auto=format`}
              alt={article.image.alt}
              fill
              sizes="(max-width: 48rem) 100vw, 44rem"
              priority
            />
          </div>
        ) : null}
        <div className="prose cascade">
          <PortableText value={article.corps ?? []} />
        </div>
      </article>
    </div>
  );
}
