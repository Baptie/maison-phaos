# Maison Phaos : site web

Site vitrine de l'association, en Next.js 16, hébergé sur Netlify.
Les bénévoles alimentent deux choses seulement : les **articles** (dans Sanity) et les **événements** (dans Google Agenda). Tout le reste se modifie dans le code.

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # facultatif : sans variables, le site affiche des données factices
npm run dev                  # http://localhost:3000
```

Node.js 20.9 ou plus récent est nécessaire.

## Où changer quoi

| Je veux changer… | Fichier |
|---|---|
| Couleurs, polices, tailles, espacements | `src/styles/theme.css` (variables CSS) |
| Images fixes (accueil, association…) | déposer le fichier dans `public/images/`, puis indiquer son chemin dans `src/config/images.ts` |
| Logo | `public/images/logo-icone.svg`, `logo-horizontal.svg`, `src/app/icon.svg` (favicon) et `src/components/Logo.tsx` |
| Nom, téléphone, adresse, e-mail de contact, menu, lien de don | `src/config/site.ts` |
| Textes des pages | `src/app/<page>/page.tsx` |

## Ce qui reste à compléter

Tout contenu provisoire s'affiche **surligné en jaune** sur le site. Dans le code :

- `<Todo>…</Todo>` : texte provisoire dans une phrase ;
- `<TodoBloc titre="…">` : bloc entier à fournir, avec la description de ce qui est attendu ;
- `todo: true` dans `src/config/site.ts` : valeur provisoire (téléphone, adresse, e-mail) ;
- `src: ""` dans `src/config/images.ts` : image pas encore fournie.

Pour lister tous les emplacements : `grep -rn "Todo\|todo: true\|src: \"\"" src`.
Quand un texte est définitif, retirer simplement la balise `<Todo>` qui l'entoure.

## Brancher les contenus

### Blog (Sanity)

Le projet Sanity existe déjà : `maison-phaos`, identifiant `50qw41xy`, jeu de données `production` (public en lecture, c'est nécessaire pour que le site affiche les articles).

1. En local : `SANITY_PROJECT_ID=50qw41xy` et `SANITY_DATASET=production` dans `.env.local`.
2. Espace d'édition en local : `cd studio && npm install && npm run dev` (http://localhost:3333).
3. Espace d'édition en ligne : `cd studio && npx sanity login && npm run deploy` (publié sur `https://maison-phaos.sanity.studio`).
4. Inviter le ou les bénévoles depuis sanity.io/manage > projet > Members, avec le rôle **Editor**.
5. Renseigner `SANITY_PROJECT_ID` et `SANITY_DATASET` dans Netlify.

Aucun réglage CORS n'est nécessaire pour le site : les articles sont lus côté serveur.

Un article publié apparaît sur le site en 10 minutes au plus.

### Calendrier (Google Agenda)

1. Dans le Google Workspace de l'association, créer un agenda dédié (« Événements publics », par exemple) et le partager avec les bénévoles en « Apporter des modifications aux événements ».
2. Paramètres de l'agenda > **Adresse secrète au format iCal** : copier l'URL.
3. La renseigner dans la variable `GOOGLE_CALENDAR_ICS_URL` sur Netlify. **Ne jamais la publier** : elle donne accès en lecture à tout l'agenda.

Champs utilisés : titre, date et heure, lieu, description. Les événements récurrents sont gérés. Le site relit l'agenda toutes les 10 minutes, sans redéploiement.

### Formulaire de contact (Netlify Forms)

Rien à installer : Netlify détecte le formulaire au déploiement (déclaration dans `public/__forms.html`).
Dans Netlify > Forms > Form notifications, ajouter l'adresse qui reçoit les messages. L'adresse actuelle est provisoire (voir `src/config/site.ts`).
L'offre gratuite inclut 100 messages par mois. En local, l'envoi échoue normalement : il ne fonctionne qu'une fois déployé.

## Déployer sur Netlify

1. Pousser le projet sur un dépôt GitHub.
2. Netlify > Add new site > Import from Git : les réglages sont lus dans `netlify.toml`.
3. Ajouter les variables d'environnement (voir `.env.example`).
4. Domain management : ajouter `maison-phaos.fr`, puis suivre les instructions DNS chez le registrar.

## Structure

```
src/
  app/            pages (accueil, association, etre-aide, soutenir, blog, contact, mentions légales, confidentialité)
  components/     en-tête, pied de page, agenda, articles, formulaire, marqueurs « à compléter »
  config/         site.ts (réglages et textes partagés), images.ts (images)
  lib/            sanity.ts (articles), calendar.ts (agenda), mock-data.ts (données factices)
  styles/         theme.css (variables du thème)
public/images/    images et logos
studio/           espace d'édition Sanity (projet séparé)
```
