$('main.hotsite .slick-collections').slick({
	autoplay: false,
	autoplaySpeed: 3000,
	dots: false,
	arrows: true,
	prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
	nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
	lazyLoad: 'ondemand',
	accessibility: true,
	infinite: true,
	swipeToSlide: true,
	centerMode: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	swipeToSlide: true
});