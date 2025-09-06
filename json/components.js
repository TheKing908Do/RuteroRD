// components.js

// Ejemplo de inicializar un carrusel con OwlCarousel
function initCarousel() {
  if ($(".owl-carousel").length) {
    $(".owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      nav: true
    });
  }
}

// Ejemplo de inicializar Lightbox
function initLightbox() {
  if ($(".lightbox").length) {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true
    });
  }
}
