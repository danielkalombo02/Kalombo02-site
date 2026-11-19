// Génère js/data.js à partir des fichiers du dossier content/ (modifiés par l'administration).
// Sur Render : Build Command = node build.js
const fs = require('fs'), path = require('path');
const lire = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const rel = p => String(p || '').replace(/^\/+/, '');
const dir = path.join('content', 'textes');
const textes = (fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.json')) : []).map(f => {
  const d = lire(path.join(dir, f));
  return { id: f.replace(/\.json$/, ''), titre: d.titre || '', date: d.date ? String(d.date).slice(0, 10) : '', cat: d.categorie || 'Chroniques', texte: String(d.texte || '') };
});
textes.sort((a, b) => (a.date && b.date) ? (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id.localeCompare(b.id)) : a.date ? -1 : b.date ? 1 : a.id.localeCompare(b.id));
const livres = (lire('content/livres.json').livres || []).map(b => ({ c: rel(b.couverture), t: b.titre || '', g: b.genre || '', e: b.editeur || '', y: b.annee || '', p: b.preface || '', n: b.isbn || '', l: (b.liens || []).map(k => [k.libelle, k.url]), q: b.citation || '' }));
const citations = (lire('content/citations.json').citations || []).map(q => ({ t: q.texte, a: q.auteur }));
const galerie = (lire('content/galerie.json').photos || []).map(g => ({ src: rel(g.image), alt: g.alt || '', leg: g.legende || '', cr: g.credit || '' }));
const ouvrages = lire('content/ouvrages.json').ouvrages || [];
const J = o => JSON.stringify(o, null, 1);
const out = '// FICHIER GÉNÉRÉ AUTOMATIQUEMENT par build.js à partir du dossier content/. Ne le modifiez pas à la main.\n' +
  'var TEXTES = ' + J(textes) + ';\nvar LIVRES = ' + J(livres) + ';\nvar CITATIONS = ' + J(citations) + ';\nvar GALERIE = ' + J(galerie) + ';\nvar OUVRAGES = ' + J(ouvrages) + ';\n';
fs.writeFileSync(path.join('js', 'data.js'), out);
console.log('data.js généré :', textes.length, 'textes,', livres.length, 'livres,', citations.length, 'citations,', galerie.length, 'photos,', ouvrages.length, 'ouvrages');
