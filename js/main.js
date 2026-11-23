(function(){
var D=TEXTES,T=LIB;
[].forEach.call(document.querySelectorAll('[data-l]'),function(e){var v=T[e.getAttribute('data-l')];if(v!=null)e.textContent=v});
[].forEach.call(document.querySelectorAll('[data-lp]'),function(e){e.placeholder=T[e.getAttribute('data-lp')]||''});
if(T.titre_onglet)document.title=T.titre_onglet;
var AP=APPARENCE,CC=COMMENTAIRES_CFG;
function effTheme(){var t=document.documentElement.getAttribute('data-theme');if(t)return t;return window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
(function(){var st=null;try{st=localStorage.getItem('theme')}catch(e){}
var d=AP.mode_defaut==='clair'?'light':AP.mode_defaut==='sombre'?'dark':null,t=st||d;if(t)document.documentElement.setAttribute('data-theme',t);
var b=document.getElementById('mode');
if(!AP.bouton_mode){b.hidden=true;return}
var lab=function(){b.textContent=effTheme()==='dark'?T.mode_clair:T.mode_sombre};lab();
b.onclick=function(){var n=effTheme()==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}lab()}})();
var IC={instagram:'<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
facebook:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
whatsapp:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9.2 8.8c-.3 2.6 2.2 5.2 5.4 5.4l1.2-1.4-1.9-1-.9.7c-.7-.3-1.4-1-1.7-1.7l.7-.9-1-1.9z"/>',
youtube:'<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
twitter:'<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>',
tiktok:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
telegram:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
web:'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'};
function ico(u){u=(u||'').toLowerCase();var k='web';
if(/instagram\.com/.test(u))k='instagram';else if(/facebook\.com|fb\.com/.test(u))k='facebook';else if(/wa\.me|whatsapp\.com/.test(u))k='whatsapp';else if(/youtube\.com|youtu\.be/.test(u))k='youtube';else if(/linkedin\.com/.test(u))k='linkedin';else if(/\/\/(www\.)?(x|twitter)\.com/.test(u))k='twitter';else if(/tiktok\.com/.test(u))k='tiktok';else if(/t\.me|telegram/.test(u))k='telegram';else if(/^mailto:/.test(u))k='mail';
return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[k]+'</svg>'}
(function(){var s=document.getElementById('soc'),h='',tx=(typeof RESEAUX_AFF!=='undefined'&&RESEAUX_AFF==='texte');
(typeof RESEAUX!=='undefined'?RESEAUX:[]).forEach(function(r){if(/^(https?:\/\/|mailto:)/.test(r.url||'')){var u=x(r.url).replace(/"/g,'&quot;'),l=x(r.libelle).replace(/"/g,'&quot;');h+='<a href="'+u+'" target="_blank" rel="noopener noreferrer" aria-label="'+l+'" title="'+l+'">'+(tx?x(r.libelle):ico(r.url))+'</a>'}});
s.innerHTML=h;s.className='soc'+(tx?'':' ic');if(!h&&!AP.bouton_mode)document.querySelector('.tb').hidden=true})();
function shareUrl(a){return (PARTAGE_URL||location.origin)+'/t/'+a.id+'/'}
function shareHtml(a){var u=shareUrl(a);return '<p class="n" style="margin:0 0 6px"><button type="button" class="md" id="sh">'+x(T.partager)+'</button> <span id="shr" role="status"></span></p><p class="n" style="margin:0 0 18px;word-break:break-all">'+x(T.lien_partage)+' <a href="'+x(u)+'">'+x(u)+'</a></p>'}
function bindShare(a){var b=document.getElementById('sh');if(!b)return;b.onclick=function(){var u=shareUrl(a),r=document.getElementById('shr');
if(navigator.share){navigator.share({title:a.titre,url:u}).catch(function(){})}else if(navigator.clipboard){navigator.clipboard.writeText(u).then(function(){r.textContent=T.lien_copie}).catch(function(){})}}}
function comm(a){if(!CC||CC.mode!=='formulaire')return '';
var L=COMMENTAIRES.filter(function(c){return c.article===a.id});
var h='<section class="cm"><h3 class="cmt">'+x(T.c_titre)+'</h3>';
h+=L.length?L.map(function(c){return '<div class="cmi"><p class="n" style="margin:0"><b>'+x(c.auteur)+'</b>'+(c.date?', '+fd(c.date):'')+'</p><p style="margin:4px 0 14px">'+x(c.texte)+'</p></div>'}).join(''):'<p class="n">'+x(T.c_aucun)+'</p>';
if(CC.formulaire_url){h+='<form id="cmf" class="cmf" novalidate><label>'+x(T.c_nom)+'<input name="nom" required maxlength="80"></label><label>'+x(T.c_message)+'<textarea name="commentaire" rows="4" required maxlength="2000"></textarea></label><input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px"><button type="submit" class="b">'+x(T.c_envoyer)+'</button><p class="n" id="cmr" role="status"></p><p class="n">'+x(T.c_avertissement)+'</p></form>'}
return h+'</section>'}
function bindComm(a){var f=document.getElementById('cmf');if(!f)return;
f.onsubmit=function(ev){ev.preventDefault();var r=document.getElementById('cmr');if(f.website.value)return;
if(!f.nom.value.trim()||!f.commentaire.value.trim()){r.textContent=T.c_erreur_champs;return}
var g=new FormData();g.append('nom',f.nom.value);g.append('commentaire',f.commentaire.value);g.append('article',a.titre);g.append('article_id',a.id);g.append('_subject','Commentaire : '+a.titre);g.append('subject','Commentaire : '+a.titre);if(CC.cle_acces)g.append('access_key',CC.cle_acces);
var btn=f.querySelector('button');btn.disabled=true;
fetch(CC.formulaire_url,{method:'POST',body:g,headers:{'Accept':'application/json'}}).then(function(res){if(res.ok){f.reset();r.textContent=T.c_merci}else{r.textContent=T.c_erreur}btn.disabled=false}).catch(function(){r.textContent=T.c_erreur;btn.disabled=false})}}
var PG=['oeuvres','recherche','carnet','projets','galerie','apropos','contact'],CATS=['Poésie','Nouvelles','Réflexions','Chroniques','Extraits'],cur='Tout',f='all';
var M=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
function x(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
function fd(s){if(!s)return T.date_inconnue;var p=s.split('-');return +p[2]+' '+M[+p[1]-1]+' '+p[0]}

function card(b,full){var l=b.l.map(function(k){return '<a href="'+k[1]+'" target="_blank" rel="noopener">'+k[0]+'</a>'}).join('');
return '<article class="bk"><img src="'+b.c+'" width="360" height="520" loading="lazy" alt="'+T.couverture_de+' '+b.t+'"><p class="bt"><i>'+b.t+'</i></p><p class="n" style="margin:0">'+b.g+', '+b.e+', '+b.y+(b.p?'. '+b.p:'')+'</p><p class="n" style="margin:4px 0">'+T.isbn+' '+b.n+'</p><p class="n" style="margin:0">'+l+'</p>'+(full&&b.q?'<p class="bq">'+b.q+'</p>':'')+'</article>'}
document.getElementById('bk-home').innerHTML=LIVRES.map(function(b){return card(b,false)}).join('');
document.getElementById('bk-full').innerHTML=LIVRES.map(function(b){return card(b,true)}).join('');
document.getElementById('htx').innerHTML='<ul class="l">'+D.map(function(a){return '<li'+(a.img?' class="lt"':'')+'>'+(a.img?'<img src="'+x(a.img)+'" alt="" loading="lazy">':'')+'<div><a href="#a-'+a.id+'">'+x(a.titre)+'</a><span class="r">'+x(a.cat)+'</span></div></li>'}).join('')+'</ul>';
function blog(){
var el=document.getElementById('blog'),m=location.hash.match(/^#a-(.+)$/),a=m&&D.filter(function(t){return t.id===m[1]})[0];
if(a){el.innerHTML='<article class="ar"><a href="#carnet" class="sx">'+x(T.retour_carnet)+'</a><h3 class="at" style="margin-top:18px">'+x(a.titre)+'</h3><p class="n" style="margin:0 0 18px">'+fd(a.date)+', '+x(a.cat)+'</p>'+shareHtml(a)+(a.img?'<figure class="af"><img src="'+x(a.img)+'" alt="'+x(a.img_alt||'')+'" loading="lazy">'+(a.img_leg?'<figcaption class="n">'+x(a.img_leg)+'</figcaption>':'')+'</figure>':'')+a.texte.split(/\n\n+/).map(function(p){return '<p>'+x(p)+'</p>'}).join('')+'</article>'+comm(a);bindComm(a);bindShare(a);return}
var h='<div class="f" role="group" aria-label="Catégories">';
['Tout'].concat(CATS).forEach(function(c){h+='<button type="button" data-c="'+c+'" aria-pressed="'+(c===cur)+'">'+(c==='Tout'?x(T.f_tout):c)+'</button>'});
h+='</div>';
var L=D.filter(function(t){return cur==='Tout'||t.cat===cur});
h+=L.length?'<ul class="l">'+L.map(function(t){return '<li'+(t.img?' class="lt"':'')+'>'+(t.img?'<img src="'+x(t.img)+'" alt="" loading="lazy">':'')+'<div><a href="#a-'+t.id+'">'+x(t.titre)+'</a><span class="r">'+fd(t.date)+', '+x(t.cat)+'</span></div></li>'}).join('')+'</ul>':'<p class="n">'+x(T.cat_vide)+'</p>';
el.innerHTML=h;
[].forEach.call(el.querySelectorAll('[data-c]'),function(b){b.onclick=function(){cur=b.getAttribute('data-c');blog()}});
}
var S=SITE;
function inl(s){return x(s||'').replace(/\*([^*]+)\*/g,'<i>$1</i>')}
function par(s){return String(s||'').split(/\n\n+/).filter(Boolean).map(function(p){return '<p class="tx">'+inl(p)+'</p>'}).join('')}
function hr(u){u=String(u||'').trim();return /^(https?:|mailto:|#)/i.test(u)?u.replace(/"/g,'%22'):'#'}
function rl(p){return String(p||'').replace(/^\/+/,'')}
function put(id,h){var e=document.getElementById(id);if(e)e.innerHTML=h}
function txt(id,t){var e=document.getElementById(id);if(e)e.textContent=t||''}
function lnk(u,t){return '<a href="'+hr(u)+'" target="_blank" rel="noopener">'+t+'</a>'}
var bd=document.getElementById('bandeau');if(S.bandeau_actif&&S.bandeau_texte){bd.textContent=S.bandeau_texte}else{bd.hidden=true}
txt('h-titre',S.titre);txt('h-sous',S.soustitre);
[['h-b1',S.bouton1_texte,S.bouton1_lien],['h-b2',S.bouton2_texte,S.bouton2_lien]].forEach(function(b){var e=document.getElementById(b[0]);e.textContent=b[1]||'';e.href=hr(b[2])});
var pt=document.getElementById('portrait');if(S.portrait)pt.src=rl(S.portrait);pt.alt=S.portrait_alt||'';txt('h-credit',S.portrait_credit);
put('ac-court',inl(S.apropos_court));txt('ac-ct',S.contact_titre);txt('ac-cx',S.contact_texte);txt('ac-cb',S.contact_bouton);
put('ap',par(S.texte));txt('ap-note',S.note);
put('rech','<p class="tx">'+inl(S.texte_recherche)+(S.memoire_titre?' '+x(T.memoire)+' '+(S.memoire_lien?lnk(S.memoire_lien,'<i>'+x(S.memoire_titre)+'</i>'):'<i>'+x(S.memoire_titre)+'</i>')+'.':'')+' '+inl(S.texte2)+'</p><p class="n">'+inl(S.note_recherche)+'</p>');
var soc=[['Instagram',S.instagram],['Facebook',S.facebook],['Kiosque Littéraire',S.kiosque]].filter(function(s){return s[1]}).map(function(s){return lnk(s[1],s[0])}).join('<br>');
put('ct','<p class="tx">'+inl(S.intro)+'</p><p class="tx">'+(S.email?'<a href="mailto:'+hr(S.email).replace(/^#$/,'')+'">'+x(S.email)+'</a><br>':'')+(S.whatsapp?lnk('https://wa.me/'+String(S.whatsapp).replace(/\D/g,''),x(T.whatsapp_prefixe)+' '+x(S.whatsapp_affiche))+'<br>':'')+x(S.lieu)+'</p>'+(soc?'<p class="tx">'+soc+'</p>':'')+'<p class="n">'+inl(S.note_contact)+'</p><h3 style="margin-top:40px">'+x(T.h_mentions)+'</h3><p class="n" style="margin-top:4px">'+inl(S.mentions)+'</p>');
txt('pied',S.pied);
function pl(c,t){var L=PRIX.filter(function(p){return p.categorie===c});return L.length?'<h3'+(c==='selection'?' style="margin-top:28px"':'')+'>'+t+'</h3><ul class="l">'+L.map(function(p){return '<li>'+x(p.intitule)+'<span class="r">'+inl(p.detail)+(p.lien_url?' '+lnk(p.lien_url,x(p.lien_libelle||'Lien')):'')+'</span></li>'}).join('')+'</ul>':''}
put('prix',pl('prix',x(T.h_prix_sous))+pl('selection',x(T.h_selections)));
put('ailleurs',AILLEURS.map(function(a){return '<li>'+lnk(a.url,x(a.titre))+'<span class="r">'+inl(a.detail)+'</span></li>'}).join(''));
put('projets-liste',PROJETS.map(function(p){return '<li>'+x(p.organisation)+'<span class="r">'+inl(p.role)+'</span></li>'}).join(''));
function route(){
var h=location.hash.slice(1),m=h.match(/^a-(.+)$/),p=m?'carnet':(PG.indexOf(h)>-1?h:'accueil');
[].forEach.call(document.querySelectorAll('[data-pg]'),function(e){e.hidden=e.getAttribute('data-pg')!==p});
[].forEach.call(document.querySelectorAll('nav a'),function(a){a.setAttribute('aria-current',a.getAttribute('href')==='#'+p?'page':'false')});
blog();window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);route();
document.getElementById('liste').innerHTML=OUVRAGES.map(function(o){var t='<i>'+x(o.titre)+'</i>'+x(o.complement||'');return '<li data-t="'+o.type+'">'+(o.type==='preface'?'Préface à '+t+(o.auteur?', de '+x(o.auteur):''):t)+'<span class="r">'+x(o.detail||'')+'</span></li>'}).join('');
var q=document.getElementById('q'),bs=[].slice.call(document.querySelectorAll('[data-f]')),ls=[].slice.call(document.querySelectorAll('#liste li')),no=document.getElementById('none');
function u(){var s=q.value.toLowerCase();ls.forEach(function(l){l.hidden=!((f==='all'||l.getAttribute('data-t')===f)&&l.textContent.toLowerCase().indexOf(s)>-1)});bs.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-f')===f)});no.hidden=ls.some(function(l){return !l.hidden})}
bs.forEach(function(b){b.addEventListener('click',function(){f=b.getAttribute('data-f');u()})});q.addEventListener('input',u);u();

var d=new Date(),n=Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-Date.UTC(1970,0,1))/864e5),c=CITATIONS[n%CITATIONS.length];
document.getElementById('cq').textContent='« '+c.t+' »';document.getElementById('cs').textContent=c.a;
var g=document.getElementById('gal'),dl=document.getElementById('dlg');
GALERIE.forEach(function(p){var s=p.src,fg=document.createElement('figure'),b=document.createElement('button'),i=document.createElement('img'),cp=document.createElement('figcaption');
b.type='button';b.className='gb';i.src=s;i.alt=p.alt;i.loading='lazy';b.appendChild(i);
cp.textContent=p.leg+(p.cr?', '+T.photo_credit+' : '+p.cr:'');
b.onclick=function(){var di=dl.querySelector('img');di.src=s;di.alt=p.alt;dl.querySelector('p').textContent=cp.textContent;dl.showModal()};
fg.appendChild(b);fg.appendChild(cp);g.appendChild(fg)});
dl.querySelector('button').onclick=function(){dl.close()};
})();
