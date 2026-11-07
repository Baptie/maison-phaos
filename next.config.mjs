/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site 100 % statique : « next build » produit le dossier out/ à téléverser chez OVH (hébergement mutualisé)
  output: "export",
  // /association/ -> association/index.html : fonctionne sur un Apache sans configuration
  trailingSlash: true,
  // Dossier de build séparé pour lancer dev et prod côte à côte en local (voir package.json)
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // L'optimisation d'images demande un serveur Node : non disponible en export statique
    unoptimized: true,
    // Images des articles servies par le CDN Sanity
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  serverExternalPackages: ["node-ical"],
};

export default nextConfig;
