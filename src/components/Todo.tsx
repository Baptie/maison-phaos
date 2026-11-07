import type { ReactNode } from "react";
import { modeProd } from "@/config/mode";
import { IconeChantier } from "./Icones";

/**
 * Marqueurs « reste à faire ».
 * Tout contenu provisoire ou incomplet passe par ces composants.
 *
 * - En mode dev : affichage jaune avec la consigne, pour repérer d'un coup d'œil ce qu'il reste
 *   à fournir (chercher « <Todo » et « <TodoBloc » dans le code).
 * - En mode prod (voir src/config/mode.ts) : une pastille « en construction » discrète à la
 *   place, sans consigne technique. Chaque marqueur peut aussi être gardé tel quel ou masqué.
 */

/** Ce qu'on affiche en prod pour un marqueur : pastille (défaut), texte tel quel, ou rien */
type EnProd = "pastille" | "garder" | "masquer";

/** Petite pastille inline « en construction » */
export function Pastille({ children = "Bientôt disponible" }: { children?: ReactNode }) {
  return (
    <span className="pastille-construction">
      <IconeChantier taille={16} />
      {children}
    </span>
  );
}

/** Texte provisoire dans une phrase ou un titre */
export function Todo({
  children,
  note,
  prod = "pastille",
}: {
  children: ReactNode;
  note?: string;
  prod?: EnProd;
}) {
  if (modeProd) {
    if (prod === "masquer") return null;
    if (prod === "garder") return <>{children}</>;
    return <Pastille />;
  }
  return (
    <mark className="todo" title={note ?? "À compléter"}>
      {children}
    </mark>
  );
}

/** Bloc entier à fournir : explique ce qui est attendu (dev) / carte « en construction » (prod) */
export function TodoBloc({
  titre,
  titrePublic,
  prod = "pastille",
  children,
}: {
  titre: string;
  /** Titre affiché au public en prod (par défaut : le titre ci-dessus) */
  titrePublic?: string;
  prod?: EnProd;
  children?: ReactNode;
}) {
  if (modeProd) {
    if (prod === "masquer") return null;
    return (
      <div className="construction-bloc" role="note">
        <span className="construction-bloc__icone">
          <IconeChantier taille={28} />
        </span>
        <div>
          <p className="construction-bloc__titre">{titrePublic ?? titre}</p>
          <p className="construction-bloc__texte">
            Cette partie du site est en construction. Elle sera bientôt disponible.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="todo-bloc" role="note">
      <p className="todo-bloc__etiquette">À compléter</p>
      <p className="todo-bloc__titre">{titre}</p>
      {children ? <div className="todo-bloc__contenu">{children}</div> : null}
    </div>
  );
}

/** Valeur de configuration éventuellement provisoire (voir src/config/site.ts) */
export function Valeur({ v }: { v: { valeur: string; todo?: boolean; note?: string } }) {
  if (!v.todo) return <>{v.valeur}</>;
  if (modeProd) return <Pastille />;
  return <Todo note={v.note}>{v.valeur}</Todo>;
}
