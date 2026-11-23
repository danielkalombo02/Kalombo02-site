// Génère js/data.js à partir des fichiers du dossier content/ (modifiés par l'administration).
// Sur Render : Build Command = node build.js
const fs = require('fs'), path = require('path');
const lire = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const rel = p => String(p || '').replace(/^\/+/, '');

// Textes du Carnet
const dir = path.join('content', 'textes');
const textes = (fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.json')) : []).map(f => {
  const d = lire(path.join(dir, f));
  return { id: f.replace(/\.json$/, ''), titre: d.titre || '', date: d.date ? String(d.date).slice(0, 10) : '', cat: d.categorie || 'Chroniques', texte: String(d.texte || ''), img: rel(d.image), img_alt: d.image_alt || '', img_leg: d.image_legende || '' };
});
textes.sort((a, b) => (a.date && b.date) ? (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id.localeCompare(b.id)) : a.date ? -1 : b.date ? 1 : a.id.localeCompare(b.id));

// Livres, citations, galerie, ouvrages
const livres = (lire('content/livres.json').livres || []).map(b => ({ c: rel(b.couverture), t: b.titre || '', g: b.genre || '', e: b.editeur || '', y: b.annee || '', p: b.preface || '', n: b.isbn || '', l: (b.liens || []).map(k => [k.libelle, k.url]), q: b.citation || '' }));
const citations = (lire('content/citations.json').citations || []).map(q => ({ t: q.texte, a: q.auteur }));
let galerie = (lire('content/galerie.json').photos || []).map(g => ({ src: rel(g.image), alt: g.alt || '', leg: g.legende || '', cr: g.credit || '' }));
// Photos déposées en lot dans images/galerie : ajoutées automatiquement à la suite
const gdir = path.join('images', 'galerie');
if (fs.existsSync(gdir)) {
  const deja = new Set(galerie.map(g => g.src.toLowerCase()));
  fs.readdirSync(gdir).filter(f => /\.(jpe?g|png|webp|gif|avif)$/i.test(f)).sort((x, y) => x.localeCompare(y, 'fr', { numeric: true }))
    .forEach(f => { const s = 'images/galerie/' + f; if (!deja.has(s.toLowerCase())) galerie.push({ src: s, alt: '', leg: '', cr: '' }); });
}
const ouvrages = lire('content/ouvrages.json').ouvrages || [];

// Pages du site : tout est regroupé dans l'objet SITE
const accueil = lire('content/site/accueil.json');
const apropos = lire('content/site/apropos.json');
const recherche = lire('content/site/recherche.json');
const contact = lire('content/site/contact.json');
const SITE = Object.assign({}, accueil, {
  texte: apropos.texte, note: apropos.note,
  texte_recherche: recherche.texte, memoire_titre: recherche.memoire_titre, memoire_lien: recherche.memoire_lien, texte2: recherche.texte2, note_recherche: recherche.note,
  intro: contact.intro, email: contact.email, whatsapp: contact.whatsapp, whatsapp_affiche: contact.whatsapp_affiche, lieu: contact.lieu,
  instagram: contact.instagram, facebook: contact.facebook, kiosque: contact.kiosque, note_contact: contact.note, mentions: contact.mentions, pied: contact.pied
});
const prix = lire('content/prix.json').prix || [];
const ailleurs = lire('content/ailleurs.json').liens || [];
const projets = lire('content/projets.json').projets || [];
const rs = lire('content/site/reseaux.json');
const reseaux = rs.reseaux || [];
const reseauxAff = rs.affichage === 'texte' ? 'texte' : 'icones';

