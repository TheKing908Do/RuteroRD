// main.js

// Importa lógicamente tus otros scripts
// (si no usas bundler, solo los enlazas en el index en orden)
console.log("RuteroRD iniciado ✅");

// Ejemplo: inicializar funciones al cargar
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado");
});

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.owl-carousel')) {
    initOwlCarousel();
  }
});

