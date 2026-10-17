import type { Article, Evenement } from "./types";

/** Données de démonstration, affichées tant que Sanity et Google Agenda ne sont pas branchés. */

function bloc(texte: string, key: string) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}s`, text: texte, marks: [] }],
  };
}

export const articlesFactices: Article[] = [
  {
    slug: "exemple-article-1",
    titre: "Titre d'un premier article",
    date: "2026-10-01",
    resume:
      "Résumé de l'article en une ou deux phrases. Il apparaît dans la liste des actualités.",
    corps: [
      bloc(
        "Ceci est un article de démonstration. Les vrais articles seront rédigés par les bénévoles dans l'espace d'édition Sanity, avec un titre, une image principale et un texte.",
        "a1"
      ),
      bloc(
        "Un article peut contenir plusieurs paragraphes, des intertitres, des listes et des liens.",
        "a2"
      ),
    ],
  },
  {
    slug: "exemple-article-2",
    titre: "Titre d'un deuxième article",
    date: "2026-09-15",
    resume: "Résumé de démonstration : compte rendu d'une rencontre ou d'une action.",
    corps: [bloc("Contenu de démonstration.", "b1")],
  },
  {
    slug: "exemple-article-3",
    titre: "Titre d'un troisième article",
    date: "2026-09-02",
    resume: "Résumé de démonstration : témoignage ou portrait d'un membre.",
    corps: [bloc("Contenu de démonstration.", "c1")],
  },
];

function dansJours(jours: number, heure: number) {
  const d = new Date();
  d.setDate(d.getDate() + jours);
  d.setHours(heure, 0, 0, 0);
  return d.toISOString();
}

export function evenementsFactices(): Evenement[] {
  return [
    {
      id: "f1",
      titre: "Exemple : permanence d'accueil",
      debut: dansJours(6, 14),
      fin: dansJours(6, 17),
      journeeEntiere: false,
      lieu: "Lieu à préciser",
      description: "Description de l'événement en deux ou trois phrases.",
    },
    {
      id: "f2",
      titre: "Exemple : rencontre entre familles",
      debut: dansJours(17, 10),
      fin: dansJours(17, 12),
      journeeEntiere: false,
      lieu: "Lieu à préciser",
      description: "Description de l'événement en deux ou trois phrases.",
    },
    {
      id: "f3",
      titre: "Exemple : assemblée générale",
      debut: dansJours(40, 0),
      journeeEntiere: true,
      lieu: "Lieu à préciser",
    },
  ];
}
