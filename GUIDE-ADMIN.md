# Guide d'installation de l'administration (Sveltia CMS)

Ce guide vous permet d'ajouter des textes, livres, photos et citations à votre site sans écrire de code.

Vos informations, déjà inscrites dans les fichiers :
- Site : https://kalombo-02-blog.onrender.com
- GitHub : identifiant `danielkalombo02`, dépôt `Kalombo02-site`
- Administration : https://kalombo-02-blog.onrender.com/admin/

**Prévoyez 30 minutes, un ordinateur, et un navigateur récent (Chrome, Edge, Firefox ou Safari).**

---

## Partie A. Mettre les nouveaux fichiers sur GitHub

### A1. Préparer les fichiers
1. Téléchargez `kalombo-site.zip` sur votre ordinateur.
2. Faites un clic droit dessus puis **Extraire tout** (Windows) ou double-cliquez (Mac). Vous obtenez un dossier avec : `index.html`, `404.html`, `build.js`, `README.md`, `GUIDE-ADMIN.md`, et les dossiers `admin`, `content`, `css`, `images`, `js`.

### A2. Déposer les fichiers
3. Allez sur https://github.com/danielkalombo02/Kalombo02-site et connectez-vous.
4. Cliquez sur **Add file** puis **Upload files**.
5. Ouvrez le dossier extrait, sélectionnez **tout son contenu** (fichiers et dossiers) et faites-le glisser dans la zone de dépôt de GitHub.
6. Attendez la fin du chargement. Vérifiez que la liste montre bien des chemins comme `admin/config.yml`, `content/textes/…`, `js/data.js`.
7. En bas, laissez **Commit directly to the main branch** coché. Dans le premier champ, écrivez : `Ajout de l'administration`.
8. Cliquez **Commit changes**.

### A3. Vérifier
9. Sur la page du dépôt, vérifiez que vous voyez les dossiers `admin`, `content` et le fichier `build.js`.
10. Ouvrez `admin/config.yml` : la ligne `repo:` doit afficher `danielkalombo02/Kalombo02-site`.

*Si vous êtes sur téléphone :* GitHub accepte mal le dépôt de dossiers. Utilisez un ordinateur, ou activez « version ordinateur » dans votre navigateur et déposez les fichiers un dossier après l'autre (ouvrez le dossier sur GitHub, puis **Add file > Upload files**).

---

## Partie B. Régler Render

1. Allez sur https://dashboard.render.com et ouvrez votre site (`kalombo-02-blog`).
2. Dans le menu de gauche, cliquez **Settings**.
3. Descendez jusqu'à **Build & Deploy**.
4. À **Build Command**, cliquez **Edit**, effacez ce qu'il y a, tapez exactement : `node build.js`
5. Vérifiez que **Publish Directory** contient `.` (un point).
6. Cliquez **Save Changes**.
7. Render lance un nouveau déploiement. Sinon, en haut à droite, cliquez **Manual Deploy > Deploy latest commit**.
8. Cliquez **Logs** et attendez la fin. Vous devez voir une ligne :

   `data.js généré : 3 textes, 3 livres, 6 citations, 1 photos, 14 ouvrages`

   puis un message indiquant que le site est en ligne (« Your site is live »).
9. Ouvrez https://kalombo-02-blog.onrender.com et vérifiez que le site s'affiche comme avant.

---

## Partie C. Créer votre jeton GitHub

Le jeton est une clé qui permet à l'administration de modifier votre dépôt, et à vous seul.

