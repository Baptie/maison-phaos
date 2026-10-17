import type { ReactNode } from "react";

/**
 * Marqueurs « reste à faire ».
 * Tout contenu provisoire ou incomplet passe par ces composants : il s'affiche en jaune
 * pour qu'on repère d'un coup d'œil ce qu'il reste à fournir. Pour trouver tous les
 * emplacements dans le code, chercher « <Todo » et « <TodoBloc ».
 */

/** Texte provisoire dans une phrase ou un titre */
export function Todo({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <mark className="todo" title={note ?? "À compléter"}>
      {children}
    </mark>
  );
}

/** Bloc entier à fournir : explique ce qui est attendu */
export function TodoBloc({
  titre,
  children,
}: {
  titre: string;
  children?: ReactNode;
}) {
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
  return v.todo ? <Todo note={v.note}>{v.valeur}</Todo> : <>{v.valeur}</>;
}
