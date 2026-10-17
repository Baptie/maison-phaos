import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { schemaTypes } from "./schemaTypes";

// Renseigner l'identifiant du projet créé sur sanity.io/manage
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "REMPLACER_PAR_PROJECT_ID";

export default defineConfig({
  name: "maison-phaos",
  title: "Maison Phaos : actualités",
  projectId,
  dataset: "production",
  plugins: [structureTool(), frFRLocale()],
  schema: { types: schemaTypes },
});
