// Génère js/data.js à partir des fichiers du dossier content/ (modifiés par l'administration).
// Sur Render : Build Command = node build.js
const fs = require('fs'), path = require('path');
const lire = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const rel = p => String(p || '').replace(/^\/+/, '');

// Textes du Carnet
const dir = path.join('content', 'textes');
const textes = (fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.json')) : []).map(f => {
  const d = lire(path.join(dir, f));
  return { id: f.replace(/\.json$/, ''), titre: d.titre || '', date: d.date ? String(d.date).slice(0, 10) : '', cat: d.categorie || 'Chroniques', texte: String(d.texte || '') };
});
textes.sort((a, b) => (a.date && b.date) ? (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id.localeCompare(b.id)) : a.date ? -1 : b.date ? 1 : a.id.localeCompare(b.id));

// Livres, citations, galerie, ouvrages
const livres = (lire('content/livres.json').livres || []).map(b => ({ c: rel(b.couverture), t: b.titre || '', g: b.genre || '', e: b.editeur || '', y: b.annee || '', p: b.preface || '', n: b.isbn || '', l: (b.liens || []).map(k => [k.libelle, k.url]), q: b.citation || '' }));
const citations = (lire('content/citations.json').citations || []).map(q => ({ t: q.texte, a: q.auteur }));
const galerie = (lire('content/galerie.json').photos || []).map(g => ({ src: rel(g.image), alt: g.alt || '', leg: g.legende || '', cr: g.credit || '' }));
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
  'var SITE = ' + J(SITE) + ';\nvar PRIX = ' + J(prix) + ';\nvar AILLEURS = ' + J(ailleurs) + ';\nvar PROJETS = ' + J(projets) + ';\n';
fs.writeFileSync(path.join('js', 'data.js'), out);
console.log('data.js généré :', textes.length, 'textes,', livres.length, 'livres,', citations.length, 'citations,', galerie.length, 'photos,', ouvrages.length, 'ouvrages,', prix.length, 'prix,', projets.length, 'projets');
