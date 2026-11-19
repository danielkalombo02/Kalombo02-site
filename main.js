(function(){
var D=TEXTES;
var PG=['oeuvres','recherche','carnet','projets','galerie','apropos','contact'],CATS=['Poésie','Nouvelles','Réflexions','Chroniques','Extraits'],cur='Tout',f='all';
var M=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
function x(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
function fd(s){if(!s)return '[date à renseigner]';var p=s.split('-');return +p[2]+' '+M[+p[1]-1]+' '+p[0]}

function card(b,full){var l=b.l.map(function(k){return '<a href="'+k[1]+'" target="_blank" rel="noopener">'+k[0]+'</a>'}).join('');
return '<article class="bk"><img src="couverture-'+b.i+'.jpg" width="360" height="520" loading="lazy" alt="Couverture de '+b.t+'"><p class="bt"><i>'+b.t+'</i></p><p class="n" style="margin:0">'+b.g+', '+b.e+', '+b.y+(b.p?'. '+b.p:'')+'</p><p class="n" style="margin:4px 0">ISBN '+b.n+'</p><p class="n" style="margin:0">'+l+'</p>'+(full&&b.q?'<p class="bq">'+b.q+'</p>':'')+'</article>'}
document.getElementById('bk-home').innerHTML=LIVRES.map(function(b){return card(b,false)}).join('');
document.getElementById('bk-full').innerHTML=LIVRES.map(function(b){return card(b,true)}).join('');
document.getElementById('htx').innerHTML='<ul class="l">'+D.map(function(a){return '<li><a href="#a-'+a.id+'">'+x(a.titre)+'</a><span class="r">'+x(a.cat)+'</span></li>'}).join('')+'</ul>';
function blog(){
var el=document.getElementById('blog'),m=location.hash.match(/^#a-(.+)$/),a=m&&D.filter(function(t){return t.id===m[1]})[0];
if(a){el.innerHTML='<article class="ar"><a href="#carnet" class="sx">Retour au carnet</a><h3 class="at" style="margin-top:18px">'+x(a.titre)+'</h3><p class="n" style="margin:0 0 18px">'+fd(a.date)+', '+x(a.cat)+'</p>'+a.texte.split(/\n\n+/).map(function(p){return '<p>'+x(p)+'</p>'}).join('')+'<p class="n">Les commentaires modérés seront activés avec le site définitif.</p></article>';return}
var h='<div class="f" role="group" aria-label="Catégories">';
['Tout'].concat(CATS).forEach(function(c){h+='<button type="button" data-c="'+c+'" aria-pressed="'+(c===cur)+'">'+c+'</button>'});
h+='</div>';
var L=D.filter(function(t){return cur==='Tout'||t.cat===cur});
h+=L.length?'<ul class="l">'+L.map(function(t){return '<li><a href="#a-'+t.id+'">'+x(t.titre)+'</a><span class="r">'+fd(t.date)+', '+x(t.cat)+'</span></li>'}).join('')+'</ul>':'<p class="n">Aucun texte dans cette catégorie pour l’instant.</p>';
el.innerHTML=h;
[].forEach.call(el.querySelectorAll('[data-c]'),function(b){b.onclick=function(){cur=b.getAttribute('data-c');blog()}});
}
function route(){
var h=location.hash.slice(1),m=h.match(/^a-(.+)$/),p=m?'carnet':(PG.indexOf(h)>-1?h:'accueil');
[].forEach.call(document.querySelectorAll('[data-pg]'),function(e){e.hidden=e.getAttribute('data-pg')!==p});
[].forEach.call(document.querySelectorAll('nav a'),function(a){a.setAttribute('aria-current',a.getAttribute('href')==='#'+p?'page':'false')});
blog();window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);route();
var q=document.getElementById('q'),bs=[].slice.call(document.querySelectorAll('[data-f]')),ls=[].slice.call(document.querySelectorAll('#liste li')),no=document.getElementById('none');
function u(){var s=q.value.toLowerCase();ls.forEach(function(l){l.hidden=!((f==='all'||l.getAttribute('data-t')===f)&&l.textContent.toLowerCase().indexOf(s)>-1)});bs.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-f')===f)});no.hidden=ls.some(function(l){return !l.hidden})}
bs.forEach(function(b){b.addEventListener('click',function(){f=b.getAttribute('data-f');u()})});q.addEventListener('input',u);u();

var d=new Date(),n=Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-Date.UTC(1970,0,1))/864e5),c=CITATIONS[n%CITATIONS.length];
document.getElementById('cq').textContent='« '+c.t+' »';document.getElementById('cs').textContent=c.a;
var g=document.getElementById('gal'),dl=document.getElementById('dlg');
GALERIE.forEach(function(p){var s=p.src,fg=document.createElement('figure'),b=document.createElement('button'),i=document.createElement('img'),cp=document.createElement('figcaption');
b.type='button';b.className='gb';i.src=s;i.alt=p.alt;i.loading='lazy';b.appendChild(i);
cp.textContent=p.leg+(p.cr?', photographie : '+p.cr:'');
b.onclick=function(){var di=dl.querySelector('img');di.src=s;di.alt=p.alt;dl.querySelector('p').textContent=cp.textContent;dl.showModal()};
fg.appendChild(b);fg.appendChild(cp);g.appendChild(fg)});
dl.querySelector('button').onclick=function(){dl.close()};
})();
