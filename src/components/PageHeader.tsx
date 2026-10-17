import type { ReactNode } from "react";

export function PageHeader({ titre, children }: { titre: ReactNode; children?: ReactNode }) {
  return (
    <div className="page-entete">
      <div className="conteneur">
        <h1>{titre}</h1>
        {children ? <div className="page-entete__intro">{children}</div> : null}
      </div>
    </div>
  );
}
