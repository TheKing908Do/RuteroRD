jQuery(document).ready(function($) {

    'use strict';


        $(".Modern-Slider").slick({
            autoplay:true,
            speed:1000,
            slidesToShow:1,
            slidesToScroll:1,
            pauseOnHover:false,
            dots:true,
            fade: true,
            pauseOnDotsHover:true,
            cssEase:'linear',
           // fade:true,
            draggable:false,
            prevArrow:'<button class="PrevArrow"></button>',
            nextArrow:'<button class="NextArrow"></button>', 
          });

        $('#nav-toggle').on('click', function (event) {
            event.preventDefault();
            $('#main-nav').toggleClass("open");
        });


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
          
        })



    /*    $(".box-video").click(function(){
          $('iframe',this)[0].src += "&amp;autoplay=1";
          $(this).addClass('open');
        });
 
        $('.owl-carousel').owlCarousel({
    loop:true,
    margin:30,
    nav:true,   // 🔹 
    dots:false, // 🔹 
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3,
            loop:false
        }
    }
}) */
// === Rutas Destacadas (Owl) ===
(function initRutasDestacadas(){
  var $owl = $('.owl-carousel.rutas-destacadas');
  if (!$owl.length) return;

  // 1) Si ya estaba iniciado, destruir y “desenvolver” para evitar montado
  if ($owl.hasClass('owl-loaded') || $owl.data('owl.carousel')) {
    $owl.trigger('destroy.owl.carousel');
    $owl.removeClass('owl-loaded owl-hidden');
    // quitar wrappers que deja Owl
    $owl.find('.owl-stage-outer').children().unwrap(); // quita stage-outer
    $owl.find('.owl-stage').children().unwrap();       // quita stage
    $owl.find('.owl-item').children().unwrap();        // quita owl-item
  }

  // 2) Inicializar limpio, sólo este carrusel
  $owl.owlCarousel({
    loop: true,
    margin: 24,
    nav: true,
    dots: true,
    smartSpeed: 450,
    mouseDrag: true,
    touchDrag: true,

    // Variante A: 1 tarjeta con “asomado” y más aire en pantallas grandes
    stagePadding: 24, // móvil
    responsive: {
      576:  { items: 1, stagePadding: 48 },  // móvil ancho
      768:  { items: 2, stagePadding: 60 },  // tablet
      1200: { items: 3, stagePadding: 80, loop: false } // desktop
    },

    // Flechas (el CSS las estiliza)
    navText: [
      '<span class="owl-btn" aria-hidden="true">‹</span>',
      '<span class="owl-btn" aria-hidden="true">›</span>'
    ]
  });

  // 3) Accesibilidad y pista
  var hideHint = function(){ $owl.addClass('rg-hide-hint'); };
  $owl.on('drag.owl.carousel changed.owl.carousel click.owl.carousel', hideHint);

  // Teclado: ← → cuando tiene foco
  $owl.attr('tabindex','0').on('keydown', function(e){
    if (e.key === 'ArrowLeft')  $(this).trigger('prev.owl.carousel');
    if (e.key === 'ArrowRight') $(this).trigger('next.owl.carousel');
  });
})();


        var contentSection = $('.content-section, .main-banner');
        var navigation = $('nav');
        
        //when a nav link is clicked, smooth scroll to the section
        navigation.on('click', 'a', function(event){
            event.preventDefault(); //prevents previous event
            smoothScroll($(this.hash));
        });
        
        //update navigation on scroll...
        $(window).on('scroll', function(){
            updateNavigation();
        })
        //...and when the page starts
        updateNavigation();
        
        /////FUNCTIONS
        function updateNavigation(){
            contentSection.each(function(){
                var sectionName = $(this).attr('id');
                var navigationMatch = $('nav a[href="#' + sectionName + '"]');
                if( ($(this).offset().top - $(window).height()/2 < $(window).scrollTop()) &&
                      ($(this).offset().top + $(this).height() - $(window).height()/2 > $(window).scrollTop()))
                    {
                        navigationMatch.addClass('active-section');
                    }
                else {
                    navigationMatch.removeClass('active-section');
                }
            });
        }
        function smoothScroll(target){
            $('body,html').animate({
                scrollTop: target.offset().top
            }, 800);
        }


        $('.button a[href*=#]').on('click', function(e) {
          e.preventDefault();
          $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top -0 }, 500, 'linear');
        });


});
