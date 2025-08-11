jQuery(document).ready(function($) {

  'use strict';

  // ====== Modern Slider (slick) ======
  $(".Modern-Slider").slick({
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    dots: true,
    fade: true,
    pauseOnDotsHover: true,
    cssEase: 'linear',
    // fade:true,
    draggable: false,
    prevArrow: '<button class="PrevArrow"></button>',
    nextArrow: '<button class="NextArrow"></button>',
  });

  // ====== Mobile nav toggle ======
  $('#nav-toggle').on('click', function (event) {
    event.preventDefault();
    $('#main-nav').toggleClass("open");
  });

  // ====== Tabs ======
  $('.tabgroup > div').hide();
  $('.tabgroup > div:first-of-type').show();
  $('.tabs a').click(function(e){
    e.preventDefault();
    var $this = $(this),
        tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
        others = $this.closest('li').siblings().children('a'),
        target = $this.attr('href');
    others.removeClass('active');
    $this.addClass('active');
    $(tabgroup).children('div').hide();
    $(target).show();
  });

  // ====== Play video on click ======
  $(".box-video").click(function(){
    $('iframe', this)[0].src += "&amp;autoplay=1";
    $(this).addClass('open');
  });

  // ====== Owl Carousel ======
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 30,
    responsiveClass: true,
    responsive: {
      0:   { items: 1, nav: true  },
      600: { items: 2, nav: false },
      1000:{ items: 3, nav: true, loop: false }
    }
  });

  // ====== Smooth scroll + Active section (sidebar nav) ======
  // Usa solo el nav lateral para marcar activos
  var contentSection = $('.content-section, .main-banner');
  var navigation = $('.sidebar-navigation nav');

  // Offset para compensar altura fija/márgenes (ajusta si lo necesitas)
  var HEADER_OFFSET = 120;

  // Scroll suave al hacer click en enlaces internos del sidebar
  navigation.on('click', 'a', function(event){
    var href = $(this).attr('href') || '';
    if (href.startsWith('#')) {
      event.preventDefault(); // evita comportamiento por defecto solo para anclas internas
      var $target = $(href);
      if ($target.length) {
        smoothScroll($target);
      }
    }
    // Si no empieza con #, se deja navegar normal (enlaces externos u otras páginas)
  });

  // Actualiza navegación al hacer scroll y al iniciar
  $(window).on('scroll', function(){
    updateNavigation();
  });
  updateNavigation();

  function updateNavigation(){
    var scrollTop = $(window).scrollTop();
    var winH = $(window).height();

    contentSection.each(function(){
      var $sec = $(this);
      var sectionName = $sec.attr('id');
      if (!sectionName) return;

      // Umbral más tolerante para no “pisar” la siguiente sección
      var top = $sec.offset().top - HEADER_OFFSET - winH/4;
      var bottom = $sec.offset().top + $sec.outerHeight() - HEADER_OFFSET - winH/4;

      var link = navigation.find('a[href="#' + sectionName + '"]');
      if (top < scrollTop && bottom > scrollTop){
        link.addClass('active-section');
      } else {
        link.removeClass('active-section');
      }
    });
  }

  function smoothScroll(target){
    $('html, body').animate({
      scrollTop: target.offset().top - HEADER_OFFSET
    }, 800);
  }

  // ====== Botones con ancla dentro de .button (respetando offset) ======
  $('.button a[href*=#]').on('click', function(e) {
    var href = $(this).attr('href') || '';
    if (href.startsWith('#')) {
      e.preventDefault();
      var $dest = $(href);
      if ($dest.length) {
        $('html, body').animate({
          scrollTop: $dest.offset().top - 0 // puedes cambiar a HEADER_OFFSET si quieres el mismo comportamiento
        }, 500, 'linear');
      }
    }
  });

  // ====== Búsqueda opcional en el menú lateral (si agregaste #sidebarSearch) ======
  var input = document.getElementById('sidebarSearch');
  if (input) {
    input.addEventListener('input', function () {
      var q = this.value.toLowerCase().trim();
      navigation.find('ul li').each(function(){
        var txt = $(this).text().toLowerCase();
        this.style.display = (!q || txt.includes(q)) ? '' : 'none';
      });
    });

    input.addEventListener('keydown', function(e){
      if (e.key === 'Enter'){
        e.preventDefault();
        var first = navigation.find('ul li:visible a').get(0);
        if (first) first.click();
      }
    });
  }

});

// Filtrar todo el contenido
document.getElementById('sidebarSearch').addEventListener('input', function () {
    let filter = this.value.toLowerCase().trim();

    // Selecciona TODAS las secciones y artículos que quieras filtrar
    let elements = document.querySelectorAll('section, article, .content, .post, .project-item, .featured-item');

    elements.forEach(function (el) {
        let text = el.innerText.toLowerCase();

        // Si está vacío el filtro, mostrar todo
        if (filter === '') {
            el.style.display = '';
        } else {
            // Si incluye la palabra, mostrar; si no, ocultar
            if (text.includes(filter)) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        }
    });
});

