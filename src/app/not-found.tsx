import Link from "next/link";

export default function PageIntrouvable() {
  return (
    <div className="contenu">
      <div className="conteneur">
        <h1>Page introuvable</h1>
        <p>Cette page n&apos;existe pas ou a été déplacée.</p>
        <Link href="/" className="bouton bouton--marine">
          Revenir à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
