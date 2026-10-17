/**
 * IMAGES DU SITE — toutes les images fixes sont rangées dans /public/images.
 * Pour remplacer un visuel : déposer le fichier dans /public/images,
 * puis indiquer son chemin ici (ex. "/images/accueil.jpg").
 * Tant que `src` est vide, un emplacement jaune « à compléter » s'affiche à la place.
 */

export type ImageSite = { src: string; alt: string; consigne: string };

export const images = {
  logo: {
    src: "/images/logo-icone.svg",
    alt: "",
    consigne: "Logo provisoire",
  },
  accueil: {
    src: "",
    alt: "",
    consigne: "Photo d'ambiance pour l'accueil (paysage, au moins 1600 px de large)",
  },
  association: {
    src: "",
    alt: "",
    consigne: "Photo de l'équipe ou d'une action de l'association",
  },
  etreAide: {
    src: "",
    alt: "",
    consigne: "Photo rassurante : accueil, échange, accompagnement",
  },
  soutenir: {
    src: "",
    alt: "",
    consigne: "Photo d'un événement ou de bénévoles",
  },
} satisfies Record<string, ImageSite>;
