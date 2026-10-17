import { defineField, defineType } from "sanity";

/**
 * Type de contenu « Article » : le seul que les bénévoles éditent.
 * Les noms de champs doivent rester alignés avec src/lib/sanity.ts.
 */
export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (r) => r.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Adresse de la page",
      description: "Cliquer sur « Générer » après avoir saisi le titre.",
      type: "slug",
      options: { source: "titre", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "datePublication",
      title: "Date de publication",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: "image",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Description de l'image",
          description: "Ce que montre l'image, pour les personnes malvoyantes.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "resume",
      title: "Résumé",
      description: "Une ou deux phrases, affichées dans la liste des actualités.",
      type: "text",
      rows: 3,
      validation: (r) => r.max(280),
    }),
    defineField({
      name: "corps",
      title: "Texte",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Paragraphe", value: "normal" },
            { title: "Intertitre", value: "h2" },
          ],
          lists: [{ title: "Liste à puces", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Gras", value: "strong" },
              { title: "Italique", value: "em" },
            ],
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Plus récents d'abord",
      name: "dateDesc",
      by: [{ field: "datePublication", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "titre", subtitle: "datePublication", media: "image" },
  },
});
