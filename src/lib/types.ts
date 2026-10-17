import type { PortableTextBlock } from "@portabletext/react";

export type Article = {
  slug: string;
  titre: string;
  date: string; // ISO
  resume: string;
  image?: { url: string; alt: string };
  corps: PortableTextBlock[];
};

export type Evenement = {
  id: string;
  titre: string;
  debut: string; // ISO
  fin?: string; // ISO
  journeeEntiere: boolean;
  lieu?: string;
  description?: string;
};

/** Résultat d'une source de contenu : `factice` = données de démonstration, à remplacer */
export type Resultat<T> = { donnees: T; factice: boolean; erreur?: string };
