import { site } from "@/config/site";
import { articlesFactices } from "./mock-data";
import type { Article, Resultat } from "./types";

/**
 * Lecture des articles du blog depuis Sanity, via son API HTTP publique (lecture seule).
 * Sans SANITY_PROJECT_ID, renvoie les articles de démonstration.
 */

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = "2025-01-01";

const champs = `
  "slug": slug.current,
  titre,
  "date": coalesce(datePublication, _createdAt),
  resume,
  "image": select(defined(image.asset) => { "url": image.asset->url, "alt": coalesce(image.alt, "") }),
  corps
`;

async function requete<T>(query: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(
    `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`
  );
  url.searchParams.set("query", query);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(`$${k}`, JSON.stringify(v));
  const res = await fetch(url, { next: { revalidate: site.rafraichissement } });
  if (!res.ok) throw new Error(`Sanity a répondu ${res.status}`);
  const json = (await res.json()) as { result: T };
  return json.result;
}

export async function getArticles(limite?: number): Promise<Resultat<Article[]>> {
  if (!projectId) {
    return { donnees: articlesFactices.slice(0, limite), factice: true };
  }
  try {
    const tranche = limite ? `[0...${limite}]` : "";
    const articles = await requete<Article[]>(
      `*[_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))]
        | order(coalesce(datePublication, _createdAt) desc)${tranche}{${champs}}`
    );
    return { donnees: articles, factice: false };
  } catch (e) {
    console.error("[blog]", e);
    return { donnees: [], factice: false, erreur: "Les actualités sont momentanément indisponibles." };
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (!projectId) return articlesFactices.find((a) => a.slug === slug) ?? null;
  try {
    return await requete<Article | null>(
      `*[_type == "article" && slug.current == $slug && !(_id in path("drafts.**"))][0]{${champs}}`,
      { slug }
    );
  } catch (e) {
    console.error("[blog]", e);
    return null;
  }
}

export const blogFactice = !projectId;
