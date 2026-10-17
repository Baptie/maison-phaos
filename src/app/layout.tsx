import type { Metadata } from "next";
import "@fontsource-variable/source-serif-4";
import "@fontsource/atkinson-hyperlegible/400.css";
import "@fontsource/atkinson-hyperlegible/700.css";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Apparitions } from "@/components/Apparitions";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.nom, template: `%s | ${site.nom}` },
  description: site.description,
  openGraph: { siteName: site.nom, locale: "fr_FR", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Active les animations d'apparition seulement si JavaScript est disponible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#contenu" className="lien-evitement">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <Apparitions />
      </body>
    </html>
  );
}
