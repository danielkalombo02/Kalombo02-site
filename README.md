# Site de Kalombo II

Site statique avec un espace d'administration (`/admin/`) pour ajouter textes, livres, photos et citations sans toucher au code.

**Pour l'installation de l'administration, suivez le fichier `GUIDE-ADMIN.md`, étape par étape.**

## Contenu du dossier

- `index.html` : les pages du site
- `css/style.css` : la structure de l'apparence ; `css/theme.css` : couleurs et polices, généré automatiquement
- `js/main.js` : le fonctionnement du site (ne pas toucher)
- `js/data.js` : fichier généré automatiquement (ne pas modifier à la main)
- `content/` : tous vos contenus (textes, livres, citations, galerie, pages du site)
- `admin/` : l'administration (`index.html` et `config.yml`, déjà réglé sur votre dépôt `danielkalombo02/Kalombo02-site`)
- `build.js` : transforme `content/` en `js/data.js` à chaque publication
- `images/` : portrait, couvertures, photos ajoutées
- `404.html` : page d'erreur

## Ce que l'administration permet de modifier

Textes du Carnet, livres, ouvrages collectifs et préfaces, citations du jour, galerie, mais aussi le bandeau, le titre et les boutons de l'accueil, le portrait, la biographie, la page Recherche, le contact et le pied de page, les projets, les prix et les liens « Ailleurs ». Voir `GUIDE-ADMIN.md`, partie G.

Les menus, titres, boutons, couleurs, polices, le mode clair/sombre et les commentaires se règlent aussi depuis l'administration (parties H et I du guide).

## Ce que le site ne fait pas encore

Formulaire de contact, commentaires modérés, version anglaise, aperçus de partage et plan du site pour Google, recherche sur tout le site.

## Avant de publier pour de bon

Relisez les phrases entre crochets, la section « Prix et sélections » et la phrase sur les prix de « À propos » ; faites relire les mentions légales.
