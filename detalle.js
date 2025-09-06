/* RuteroRD v2 — detalle.js (galería 2 + 'ver más', videos YouTube, mapa Google Maps, notas por sección) */
const $ = (s)=>document.querySelector(s);

function getParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function toYouTubeEmbed(urlOrId){
  // Accepts full URL or video id
  if(!urlOrId) return null;
  // If only ID
  if(/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) return `https://www.youtube.com/embed/${urlOrId}`;
  // Extract v=
  const u = new URL(urlOrId, window.location.origin);
  if(u.hostname.includes('youtube.com')){
    const id = u.searchParams.get('v');
    if(id) return `https://www.youtube.com/embed/${id}`;
  }
  if(u.hostname.includes('youtu.be')){
    const id = u.pathname.split('/').pop();
    if(id) return `https://www.youtube.com/embed/${id}`;
  }
  return null;
}

async function cargar(){
  const slug = getParam('slug');
  if(!slug){
    $('#notfound').style.display = 'block';
    return;
  }
  let data;
  try{
    const res = await fetch('entradas/rutas.json', {cache:'no-store'});
    data = await res.json();
  }catch(e){
    console.error('No se pudo cargar rutas.json', e);
    $('#notfound').style.display = 'block';
    return;
  }
  const ruta = (data.entries || []).find(r => r.slug === slug);
  if(!ruta){
    $('#notfound').style.display = 'block';
    return;
  }

  // Header
  const hero = document.getElementById('hero');
  const img = ruta.img || (Array.isArray(ruta.gallery) && ruta.gallery[0]) || 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1600&auto=format&fit=crop';
  hero.innerHTML = `<img src="${img}" alt="Imagen de ${ruta.titulo}" style="width:100%;height:340px;object-fit:cover;border-top-left-radius:18px;border-top-right-radius:18px" loading="lazy">`;
  document.getElementById('pill').textContent = `${ruta.tipo} · ${ruta.prov}`;
  document.getElementById('titulo').textContent = ruta.titulo;
  document.getElementById('resumen').textContent = ruta.resumen || '';

  // Galería (2 + ver más)
  const galWrap = document.getElementById('galeria-wrap');
  const gal = document.getElementById('galeria');
  const galNote = document.getElementById('nota-galeria');
  const fotos = Array.isArray(ruta.gallery) ? ruta.gallery : [];
  if(fotos.length > 0){
    galWrap.style.display = 'block';
    const primeras = fotos.slice(0,2);
    gal.innerHTML = primeras.map(src=>`<img src="${src}" alt="Foto de ${ruta.titulo}" loading="lazy" style="width:100%;height:180px;object-fit:cover;border-radius:12px">`).join('');
    const btn = document.getElementById('btnMasFotos');
    if(fotos.length > 2){
      btn.style.display = 'inline-flex';
      btn.addEventListener('click', ()=>{
        gal.innerHTML = fotos.map(src=>`<img src="${src}" alt="Foto de ${ruta.titulo}" loading="lazy" style="width:100%;height:180px;object-fit:cover;border-radius:12px">`).join('');
        btn.remove();
      });
    }
    if(ruta.galleryNote){ galNote.textContent = ruta.galleryNote; }
  }

  // Videos YouTube
  const vidsWrap = document.getElementById('videos-wrap');
  const vids = document.getElementById('videos');
  const vidsNote = document.getElementById('nota-videos');
  const videos = Array.isArray(ruta.videos) ? ruta.videos : [];
  const embeds = videos.map(toYouTubeEmbed).filter(Boolean);
  if(embeds.length > 0){
    vidsWrap.style.display = 'block';
    vids.innerHTML = embeds.map(src=>`<div class="embed mb"><iframe src="${src}" title="YouTube video" allowfullscreen loading="lazy"></iframe></div>`).join('');
    if(ruta.videosNote){ vidsNote.textContent = ruta.videosNote; }
  }

  // Mapa
  const mapWrap = document.getElementById('mapa-wrap');
  const mapEmbed = document.getElementById('mapa-embed');
  const mapNote = document.getElementById('nota-mapa');
  if(ruta.map && (ruta.map.embed || (ruta.map.lat && ruta.map.lng))){
    mapWrap.style.display = 'block';
    if(ruta.map.embed){
      mapEmbed.innerHTML = `<iframe src="${ruta.map.embed}" loading="lazy"></iframe>`;
    }else{
      const { lat, lng, zoom = 12 } = ruta.map;
      const src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
      mapEmbed.innerHTML = `<iframe src="${src}" loading="lazy"></iframe>`;
    }
    if(ruta.mapNote){ mapNote.textContent = ruta.mapNote; }
  }

  document.getElementById('year').textContent = new Date().getFullYear();
}

cargar();
