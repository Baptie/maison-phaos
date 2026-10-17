/**
 * CONFIGURATION DU SITE — textes et réglages partagés.
 * Les valeurs suivies de `todo: true` sont provisoires et s'affichent en jaune sur le site.
 */

export type Valeur = { valeur: string; todo?: boolean; note?: string };

export const site = {
  nom: "Maison Phaos",
  description:
    "Association d'accompagnement des militaires blessés et de leurs proches.",
  url: "https://maison-phaos.fr",

  contact: {
    // Adresse qui reçoit les messages du formulaire (à régler aussi dans Netlify > Forms > Notifications)
    email: {
      valeur: "contact.baptistecaron@gmail.com",
      todo: true,
      note: "Adresse provisoire, à remplacer par une adresse de l'association",
    } as Valeur,
    telephone: { valeur: "Numéro de téléphone à fournir", todo: true } as Valeur,
    adresse: { valeur: "Adresse postale du siège à fournir", todo: true } as Valeur,
  },

  // Navigation principale : un seul niveau, pas de sous-menu
  navigation: [
    { href: "/association", label: "L'association" },
    { href: "/blog", label: "Actualités" },
    { href: "/soutenir", label: "Nous soutenir" },
    { href: "/contact", label: "Contact" },
  ],

  // Bouton principal, toujours visible dans l'en-tête
  ctaPrincipal: { href: "/etre-aide", label: "Être aidé" },

  // Lien de don : vide tant que l'outil de collecte n'est pas choisi
  lienDon: "" as string,

  // Délai de relecture de l'agenda et du blog, en secondes
  rafraichissement: 600,
};
