import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { schemaTypes } from "./schemaTypes";

// Identifiant du projet « maison-phaos » (sanity.io/manage) : public, ce n’est pas un secret
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "50qw41xy";

export default defineConfig({
  name: "maison-phaos",
  title: "Maison Phaos : actualités",
  projectId,
  dataset: "production",
  plugins: [structureTool(), frFRLocale()],
  schema: { types: schemaTypes },
});
