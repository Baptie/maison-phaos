"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Bouton clair / sombre de la barre de navigation.
 * Le thème est porté par l'attribut data-theme de <html> (posé avant l'affichage par le script du layout).
 * Le choix est mémorisé dans le navigateur ; sans choix, on suit le réglage de l'appareil.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const lire = () => document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(lire());

    // Sans choix mémorisé, suit les changements de réglage de l'appareil
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const suivre = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {}
      const t: Theme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", t);
      setTheme(t);
    };
    media.addEventListener("change", suivre);
    return () => media.removeEventListener("change", suivre);
  }, []);

  function basculer() {
    const suivant: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", suivant);
    try {
      localStorage.setItem("theme", suivant);
    } catch {}
    setTheme(suivant);
  }

  const sombre = theme === "dark";

  return (
    <button
      type="button"
      className="theme-bouton"
      onClick={basculer}
      aria-pressed={theme === null ? undefined : sombre}
      aria-label="Mode sombre"
      title={sombre ? "Revenir au mode clair" : "Passer en mode sombre"}
    >
      <svg className="theme-bouton__lune" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className="theme-bouton__soleil" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
