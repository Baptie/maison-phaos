import type { Metadata } from "next";
import "@fontsource-variable/source-serif-4";
import "@fontsource/atkinson-hyperlegible/400.css";
import "@fontsource/atkinson-hyperlegible/700.css";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Apparitions } from "@/components/Apparitions";

const SCRIPT_INITIAL = `(function(){var d=document.documentElement;d.classList.add('js');var t=null;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.setAttribute('data-theme',t)})()`;

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
        {/*
          Exécuté avant l'affichage de la page (aucun flash) :
          - active les animations d'apparition seulement si JavaScript est disponible ;
          - applique le thème choisi (mémorisé dans le navigateur), sinon celui de l'appareil.
        */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_INITIAL }} />
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
