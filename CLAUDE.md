# CLAUDE.md : site go2cloud.fr

Mode d'emploi pour un agent IA (Claude Code, Cursor...) qui modifie ce site. Le lire avant toute modification.

## Le site
- Site de Go2Cloud, membre du réseau Ohmycad. Langue : français.
- Générateur : Eleventy 2 (`npm run build` → `_site/`, `npm run serve` pour prévisualiser en local).
- Hébergement : GitHub Pages (dépôt public `Ohmycad/site-go2cloud`, workflow `.github/workflows/pages.yml`). **Chaque push sur `main` met le site en ligne en 1 à 2 minutes** (onglet Actions du dépôt pour suivre la publication).
- Accueil : src/index.html (page unique, HTML écrit à la main).
- Pages légales : src/mentions-legales.html et src/politique-confidentialite.html (servies sans .html).
- Scripts : src/js/main.js (constante G2C_FORM), src/js/consent.js, src/js/lead-form.js.

## Publier un article de blog
1. Créer `src/blog/<slug-court>.md` avec cet en-tête :
   ```
   ---
   title: "Titre de l'article"
   date: AAAA-MM-JJ
   category: "SOLIDWORKS"
   excerpt: "Une ou deux phrases, reprises dans la liste du blog et par Google."
   author: "Équipe Go2Cloud"
   cover: "/assets/img/blog/nom-image.webp"   # optionnel
   ---
   ```
2. Écrire le corps en Markdown (intertitres `##`, paragraphes courts, liens vers `/#contact` pour la prise de rendez-vous).
3. Images : `src/assets/img/blog/`, en .webp de préférence, moins de 300 Ko.
4. `npm run build` pour vérifier qu'il n'y a pas d'erreur, puis commit et push sur `main`.
L'article apparaît sur /blog/, dans sa catégorie et dans le sitemap automatiquement.

## Règles à ne jamais enfreindre
- **Aucun prix Dassault Systèmes** sur le site (licences, rôles, remises), sauf Ohmycare à 50 € par mois.
- **Mention réseau** : uniquement celle-ci, ne pas la reformuler en « n°1 Dassault Systèmes » ni l'attribuer à Go2Cloud :
  « Go2Cloud s’appuie sur Ohmycad, réseau spécialisé 3DEXPERIENCE et premier revendeur 3DEXPERIENCE au monde en 2025 : vous avez un interlocuteur local, avec la force d’un réseau mondial. »
- **Pas d'avis, de note ni de témoignage** qui ne soient pas ceux de Go2Cloud (les avis Google d'Ohmycad ne sont pas ceux du partner).
- **Ne pas toucher** au formulaire de contact (formulaire HubSpot `6609c6c1-7b2f-4979-bea1-279c0ed2e8ae`, qui notifie Antoine Allary, Sylvain Pourprix, Mathias Savigny), à `consent.js` (bandeau cookies, HubSpot ne se charge qu'après « Accepter ») ni à `lead-form.js`.
- **Ne pas supprimer ni vider** les pages légales.
- Pas d'ajout de traceur, pixel ou script tiers sans passer par le bandeau de consentement.
- Une politique de sécurité (CSP) stricte est déclarée dans une balise meta en tête de src/index.html, src/mentions-legales.html, src/politique-confidentialite.html et src/_includes/layouts/base.njk : tout nouveau script ou service externe doit y être autorisé dans ces 4 fichiers, sinon le navigateur le bloque.

## En cas de doute
Ne rien publier et demander à Ohmycad (Victor Roux).
