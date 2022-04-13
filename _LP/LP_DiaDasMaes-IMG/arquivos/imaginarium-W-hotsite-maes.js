$(document).ready(function(){
	$('#banner-topo .banner-menu').slick({
		dots: false,
		arrows: true,
		prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
		nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
		lazyLoad: 'ondemand',
		accessibility: true,
		swipeToSlide: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		variableWidth: true,
		responsive: [
		{
			breakpoint: 900,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				variableWidth: false,
				centerMode: false
			}
		}]
	});
	$('#presentes-destaq .slicker').slick({
		dots: false,
		arrows: true,
		prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
		nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
		lazyLoad: 'ondemand',
		accessibility: true,
		swipeToSlide: true,
		slidesToShow: 5,
		slidesToScroll: 5,
		responsive: [
		{
			breakpoint: 900,
			settings: {
				arrows: false,
				slidesToShow: 2,
				slidesToScroll: 1,
				centerMode: true
			}
		}]
	});
	//Prepara o ambiente para configurações iniciais das vitrines
	var setShelfComponents = (() => {
		$.each($('.prateleira.arrumado'), function(){
			let id = parseInt($(this).find('h2').text()),
				liNum = $(this).find('ul > li[layout]').length;

			$(this).find('h2').attr('aria-hidden', true);	//Precaução para leitores de tela, mesmo estando com display none

			$(this).find('h2').attr('data-id', id);			//Define o id da Coleção
			$(this).find('h2').attr('data-page', 1);		//Define a página inicial
			$(this).find('h2').attr('data-num', liNum); 	//Define a quantidade de itens que serão buscados, levando em conta os que já existem

			//Insere um botão no final da vitrine
			$(this).append('<button class="moreProducts" aria-label="Carregar mais produtos acima">Carregar mais produtos</button');

		});
	})();
	//Retorna uma seleção de vitrines (prateleia) levando em conta os filtros
	var getShelfProducts = (getShelfProducts = (shelf) =>{
		let orderBy = 'O='; //Define um filtro padrão ou pega de um seletor

		let id = 'H:' + $(shelf).find('h2').attr('data-id');
		let page = $(shelf).find('h2').attr('data-page');
		let shelfTemplate = $('.prateleira.arrumado > ul > li[layout]').first().attr('layout');
		let productQtd = $(shelf).find('h2').attr('data-num');
		let selectFilter = (typeof orderBy != 'undefined' ? orderBy : 'O=');

		let urlBusca = '/buscapagina?fq=' + id + '&PS=' + productQtd + '&' + selectFilter + '&sl=' + shelfTemplate + '&cc=' + productQtd + '&sm=0&PageNumber=' + page;
		$.ajax({
			crossDomain: false,
			type: 'GET',
			url: urlBusca,
			success: function(data){
				if(!data){
					$(shelf).find('button.moreProducts').fadeOut();
				}else{
					$(shelf).find('button.moreProducts').before(data);
				}
			}
		})
	});
	var getMoreProductsButton = $('.prateleira.arrumado').on('click', 'button.moreProducts', function(){
		let shelf = $(this).parents('.prateleira.arrumado'),
			page = $(shelf).find('h2').attr('data-page');

		//Avança a páginação
		$(shelf).find('h2').attr('data-page', (parseInt(page) + 1));

		getShelfProducts(shelf);
	});
});