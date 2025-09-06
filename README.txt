# RuteroRD v2 — JSON simple con detalle enriquecido

## Qué puedes hacer por ruta
- **Portada** (`img`) + **descripción** (`resumen`).
- **Imágenes** (`gallery`): se muestran **2** primero y luego un botón **“Ver más fotos”** que despliega todas.
- **Videos YouTube** (`videos`): acepta **URL o ID** de YouTube; se incrustan en `detalle.html` automáticamente.
- **Mapa Google Maps** (`map`): usa `embed` (iframe) o coordenadas `lat/lng` (se arma un embed).
- **Notas por sección**: `galleryNote`, `videosNote`, `mapNote` (texto libre debajo de cada bloque).

## Estructura
- `index.html` — Home (tarjetas con 2 imágenes + botón “Ver guía”)
- `detalle.html` — Plantilla única (usa `?slug=`)
- `css/style.css` — Estilos
- `js/app.js` — Lógica del home (lee `entradas/rutas.json`)
- `js/detalle.js` — Lógica del detalle; galería, videos y mapa
- `entradas/rutas.json` — **UN único archivo** de datos con todas las rutas
- `img/`, `videos/` — opcionales

## Agregar una ruta
1. Abre `entradas/rutas.json` y agrega un objeto en `entries` con al menos:
   - `slug`, `titulo`, `prov`, `tipo`
2. Opcionalmente añade: `img`, `resumen`, `tiempo`, `dif`, `gallery` (>=2), `videos`, `map`, `galleryNote`, `videosNote`, `mapNote`.
3. Guarda. El home la listará y `detalle.html?slug=mi-slug` mostrará todo.

## Hosting
Funciona perfecto en GitHub Pages / dominio propio (el `fetch` al JSON es permitido).
