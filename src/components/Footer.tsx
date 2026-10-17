import Link from "next/link";
import { site } from "@/config/site";
import { LogoIcone } from "./Logo";
import { Valeur } from "./Todo";

export function Footer() {
  return (
    <footer className="pied">
      <div className="pied__inner">
        <div className="pied__marque">
          <LogoIcone taille={40} />
          <div>
            <p className="pied__nom">{site.nom}</p>
            <p className="pied__desc">{site.description}</p>
          </div>
        </div>

        <div>
          <h2 className="pied__titre">Nous joindre</h2>
          <ul className="pied__liste">
            <li>
              <Valeur v={site.contact.adresse} />
            </li>
            <li>
              <Valeur v={site.contact.telephone} />
            </li>
            <li>
              <Link href="/contact">Écrire à l&apos;association</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="pied__titre">Le site</h2>
          <ul className="pied__liste">
            {site.navigation.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/mentions-legales">Mentions légales</Link>
            </li>
            <li>
              <Link href="/confidentialite">Confidentialité</Link>
            </li>
          </ul>
        </div>
      </div>

      <p className="pied__legende">
        <mark className="todo">Les zones surlignées en jaune</mark> sont provisoires et restent à
        compléter avant la mise en ligne.
      </p>
    </footer>
  );
}