// Libellés (menus, titres, boutons), apparence, commentaires
const flat = o => Object.keys(o).reduce((a, k) => Object.assign(a, (o[k] && typeof o[k] === 'object') ? o[k] : { [k]: o[k] }), {});
const LIB = flat(lire('content/site/libelles.json'));
const ap = lire('content/site/apparence.json');
const APPARENCE = { mode_defaut: (ap.mode && ap.mode.defaut) || 'auto', bouton_mode: !(ap.mode && ap.mode.bouton === false) };
const cc = lire('content/site/commentaires.json');
const COMMENTAIRES_CFG = { mode: cc.mode === 'formulaire' ? 'formulaire' : 'desactive', formulaire_url: /^https:\/\//.test(cc.formulaire_url || '') ? cc.formulaire_url.trim() : '', cle_acces: String(cc.cle_acces || '').replace(/[^A-Za-z0-9_-]/g, '') };
const cdir = path.join('content', 'commentaires');
const COMMENTAIRES = (fs.existsSync(cdir) ? fs.readdirSync(cdir).filter(f => f.endsWith('.json')) : []).map(f => lire(path.join(cdir, f)))
  .map(c => ({ article: c.article || '', auteur: c.auteur || '', date: c.date ? String(c.date).slice(0, 10) : '', texte: String(c.texte || '') }))
  .sort((a, c) => (a.date || '').localeCompare(c.date || ''));

// Fichier css/theme.css : couleurs, polices, taille
const PRESETS = {
  'EB Garamond': ['EB+Garamond:ital,wght@0,400;0,500;1,400;1,500', 0],
  'Cormorant Garamond': ['Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500', 0],
  'Playfair Display': ['Playfair+Display:ital,wght@0,400;0,500;1,400;1,500', 0],
  'Lora': ['Lora:ital,wght@0,400;0,500;1,400;1,500', 0],
  'Crimson Pro': ['Crimson+Pro:ital,wght@0,400;0,500;1,400;1,500', 0],
  'Libre Baskerville': ['Libre+Baskerville:ital,wght@0,400;0,700;1,400', 0],
  'Spectral': ['Spectral:ital,wght@0,400;0,500;1,400;1,500', 0],
  'Fraunces': ['Fraunces:ital,wght@0,400;0,500;1,400;1,500', 0],
  'DM Serif Display': ['DM+Serif+Display:ital@0;1', 0],
  'Newsreader': ['Newsreader:ital,wght@0,400;0,500;1,400;1,500', 0],
  'Source Serif 4': ['Source+Serif+4:ital,wght@0,400;0,600;1,400;1,600', 0],
  'Merriweather': ['Merriweather:ital,wght@0,400;0,700;1,400;1,700', 0],
  'Work Sans': ['Work+Sans:ital,wght@0,400;0,500;1,400;1,500', 1],
  'Inter': ['Inter:wght@400;500', 1],
  'Georgia (police du système)': [null, 0]
};
const col = (v, d) => /^#[0-9a-fA-F]{3,8}$/.test(String(v || '').trim()) ? String(v).trim() : d;
const nomPolice = n => /^[A-Za-z0-9 ]{2,40}$/.test(String(n || '').trim()) ? String(n).trim() : '';
const imports = [];
function police(preset, perso, defaut) {
  const p = nomPolice(perso);
  let nom, url, sans = 0;
  if (p) { nom = p; url = p.replace(/ /g, '+'); }
  else { const k = PRESETS[preset] ? preset : defaut; nom = k.indexOf('Georgia') === 0 ? 'Georgia' : k; url = PRESETS[k][0]; sans = PRESETS[k][1]; }
  if (url && imports.indexOf(url) < 0) imports.push(url);
  return "'" + nom + "'," + (sans ? 'system-ui,sans-serif' : 'Georgia,serif');
}
const pol = ap.polices || {};
const fTitre = police(pol.titres, pol.titres_perso, 'EB Garamond');
const fTexte = police(pol.texte, pol.texte_perso, 'Newsreader');
const taille = ['16', '17', '18', '19', '20'].indexOf(String(pol.taille)) >= 0 ? pol.taille : '18';
const V = (c, d) => '--bg:' + col(c.fond, d[0]) + ';--ink:' + col(c.texte, d[1]) + ';--mu:' + col(c.secondaire, d[2]) + ';--ac:' + col(c.accent, d[3]) + ';--ru:' + col(c.filets, d[4]) + ';--on:' + col(c.texte_bouton, d[5]);
const cl = V(ap.couleurs_claires || {}, ['#F7F3EA', '#1A1A1A', '#6B665E', '#6B1F2A', '#D9D2C3', '#F7F3EA']);
const so = V(ap.couleurs_sombres || {}, ['#16140F', '#EDE7DA', '#A39D90', '#C9777F', '#3A362D', '#16140F']);
const pied = ap.pied || {};
const css = '/* FICHIER GÉNÉRÉ AUTOMATIQUEMENT par build.js à partir de content/site/apparence.json. Ne le modifiez pas à la main. */\n' +
  imports.map(u => "@import url('https://fonts.googleapis.com/css2?family=" + u + "&display=swap');").join('\n') + '\n' +
  ':root{' + cl + ';--f-titre:' + fTitre + ';--f-texte:' + fTexte + ';--taille:' + taille + 'px;--pied-fond:' + col(pied.fond, '#1A1A1A') + ';--pied-texte:' + col(pied.texte, '#EDE7DA') + '}\n' +
  '@media (prefers-color-scheme:dark){:root:not([data-theme=light]){' + so + ';color-scheme:dark}}\n' +
  ':root[data-theme=dark]{' + so + ';color-scheme:dark}\n';
fs.writeFileSync(path.join('css', 'theme.css'), css);

const J = o => JSON.stringify(o, null, 1);
const out = '// FICHIER GÉNÉRÉ AUTOMATIQUEMENT par build.js à partir du dossier content/. Ne le modifiez pas à la main.\n' +
  'var TEXTES = ' + J(textes) + ';\nvar LIVRES = ' + J(livres) + ';\nvar CITATIONS = ' + J(citations) + ';\nvar GALERIE = ' + J(galerie) + ';\nvar OUVRAGES = ' + J(ouvrages) + ';\n' +
  'var LIB = ' + J(LIB) + ';\nvar APPARENCE = ' + J(APPARENCE) + ';\nvar COMMENTAIRES_CFG = ' + J(COMMENTAIRES_CFG) + ';\nvar COMMENTAIRES = ' + J(COMMENTAIRES) + ';\n' +
  'var RESEAUX = ' + J(reseaux) + ';\nvar RESEAUX_AFF = ' + J(reseauxAff) + ';\nvar PARTAGE_URL = ' + J(/^https:\/\/[A-Za-z0-9.-]+$/.test(String(lire('content/site/partage.json').url || '').trim().replace(/\/+$/, '')) ? String(lire('content/site/partage.json').url).trim().replace(/\/+$/, '') : '') + ';\n' +
  'var SITE = ' + J(SITE) + ';\nvar PRIX = ' + J(prix) + ';\nvar AILLEURS = ' + J(ailleurs) + ';\nvar PROJETS = ' + J(projets) + ';\n';
fs.writeFileSync(path.join('js', 'data.js'), out);

// Aperçu de partage (WhatsApp, Facebook, Google), plan du site et robots.txt
const pt = lire('content/site/partage.json');
const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const urlSite = String(pt.url || '').trim().replace(/\/+$/, '');
const base = /^https:\/\/[A-Za-z0-9.-]+$/.test(urlSite) ? urlSite : '';
const imgAbs = base && pt.image ? base + '/' + rel(pt.image) : '';
const bloc = ['<!--PARTAGE-->', '<title>' + esc(pt.titre) + '</title>', '<meta name="description" content="' + esc(pt.description) + '">',
  base ? '<link rel="canonical" href="' + base + '/">' : '', '<meta property="og:type" content="website">', '<meta property="og:site_name" content="' + esc(LIB.nom) + '">',
  '<meta property="og:title" content="' + esc(pt.titre) + '">', '<meta property="og:description" content="' + esc(pt.description) + '">',
  base ? '<meta property="og:url" content="' + base + '/">' : '', imgAbs ? '<meta property="og:image" content="' + imgAbs + '">' : '', '<meta property="og:locale" content="fr_FR">',
  '<meta name="twitter:card" content="' + (imgAbs ? 'summary_large_image' : 'summary') + '">', '<meta name="twitter:title" content="' + esc(pt.titre) + '">',
  '<meta name="twitter:description" content="' + esc(pt.description) + '">', imgAbs ? '<meta name="twitter:image" content="' + imgAbs + '">' : '', '<!--/PARTAGE-->'].filter(Boolean).join('\n');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<!--PARTAGE-->[\s\S]*?<!--\/PARTAGE-->/, () => bloc);
