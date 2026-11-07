# Maison Phaos : site web

Site vitrine de l'association, en Next.js 16, exporté en site **statique** et hébergé chez OVH (hébergement web mutualisé).
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

## Deux versions du site : dev et prod

Le même code produit deux versions, selon la variable `NEXT_PUBLIC_SITE_MODE` (voir `src/config/mode.ts`) :

| | **dev** (par défaut) | **prod** (`NEXT_PUBLIC_SITE_MODE=prod`) |
|---|---|---|
| Éléments manquants | surlignés en jaune, avec la consigne | pastilles et cartes « en construction » (pictogramme chantier / photo) |
| Données de démonstration (articles, agenda) | affichées, marquées | remplacées par « arrive bientôt » ; articles de démo non publiés |
| Coordonnées provisoires (adresse, téléphone) | surlignées | masquées du pied de page et de l'accueil, pastille ailleurs |
| Moteurs de recherche | bloqués (`robots.txt` + `noindex`) | autorisés (+ `sitemap.xml`) |

En local : `npm run dev` (dev, port 3000) et `npm run dev:prod` (prod, port 3001) peuvent tourner en même temps.
Quand un contenu devient définitif, retirer son marqueur `<Todo>` / `<TodoBloc>` : il disparaît des deux versions.

## Construire et mettre en ligne chez OVH

Le site est exporté en fichiers HTML statiques : aucun serveur Node n'est nécessaire chez OVH.

```bash
npm run build:prod     # produit le dossier dist-prod/  (site public)
npm run build:dev      # produit dist-dev/ (version de travail, pour un aperçu local uniquement)
npm run preview:prod   # aperçu local de dist-prod sur http://localhost:3001
```

1. Dans l'espace client OVH, vérifier que `maison-phaos.fr` pointe sur le dossier `www` de l'hébergement.
2. Téléverser **le contenu** de `dist-prod/` dans ce dossier (FTP, par exemple avec FileZilla ; penser aux fichiers cachés comme `.htaccess`). C'est ce que fait le déploiement automatique ci-dessous.
3. Activer le certificat SSL de chaque site et la redirection http → https (Hébergements > Multisite).
4. (Plus tard) Renseigner dans `.env.local` `SANITY_PROJECT_ID` et `GOOGLE_CALENDAR_ICS_URL` : les articles et l'agenda sont lus **à la construction**.

**Important : le site est figé à chaque construction.** Un nouvel article Sanity ou un nouvel événement Google Agenda n'apparaît qu'après une nouvelle construction et un nouveau téléversement. Pour la prod, `NEXT_PUBLIC_SITE_URL` fixe l'adresse publique si elle diffère de `https://maison-phaos.fr`.

## Déploiement automatique (GitHub Actions → OVH)

Un push sur la branche `main` construit le site (`build:prod`) et l'envoie par FTP chez OVH (`.github/workflows/deploy-prod.yml`). Seuls les fichiers modifiés sont renvoyés. Si la construction échoue, rien n'est envoyé et la version en ligne reste intacte. Le déploiement se lance aussi à la demande : GitHub > Actions > « Déployer la prod » > Run workflow.

À créer une seule fois : GitHub > Settings > Secrets and variables > Actions > *New repository secret* :

| Secret | Contenu |
|---|---|
| `OVH_FTP_HOST` | serveur FTP de l'hébergement (espace client OVH > Hébergements > FTP - SSH), ex. `ftp.cluster0XX.hosting.ovh.net` |
| `OVH_FTP_USER` / `OVH_FTP_PASSWORD` | identifiant et mot de passe FTP |
| `OVH_PROD_DIR` | dossier du site, avec `/` final : `/www/` (en FTP, la racine est le dossier personnel `/home/maisoicr`) |
| `SITE_URL_PROD` | facultatif : `https://maison-phaos.fr` |

Il n'y a qu'un seul dossier chez OVH : la version **dev** reste en local (`npm run dev`) et n'est pas déployée.

**À faire plus tard : Sanity et Google Agenda.** Tant qu'ils ne sont pas branchés, la prod affiche « arrive bientôt » pour les articles et l'agenda. Le jour venu : ajouter les secrets `SANITY_PROJECT_ID`, `SANITY_DATASET`, `GOOGLE_CALENDAR_ICS_URL`, les déclarer dans l'étape de build du workflow, et réactiver le bloc `schedule` (reconstruction toutes les 3 h, car le site est statique).

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

1. Créer un projet gratuit sur [sanity.io/manage](https://www.sanity.io/manage), avec le jeu de données `production`.
2. Dans le dossier `studio/` : `npm install`, puis `SANITY_STUDIO_PROJECT_ID=<id> npm run deploy`. L'espace d'édition est alors en ligne (par exemple `https://maison-phaos.sanity.studio`).
3. Dans Sanity > API > CORS origins, ajouter `http://localhost:3000` (le site public lit Sanity à la construction, sans appel depuis le navigateur).
4. Inviter le ou les bénévoles avec le rôle **Editor**.
5. Renseigner `SANITY_PROJECT_ID` dans `.env.local` (valeur à utiliser à chaque construction du site).

Un article publié apparaît sur le site après la prochaine construction (voir « Construire et mettre en ligne chez OVH »).

### Calendrier (Google Agenda)

1. Dans le Google Workspace de l'association, créer un agenda dédié (« Événements publics », par exemple) et le partager avec les bénévoles en « Apporter des modifications aux événements ».
2. Paramètres de l'agenda > **Adresse secrète au format iCal** : copier l'URL.
3. La renseigner dans la variable `GOOGLE_CALENDAR_ICS_URL` de `.env.local`. **Ne jamais la publier** : elle donne accès en lecture à tout l'agenda.

Champs utilisés : titre, date et heure, lieu, description. Les événements récurrents sont gérés. L'agenda est relu à chaque construction du site.

### Contact (liens e-mail)

Il n'y a plus de formulaire : la page Contact propose des boutons qui ouvrent la messagerie du visiteur avec un objet prérempli, vers l'adresse définie dans `src/config/site.ts` (`contact.email`). Aucun message ne transite par le site, donc rien à héberger ni à configurer.

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
