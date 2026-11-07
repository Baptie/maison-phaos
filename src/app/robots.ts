import type { MetadataRoute } from "next";
import { modeProd } from "@/config/mode";
import { site } from "@/config/site";

export const dynamic = "force-static";

/** Prod : référencement autorisé. Dev : tout est interdit aux moteurs de recherche. */
export default function robots(): MetadataRoute.Robots {
  return modeProd
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
