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
		$(".csm-header .csm-mobile .csm-center .csm-menu").addClass("csm-active");


	});
});