fs.writeFileSync('index.html', html);
// Une page de partage par texte (aperçu WhatsApp/Facebook avec la photo du texte), puis redirection vers le site
fs.rmSync('t', { recursive: true, force: true });
const urls = [base + '/'];
if (base) {
  const extrait = t => { const p = String(t.texte || '').split(/\n+/).find(l => l.trim().length > 40) || String(t.texte || ''); let s = p.replace(/\s+/g, ' ').trim(); if (s.length > 190) s = s.slice(0, 190).replace(/\s+\S*$/, '') + '…'; return s; };
  textes.forEach(t => {
    if (!/^[a-z0-9-]+$/.test(t.id)) return;
    const page = base + '/t/' + t.id + '/';
    const img = t.img ? base + '/' + encodeURI(t.img) : imgAbs;
    const tags = ['<meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1">', '<title>' + esc(t.titre) + ' — ' + esc(LIB.nom) + '</title>',
      '<meta name="description" content="' + esc(extrait(t)) + '">', '<link rel="canonical" href="' + page + '">', '<meta property="og:type" content="article">',
      '<meta property="og:site_name" content="' + esc(LIB.nom) + '">', '<meta property="og:title" content="' + esc(t.titre) + '">', '<meta property="og:description" content="' + esc(extrait(t)) + '">',
      '<meta property="og:url" content="' + page + '">', img ? '<meta property="og:image" content="' + img + '">' : '', '<meta property="og:locale" content="fr_FR">',
      '<meta name="twitter:card" content="' + (img ? 'summary_large_image' : 'summary') + '">', '<meta name="twitter:title" content="' + esc(t.titre) + '">',
      '<meta name="twitter:description" content="' + esc(extrait(t)) + '">', img ? '<meta name="twitter:image" content="' + img + '">' : ''].filter(Boolean).join('\n');
    fs.mkdirSync(path.join('t', t.id), { recursive: true });
    fs.writeFileSync(path.join('t', t.id, 'index.html'), '<!DOCTYPE html>\n<html lang="fr">\n<head>\n' + tags + '\n<script>location.replace("/#a-' + t.id + '")</script>\n</head>\n<body>\n<p><a href="/#a-' + t.id + '">' + esc(t.titre) + '</a></p>\n</body>\n</html>\n');
    urls.push(page);
  });
  fs.writeFileSync('robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + base + '/sitemap.xml\n');
  const jour = new Date().toISOString().slice(0, 10);
  fs.writeFileSync('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(u => '  <url><loc>' + u + '</loc><lastmod>' + jour + '</lastmod></url>').join('\n') + '\n</urlset>\n');
}
