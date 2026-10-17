"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Apparition progressive des blocs marqués `className="bloc"` :
 * fondu discret, bloc par bloc, au chargement de la page puis au défilement.
 * Désactivé si la personne a demandé à réduire les animations.
 */
const DECALAGE_MS = 90;

export function Apparitions() {
  const chemin = usePathname();

  useEffect(() => {
    const blocs = Array.from(document.querySelectorAll<HTMLElement>(".bloc:not(.bloc--visible)"));
    const reduire = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduire || !("IntersectionObserver" in window)) {
      blocs.forEach((b) => b.classList.add("bloc--visible"));
      return;
    }

    const observateur = new IntersectionObserver(
      (entrees) => {
        const visibles = entrees
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          // Ordre de lecture : celui du document
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        visibles.forEach((bloc, i) => {
          bloc.style.animationDelay = `${i * DECALAGE_MS}ms`;
          bloc.classList.add("bloc--visible");
          observateur.unobserve(bloc);
        });
      },
      { rootMargin: "0px 0px -6% 0px" }
    );
    blocs.forEach((b) => observateur.observe(b));
    return () => observateur.disconnect();
  }, [chemin]);

  return null;
}
