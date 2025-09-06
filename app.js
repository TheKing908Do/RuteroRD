/* RuteroRD v2 — index.js (home con tarjetas con 2 imágenes + 'Ver guía') */
const $ = (s) => document.querySelector(s);
let RUTAS = [];
let itemsToShow = 6;
let currentList = [];

const grid = $('#gridRutas');
const btnVerMas = $('#btnVerMas');
const filtroTipo = $('#filtroTipo');
const filtroProv = $('#filtroProv');

function updateVerMas(){
  if(currentList.length > itemsToShow){ btnVerMas.style.display = 'inline-flex'; }
  else { btnVerMas.style.display = 'none'; }
}

function firstTwoImages(r){
  const arr = Array.isArray(r.gallery) ? r.gallery.slice(0,2) : [];
  if(arr.length < 2){
    // fallback: usa img como portada + placeholder si falta otra
    const cover = r.img || 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1600&auto=format&fit=crop';
    if(arr.length === 0) arr.push(cover);
    if(arr.length === 1) arr.push(cover);
  }
  return arr;
}

function routeCard(r){
  const href = `detalle.html?slug=${encodeURIComponent(r.slug)}`;
  const imgs = firstTwoImages(r);
  return `
  <article class="card">
    <div class="grid gallery" style="grid-template-columns:repeat(2,1fr)">
      <img src="${imgs[0]}" alt="Imagen 1 de ${r.titulo}" loading="lazy" style="height:140px;object-fit:cover;border-radius:18px 0 0 0">
      <img src="${imgs[1]}" alt="Imagen 2 de ${r.titulo}" loading="lazy" style="height:140px;object-fit:cover;border-radius:0 18px 0 0">
    </div>
    <div class="route-body">
      <div class="route-title">
        <h3>${r.titulo}</h3>
        <span class="pill">${r.tipo}</span>
      </div>
      <p class="muted">${r.resumen || ''}</p>
      <p class="muted">${r.prov} · dificultad ${r.dif || '—'} · ${r.tiempo || ''}</p>
      <div class="mt">
        <a class="btn" href="${href}">Ver guía</a>
      </div>
    </div>
  </article>`;
}

function renderRutas(lista){
  currentList = lista;
  const slice = lista.slice(0, itemsToShow);
  grid.innerHTML = slice.map(routeCard).join('');
  updateVerMas();
}

btnVerMas?.addEventListener('click', ()=>{
  itemsToShow += 6;
  renderRutas(currentList);
});

function aplicarFiltros(){
  const t = filtroTipo.value; const p = filtroProv.value;
  const filtradas = RUTAS.filter(r => (!t || r.tipo===t) && (!p || r.prov===p));
  itemsToShow = 6;
  renderRutas(filtradas);
}
[filtroTipo, filtroProv].forEach(el => el && el.addEventListener('change', aplicarFiltros));

function actualizarKPIs(){
  $('#kpiRutas').textContent = RUTAS.length;
  $('#kpiProvincias').textContent = new Set(RUTAS.map(r => r.prov)).size;
}

function poblarSelectProvincias(){
  const provs = [...new Set(RUTAS.map(r => r.prov))].sort((a,b)=>a.localeCompare(b));
  filtroProv.innerHTML = '<option value="">Todas las provincias</option>' + provs.map(p=>`<option>${p}</option>`).join('');
}

const gridCatalogo = document.getElementById('gridCatalogo');
function renderCatalogo(){
  const map = new Map();
  RUTAS.forEach(r => {
    if(!map.has(r.prov)) map.set(r.prov, { count:0, tipos:new Set() });
    const obj = map.get(r.prov);
    obj.count++; obj.tipos.add(r.tipo);
  });
  const items = [...map.entries()].sort((a,b)=> a[0].localeCompare(b[0]));
  gridCatalogo.innerHTML = items.map(([prov, info]) => `
    <article class="card tip">
      <div class="route-body">
        <h3>${prov}</h3>
        <p class="muted">${info.count} ruta${info.count!==1?'s':''} · Tipos: ${[...info.tipos].join(', ')}</p>
        <div class="mt"><a class="btn secondary" href="#rutas" data-prov="${prov}">Ver rutas</a></div>
      </div>
    </article>
  `).join('');
  gridCatalogo.querySelectorAll('a[data-prov]')?.forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      filtroProv.value = a.dataset.prov;
      aplicarFiltros();
      window.location.hash = '#rutas';
    });
  });
}

// Contacto (simulado)
const formContacto = $('#formContacto');
formContacto?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const acepto = $('#acepto').checked;
  const msg = $('#msgContacto');
  if(!acepto){ msg.textContent='Debes aceptar la política de privacidad.'; msg.style.color='var(--warn)'; return; }
  msg.textContent='Mensaje enviado (simulado).'; msg.style.color='var(--ok)';
  e.target.reset();
});

async function cargarRutas(){
  try{
    const res = await fetch('entradas/rutas.json', {cache:'no-store'});
    const data = await res.json();
    RUTAS = data.entries || [];
  }catch(err){
    console.error('Error cargando rutas.json', err);
    RUTAS = [];
  }
  actualizarKPIs();
  poblarSelectProvincias();
  renderRutas(RUTAS);
  renderCatalogo();
}

document.getElementById('year').textContent = new Date().getFullYear();
cargarRutas();
