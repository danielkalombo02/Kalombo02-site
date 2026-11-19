# Site de Kalombo II

Site statique avec un espace d'administration (`/admin/`) pour ajouter textes, livres, photos et citations sans toucher au code.

**Pour l'installation de l'administration, suivez le fichier `GUIDE-ADMIN.md`, étape par étape.**

## Contenu du dossier

- `index.html` : les pages du site
- `css/style.css` : l'apparence
- `js/main.js` : le fonctionnement du site (ne pas toucher)
- `js/data.js` : fichier généré automatiquement (ne pas modifier à la main)
- `content/` : vos contenus (textes, livres, ouvrages collectifs et préfaces, citations, galerie)
- `admin/` : l'administration (`index.html` et `config.yml`, déjà réglé sur votre dépôt `danielkalombo02/Kalombo02-site`)
- `build.js` : transforme `content/` en `js/data.js` à chaque publication
- `images/` : portrait, couvertures, photos ajoutées
- `404.html` : page d'erreur

## Ce qui reste dans index.html

À modifier directement sur GitHub (crayon sur `index.html`) : la section Prix et sélections, les pages Projets et Recherche, le texte « À propos », les liens du Carnet (« Ailleurs »), la section Contact, le pied de page, les phrases entre crochets `[ ]`, et le bandeau « Version de travail » (supprimez la ligne `<div class="wip">…</div>`).

## Ce que le site ne fait pas encore

Formulaire de contact, commentaires modérés, version anglaise, aperçus de partage et plan du site pour Google, recherche sur tout le site.

## Avant de publier pour de bon

Relisez les phrases entre crochets, la section « Prix et sélections » et la phrase sur les prix de « À propos » ; faites relire les mentions légales.
