$(document).ready(function () {
   $('#mobile-button').on('click', function () {
      if($('#header .nav-wrap').is(':hidden')) {
          $('#header .nav-wrap').show();
      } else {
          $('#header .nav-wrap').hide();
      }
   });

    $('a[href^="#"]').on('click', function (event) {

        var target = $($(this).attr('href'));

        if (target.length) {
            event.preventDefault();
            $('body').animate({
                scrollTop: (target.offset().top - 130)
            }, 1000);
        }

        if (!$('#mobile__menu').is(':hidden')) {
            $('#mobile__menu').hide();
        }
    });

    $(window).on('scroll', function () {
        if($('#header .nav').length) {
            activeMenu();
        }
    });

    $(window).on('resize', function () {
        $('#header .nav-wrap').show();
    });

    $('#myCarousel').carousel({
        interval: 2000
    });

    function activeMenu() {
        var homeStart = $('#home-slider').offset().top, homeEnd = homeStart + $('#home-slider').height();
        var aboutStart = $('#menu').offset().top, aboutEnd = aboutStart + $('#menu').height();
        var servicesStart = $('#rezerwacje').offset().top, servicesEnd = servicesStart + $('#rezerwacje').height();
        var tempScroll = $(window).scrollTop() + 131;

        if (tempScroll >= homeStart && tempScroll < homeEnd) {
            $('#header .nav a[href="#home-slider"]').addClass('active');
        } else {
            $('#header .nav a[href="#home-slider"]').removeClass('active');
        }

        if (tempScroll >= aboutStart && tempScroll < aboutEnd) {
            $('#header .nav a[href="#menu"]').addClass('active');
        } else {
            $('#header .nav a[href="#menu"]').removeClass('active');
        }

        if (tempScroll >= servicesStart && tempScroll < servicesEnd) {
            $('#header .nav a[href="#rezerwacje"]').addClass('active');
        } else {
            $('#header .nav a[href="#rezerwacje"]').removeClass('active');
        }
    }
});
