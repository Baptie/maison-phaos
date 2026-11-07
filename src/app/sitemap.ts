import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getArticles } from "@/lib/sanity";

export const dynamic = "force-static";

const PAGES = ["", "/association", "/etre-aide", "/soutenir", "/blog", "/contact", "/mentions-legales", "/confidentialite"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { donnees, factice } = await getArticles();
  const articles = factice ? [] : donnees;
  return [
    ...PAGES.map((p) => ({ url: `${site.url}${p}/` })),
    ...articles.map((a) => ({ url: `${site.url}/blog/${a.slug}/`, lastModified: a.date })),
  ];
}
