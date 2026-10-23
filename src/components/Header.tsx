import Link from "next/link";
import { site } from "@/config/site";
import { LogoIcone } from "./Logo";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="entete">
      <div className="entete__inner">
        <Link href="/" className="entete__marque" aria-label={`${site.nom}, accueil`}>
          <LogoIcone />
          <span className="entete__nom">{site.nom}</span>
        </Link>

        {/* Menu : visible en ligne sur grand écran, repliable sur mobile (sans JavaScript) */}
        <details className="nav-mobile">
          <summary className="nav-mobile__bouton">Menu</summary>
          <nav aria-label="Navigation principale" className="nav nav--mobile">
            <NavLinks />
          </nav>
        </details>

        <nav aria-label="Navigation principale" className="nav nav--bureau">
          <NavLinks />
        </nav>

        <ThemeToggle />

        <Link href={site.ctaPrincipal.href} className="bouton bouton--marine entete__cta">
          {site.ctaPrincipal.label}
        </Link>
      </div>
    </header>
  );
}
