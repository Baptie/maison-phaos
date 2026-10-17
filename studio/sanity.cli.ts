import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "REMPLACER_PAR_PROJECT_ID",
    dataset: "production",
  },
  // Adresse de l'espace d'édition une fois publié : https://maison-phaos.sanity.studio
  studioHost: "maison-phaos",
});
