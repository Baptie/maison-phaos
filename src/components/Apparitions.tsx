"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Apparition progressive, élément par élément :
 * - `className="bloc"` : l'élément apparaît en fondu ;
 * - `className="cascade"` : chacun de ses enfants directs apparaît en fondu, l'un après l'autre.
 * Les éléments déjà à l'écran apparaissent au chargement, les autres au défilement.
 * Désactivé si la personne a demandé à réduire les animations.
 */
const DECALAGE_MS = 110;
const DECALAGE_MAX = 12; // au-delà, les éléments suivants n'attendent pas davantage
const CIBLES = ".bloc:not(.apparu), .cascade > :not(.cascade):not(.apparu)";

export function Apparitions() {
  const chemin = usePathname();

  useEffect(() => {
    const cibles = Array.from(document.querySelectorAll<HTMLElement>(CIBLES));
    const reduire = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduire || !("IntersectionObserver" in window)) {
      cibles.forEach((c) => c.classList.add("apparu"));
      return;
    }

    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          // Ordre de lecture : celui du document
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
          .forEach((el, i) => {
            el.style.animationDelay = `${Math.min(i, DECALAGE_MAX) * DECALAGE_MS}ms`;
            el.classList.add("apparu");
            observateur.unobserve(el);
          });
      },
      { rootMargin: "0px 0px -5% 0px" }
    );
    cibles.forEach((c) => observateur.observe(c));
    return () => observateur.disconnect();
  }, [chemin]);

  return null;
}