1. Sur GitHub, cliquez sur votre photo (en haut à droite) puis **Settings**.
2. Dans le menu de gauche, tout en bas, cliquez **Developer settings**.
3. Cliquez **Personal access tokens** puis **Fine-grained tokens**.
4. Cliquez **Generate new token**.
5. **Token name** : `admin-site`.
6. **Expiration** : choisissez une durée (par exemple 1 an). Notez la date pour le renouveler.
7. **Repository access** : cochez **Only select repositories**, puis choisissez **Kalombo02-site** et rien d'autre.
8. Dans **Permissions**, cliquez **Repository permissions**, trouvez **Contents** et choisissez **Read and write**. (« Metadata » passe automatiquement en lecture seule : c'est normal.)
9. Cliquez **Generate token**.
10. **Copiez le jeton immédiatement** (il commence en général par `github_pat_`). GitHub ne le montre qu'une seule fois. Gardez-le dans un gestionnaire de mots de passe ou un endroit privé.

**Ne le donnez à personne et ne le mettez dans aucun fichier du site.** Si vous le perdez ou qu'il est exposé : sur la même page GitHub, supprimez-le (**Delete** ou **Revoke**) et créez-en un nouveau.

---

## Partie D. Première connexion

1. Ouvrez https://kalombo-02-blog.onrender.com/admin/
2. L'écran de connexion de Sveltia CMS apparaît. Choisissez la connexion **GitHub** par **jeton** (« token »). L'intitulé exact peut varier.
3. Collez votre jeton et validez.
4. Vous voyez deux espaces :
   - **Textes du Carnet**
   - **Livres, œuvres, citations, galerie**

### Test (à faire une fois)
5. Cliquez **Textes du Carnet**, puis **Nouveau texte**.
6. Remplissez : Titre `Test`, Catégorie `Réflexions`, Texte `Ceci est un essai.`
7. Cliquez **Publier** (ou **Enregistrer**).
8. Attendez 1 à 3 minutes (suivez le déploiement dans Render, onglet **Events**).
9. Ouvrez le site, rubrique **Carnet** : « Test » doit apparaître. Rechargez la page si besoin (sur téléphone : actualisez plusieurs fois).
10. Retournez dans l'administration, ouvrez le texte « Test », supprimez-le, puis attendez le nouveau déploiement.

Si le test marche, votre installation est terminée.

---

## Partie E. Utilisation au quotidien

### Ajouter un texte
**Textes du Carnet > Nouveau texte** : titre, date (facultative, au format année-mois-jour), catégorie, texte. Une **ligne vide** sépare deux paragraphes. Pour un poème, les retours à la ligne sont conservés. Mettre une date classe les textes du plus récent au plus ancien ; sans date, ils passent après.

### Ajouter un livre
**Livres, œuvres, citations, galerie > Livres**, puis le bouton d'ajout dans la liste : titre, genre, éditeur, année, préface (facultatif), ISBN, couverture (image à téléverser), liens (libellé + adresse commençant par `https://`), citation de quatrième de couverture (facultatif).

### Ajouter une préface ou un ouvrage collectif
**… > Ouvrages collectifs et préfaces** : choisissez le type, le titre du livre, l'auteur (pour une préface) et le détail (éditeur, année, texte publié).

### Ajouter une citation du jour
**… > Citations du jour** : la citation et son auteur. Une citation s'affiche par jour, dans l'ordre de la liste.

### Ajouter une photo
**… > Galerie photo** : téléversez la photo, ajoutez une légende, le crédit photo et une courte description pour les personnes qui utilisent un lecteur d'écran.

Après chaque enregistrement, attendez 1 à 3 minutes avant que le site soit à jour.

---

## Partie F. Si quelque chose ne marche pas

| Problème | Cause probable | Solution |
|---|---|---|
| `/admin/` affiche « page introuvable » | Le dossier `admin` n'est pas sur GitHub | Refaites la partie A |
| Message d'erreur de configuration | `admin/config.yml` modifié par erreur (espaces ou tirets déplacés) | Dans GitHub, ouvrez le fichier, cliquez **History** et restaurez la version précédente, ou redéposez celui du zip |
| « Repository not found » ou accès refusé | Jeton limité au mauvais dépôt, sans permission **Contents : Read and write**, ou expiré | Créez un nouveau jeton (partie C) |
| Enregistré mais le site ne change pas | Déploiement en cours ou en échec | Dans Render, ouvrez **Events** et **Logs** ; vérifiez la commande `node build.js` ; rechargez le site |
| Erreur `node: command not found` dans les logs | Environnement de Render sans Node (peu probable) | Copiez l'erreur et envoyez-la-moi |
| Le texte apparaît sans paragraphes | Pas de ligne vide entre les paragraphes | Ajoutez une ligne vide |
| Une image ne s'affiche pas | Image trop lourde ou mal téléversée | Réduisez-la (moins de 1 Mo) et recommencez |
| Vous avez perdu votre jeton | | Supprimez-le sur GitHub et créez-en un nouveau |

---

## Remarques importantes

- Chaque enregistrement de l'administration crée une modification dans l'historique GitHub : vous pouvez toujours revenir en arrière.
- Je n'ai pas pu tester moi-même l'interface d'administration ni la connexion à GitHub : votre premier essai (le test de la partie D) est la vérification réelle. En cas de blocage, envoyez-moi le message d'erreur exact ou une capture d'écran.
- L'administration utilise **Sveltia CMS**, qui lit la même configuration que Decap CMS. Pour passer à Decap, il faut un service d'authentification supplémentaire, voir `admin/index.html`.
- Restent à modifier directement dans `index.html` : Prix et sélections, Projets, Recherche, À propos, Contact et pied de page.
