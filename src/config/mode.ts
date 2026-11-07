/**
 * MODE DU SITE — « dev » (par défaut) ou « prod ».
 *
 * - dev  : tout ce qui manque est surligné en jaune, avec la consigne de ce qu'il faut fournir.
 *          Les pages sont masquées des moteurs de recherche (noindex).
 * - prod : les éléments manquants deviennent des pastilles « en construction » lisibles par le
 *          public ; les consignes techniques et les données de démonstration disparaissent.
 *
 * Se règle avec la variable d'environnement NEXT_PUBLIC_SITE_MODE (valeur « prod » pour la prod).
 * Elle est lue à la construction du site : changer sa valeur demande un nouveau déploiement.
 */
export const modeProd = process.env.NEXT_PUBLIC_SITE_MODE === "prod";
