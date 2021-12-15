$(document).ready(function(){
	$('.slick-carousel-dots').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		dots: true,
		arrows: false,
		prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
        nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
		lazyLoad: 'ondemand',
		slidesToShow: 1,
		slidesToScroll: 1
	});
	$('.slick-carousel-arrows').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		dots: false,
		arrows: true,
		prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
        nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
		lazyLoad: 'ondemand',
		slidesToShow: 1,
		slidesToScroll: 1
	});
	$('.slick-carousel-both').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		dots: true,
		arrows: true,
		prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
        nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
		lazyLoad: 'ondemand',
		slidesToShow: 1,
		slidesToScroll: 1
	});
	$('.js--open-menu').on('click', function(){
		$(".csm-header .csm-navigation").fadeToggle();
		$(this).toggleClass("change");

	});
	$('.csm-has-sub').on('click', function(){
		$($(this).find('.csm-dropdown')).toggleClass("change");

	});
	$(".csm-header .csm-cart >a").hover(function(){
		var t = $(this),
		e = $(".csm-minicart"), 
        i = $(".portal-totalizers-ref .amount-items-em").eq(0).text();
        $(".js--minicart-close__amount").text(i), 
        $(".js--minicart-count").text(i), 768 <= $("body").width() ? (t.hover(function(t) {
            if ($(".csm-minicart__products li").length) return e.addClass("is--active"), !1;
        }), e.hover(function() {}, function() {
            e.removeClass("is--active");
        })) : t.click(function(t) {
            if ($(".csm-minicart__products li").length) return e.toggleClass("is--active"), 
            !1;
        });
	})
});