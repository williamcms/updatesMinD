$(document).ready(function(){
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
		centerMode: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
		{
			breakpoint: 832,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 500,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	});
	$('main.hotsite .slick-destaq').slick({
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
		centerMode: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
		{
			breakpoint: 832,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 500,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	});
})