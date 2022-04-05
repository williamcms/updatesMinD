/*
 *	Código por William Di Biasi Bogik
 *
 */
(isMobile = () => {
	let isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
		isMobile = true;
	}
	return isMobile;
});
var formOn = (formOn = (num) => {
	$("#form"+num).fadeIn();
});
var formOff = (formOff = (num) => {
	$("#form"+num).fadeOut();
	// window.location = window.location;
});
$(document).ready(function(){
	"use strict";
	//Addons
	if(typeof(Array.prototype.first) === 'undefined'){
		Object.defineProperty(Array.prototype, 'first', {
			value() {
				return this.find(e => true)     // or this.find(Boolean)
			}
		});
	}
	// Atualiza os parametros do url
	function updateQueryString(key, value) {
		if (history.pushState){
			let searchParams = new URLSearchParams(window.location.search);
			searchParams.set(key, value);
			let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
			window.history.pushState({path: newurl}, '', newurl);
		}
	} 
	//Algumas alterações para acessibilidade baseadas em mobile/desktop
	var timedChanges = (function(){
		let mView = $('.mobile-view'),
		dView = $('.desktop-view'),
		mMenu = $('#csm-navigation-mobile'),
		dMenu = $('#csm-navigation'),
		sLabel = $('label[for="support-extended"]'),
		aLabel = $('label[for="aboutUs-extended"]');
		if(isMobile()){
			$.each(dView, function(){
				$(this).attr('aria-hidden', true);
			});
			mMenu.attr('aria-hidden', false);
			dMenu.attr('aria-hidden', true);

			sLabel.attr('aria-hidden', false);
			aLabel.attr('aria-hidden', false);
		}else{
			$.each(mView, function(){
				$(this).attr('aria-hidden', true);
			});
			mMenu.attr('aria-hidden', true);
			dMenu.attr('aria-hidden', false);

			sLabel.attr('aria-hidden', true);
			aLabel.attr('aria-hidden', true);
		}
	})();
	//Fecha o overlay/modal se clicar fora da área
	$('.overlayform').on('click', function(e){
		if($(e.target).is('.overlayform')){
			$(this).fadeToggle('slow');
		}
	});
	//LazyLoad
	var lazyLoad = (lazyLoad = () =>{
		$('.lazy').Lazy({
			scrollDirection: 'both',
			effect: 'fadeIn',
			visibleOnly: true,
			onError: function(e) {
				console.log('error loading ' + e.data('src'));
			},
			afterLoad: function(e){
				e.addClass('lazyComplete');
			}
		});
	});
	var lazyOnPageLoad = (function(){
		lazyLoad();
	})();
	//Então espera alguns eventos para carregar imagens subsequentes
	//Maioria surgindo por meio de chamadas do ajax
	$(document).on('DOMNodeInserted scroll click swipe', function(){
		lazyLoad();
	});
	//Slickers
	$('.slick-carousel-dots').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		dots: true,
		arrows: false,
		prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
		nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
		lazyLoad: 'ondemand',
		accessibility: true,
		swipeToSlide: true,
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
		accessibility: true,
		swipeToSlide: true,
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
		accessibility: true,
		swipeToSlide: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	// Menu
	var openMenu = $('.js--open-menu').on('click', function(){
		$(".csm-header .csm-wrapper, .csm-header .csm-navigation, .js--open-menu").toggleClass('change');
		$("body").toggleClass('noscroll');
		// Atributos para Leitores de tela
		let $x = $(this).hasClass('change');
		$(".csm-header .csm-middle .csm-center .csm-mobile button.js--open-menu").attr('aria-expanded', $x);
		$(".csm-header .csm-middle .csm-center .csm-mobile button.js--open-menu").attr('aria-hidden', !$x);
	});
	var showDropDownMenu = $('.csm-has-sub').on('click keyup', function(e){
		if(e.which == 9){
			$($(this).find('.csm-dropdown')).addClass("change");
		}else{
			$($(this).find('.csm-dropdown')).toggleClass("change");
		}
	});
	var tabOnDropDownMenu = $('.csm-has-sub > .csm-dropdown > ul > li:last-child').on('keydown', function(e){
		if(e.which == 9){
			$(this).parents('.csm-dropdown').removeClass('change');
		}
	});
	var hideMenuOnScroll = (hideMenuOnScroll = () => {
		let top = 0;
		$(window).on("scroll", function() {
			$(window).scrollTop() > top && 1 < $(window).scrollTop() ? ($(".csm-header .csm-wrapper").slideUp(), 
			$(".csm-header .csm-wrapper .csm-middle .csm-center").addClass("scrollMenu"), $(".csm-header .csm-minicart").addClass("scrollMenu"), $(".csm-header .csm-benefits").slideUp(), $(".csm-header #popup-adicionando").removeClass("scrollMenu").addClass("hiddenMenu")) : $(window).scrollTop() === 0 ? ($(".csm-header .csm-benefits").slideDown(), 
			$(".csm-header .csm-wrapper").slideDown(), $(".csm-header .csm-wrapper .csm-middle .csm-center").removeClass("scrollMenu"), $(".csm-header .csm-minicart").removeClass("scrollMenu"), $(".csm-header #popup-adicionando").removeClass("scrollMenu hiddenMenu")) : $(".csm-header .csm-wrapper").slideDown(), 
			($(window).scrollTop() < top && $(window).scrollTop() != 0 && $(".csm-header #popup-adicionando").removeClass("hiddenMenu").addClass("scrollMenu"));
			top = $(window).scrollTop();
		});
	})();
	// Minicart & Products List
	var showCartWhenHoverIcon = $('.csm-header .csm-cart > a').on('hover', function(){
		let t = $(this),
		e = $(".csm-minicart"), 
		i = $(".portal-totalizers-ref .amount-items-em").eq(0).text();
		(768 <= $("body").width()) ? (t.hover(function(t) {
			if(parseInt($(".cart-info > .amount-items > em.amount-items-em").first().text()) != 0) return e.addClass("is--active"), false;
		}), e.hover(function() {}, function() {
			e.removeClass("is--active");
		})) : t.click(function(t) {
			if(parseInt($(".cart-info > .amount-items > em.amount-items-em").first().text()) != 0) return e.toggleClass("is--active"), false;
		});
	});
	var vtexUpdateItem = (vtexUpdateItem = (itemIndex, qty) =>{
		vtexjs.checkout.getOrderForm()
		.then(function(orderForm){
			let item = orderForm.items[itemIndex];
			let updateItem = {
				index: itemIndex,
				quantity: qty,
				seller: item.seller
			};
			return vtexjs.checkout.updateItems([updateItem], null, false);
		})
		.done(function(orderForm) {
			// console.log(orderForm);
			updateMiniCart();
			(qty == 0 && $('.csm-minicart__products > ul > li')[itemIndex].remove());
		});
	});
	//Scripts que serão acionados com base no orderForm
	var checkOrderForm = (checkOrderForm = () =>{
		let minicart = $('.csm-header .csm-middle .csm-center .csm-user > ul > li.csm-cart > a');
		vtexjs.checkout.getOrderForm().done(function(t) {
			(t.items.length > 0 && updateMiniCart());
		});
	})();
	var updateMiniCart = (updateMiniCart = () =>{
		let p = $('.csm-header .csm-minicart .csm-minicart__products .product-list'),
		item = $('.csm-header .csm-cart .portal-totalizers-ref > .amount-items-in-cart > .cartInfoWrapper .amount-items em.amount-items-em').first().text(),
		minicartIcon = $('.csm-header .csm-middle .csm-center .csm-user > ul > li.csm-cart > a'),
		itemsQtyMessage = $('.csm-header .csm-middle .csm-center .csm-user > ul > li.csm-cart > a > span.items');

		itemsQtyMessage.text('Você possui ' + item + ' ' + (item == 1 ? 'item' : 'itens') + 'no Carrinho');
		minicartIcon.attr('aria-label', 'Você possui ' + item + ' ' + (item == 1 ? 'item' : 'itens') + ' no Carrinho');
		minicartIcon.attr('title', 'Você possui ' + item + ' ' + (item == 1 ? 'item' : 'itens') + ' no Carrinho');

		vtexjs.checkout.getOrderForm().done(function(t) {
			$.each(t.items, function(i){
				if(p.find('li[data-id='+ this.id +']').length == 0){
					p.append('<li data-id="'+ this.id +'" available-qty="'+ getSkuData(this.id).SkuSellersInformation.first().AvailableQuantity
 +'"></li>');
					p.find('li[data-id='+ this.id +']').addClass('item-list').append('<div class="product-wrapper"></div><small class="message text-muted italic center_m"></small>');
					if($('li[data-id='+ this.id +']').attr('available-qty') <= 5){
						p.find('li[data-id='+ this.id +'] small.message').text('Há apenas ' + $('li[data-id='+ this.id +']').attr('available-qty') + ($('li[data-id='+ this.id +']').attr('available-qty') <= 1 ? ' unidade disponível' : ' unidades disponíveis'));
					}
					p.find('li[data-id='+ this.id +'] div.product-wrapper').append('<div class="product__image"><img src="'+ (this.imageUrl).replace("-350-303", "-400-600") +'" alt="'+ this.name +'" title="'+ this.name +'" /></div>');
					p.find('li[data-id='+ this.id +'] div.product-wrapper').append('<div class="product__info-container"></div><a ndx="'+ i +'" role="button" class="remove" title="Remover produto">Remover</a>');
					p.find('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container').append('<div class="product__name">'+ this.name +'</div>');
					p.find('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container').append('<div class="product__info"></div>');
					p.find('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > div.product__info').append('<div class="product__price">'+ this.formattedPrice +'</div>');
					p.find('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > div.product__info').append('<div class="product__management"></div>');
					p.find('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > div.product__info > div.product__management').append('<a ndx="'+ i +'" role="button" class="minus">&#45;</a>');
					p.find('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > div.product__info > div.product__management').append('<input ndx="'+ i +'" type="number" value="'+ this.quantity +'" readonly=""/>');
					p.find('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > div.product__info > div.product__management').append('<a ndx="'+ i +'" role="button" class="plus">&#43;</a>');
				}else{
					p.find('li[data-id='+ this.id +'] div.product-wrapper > product__image img').attr('src', (this.imageUrl).replace("-350-303", "-400-600")).attr('alt', this.name).attr('title', this.name);
					p.find('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > product__name').text(this.name);
					p.find('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > div.product__info > product__price').text(this.formattedPrice);
					p.find('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > div.product__info > div.product__management > a.minus').attr('ndx', i);
					p.find('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > div.product__info > div.product__management > input').val(this.quantity).attr('ndx', i);
					p.find('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > div.product__info > div.product__management > a.plus').attr('ndx', i);
					p.find('li[data-id='+ this.id +'] div.product-wrapper > a.remove').attr('ndx', i);
				}
				if($('li[data-id='+ this.id +']').attr('available-qty') <= 1 || $('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > div.product__info > div.product__management > input').val() == $('li[data-id='+ this.id +']').attr('available-qty')){
					$('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > div.product__info > div.product__management a.plus').attr('disabled', true);
				}else{
					$('li[data-id='+ this.id +'] div.product-wrapper > div.product__info-container > div.product__info > div.product__management a.plus').removeAttr('disabled');
				}
			})
		});
	});
	var minicartAddQtd = $(document).on('click', '.csm-header .csm-minicart a[ndx].plus', function(e){
		let index = $(this).attr('ndx'),
		qty = parseInt($('.csm-header .csm-minicart .product-list input[ndx='+ index +']').val());
		vtexUpdateItem(index, ++qty);
	});
	var minicartRmvQtd = $(document).on('click', '.csm-header .csm-minicart a[ndx].minus', function(e){
		let index = $(this).attr('ndx'),
		qty = parseInt($('.csm-header .csm-minicart .product-list input[ndx='+ index +']').val());
		vtexUpdateItem(index, --qty);
	});
	var minicartRmvAll = $(document).on('click', '.csm-header .csm-minicart a.remove', function(e){
		let index = $(this).attr('ndx'),
		qty = parseInt($('.csm-header .csm-minicart .product-list input[ndx='+ index +']').val());
		vtexUpdateItem(index, 0);
	});
	var addtoBag = $(document).on('click', '.js--shelf-buy', function(e){
		e.preventDefault(), e.stopPropagation();
		let pid = $(this).parents('.csm-shelf__product').data('id'),
		t = document.cookie.split('; VTEXSC=').pop().split(';').shift().split('sc=')[1];
		$.ajax({
			accept: "application/vnd.vtex.ds.v10+json",
			contentType: 'application/json; charset=utf-8',
			crossDomain: false,
			type: 'GET',
			url: '/api/catalog_system/pub/products/search/?fq=productId:' + pid
		}).done(function(e){
			return vtexjs.checkout.addToCart([{
				id: e.first().items.first().itemId,
				quantity: 1,
				seller: e.first().items.first().sellers.first().sellerId
			}], null, t).done(function(t){
				updateMiniCart();
				$('#popup-adicionando, #barratempo').addClass('is--active'), setTimeout(function(){
					$('#popup-adicionando, #barratempo').removeClass('is--active')
				}, 6200);
			}), false;
		});
	});
	// Coleções / Categorias
	//Abre a seleção de filtros da página de coleção
	var getFilterFromParms = (function(){
		let searchParams = new URLSearchParams(window.location.search),
			orderFilter = searchParams.get('O');

			if(orderFilter != undefined){
				$('.orderByList > ul > li[data-order*='+ orderFilter +']').addClass('is--active');
			}
	})();
	var openFilterSelection = $('.orderByList > .filterSelector').on('click', function(){
		let options = $('main.collection > .main-container > .collectionWrapper > .row > .col-auto .orderByList > ul');

		options.toggleClass('is--active');
	})
	var checkPageType = (checkPageType = () =>{
		let v = $('.resultItemsWrapper'),
			t = $('.page-title.category-title > h1');

		// Atribui um indice de paginação
		(typeof v.data('page') == 'undefined' && v.attr('data-page', 1));

		// Verifica se existe a variável da vtex que informa informações de categorias
		// ou procura informações sobre a coleção, tentando distinguir entre as duas páginas.
		// Após isso, atribui um indice para paginação e grava a o id referente a vitrine
		if(typeof vtxctx == 'object' && vtxctx.categoryId != null){
			v.attr('data-categoryid', vtxctx.categoryId);
			// Adiciona um título para páginas de categoria e remove caracteres numéricos
			// Móveis2 --> Móveis
			t.text((vtxctx.categoryName).replace(/\d+/g, ''));
			return 'category';
		}else if((partialSearchUrl.split('H%3a').length > 1)){
			let h = partialSearchUrl.split('H%3a');
				h = h[1].split('&PS', 1);
			v.attr('data-collectionid', h.toString());
			return 'collection';
		}else{
			// Último recurso para identificar informações da coleção
			let h = $('.orderBy > select[onchange]').attr('onchange').split('?PS', 1).toString();
				h = h.split('\'/')[1];
				v.attr('data-collectionid', h.toString());
			return 'undefined';
		}
	});
	var getShelfProducts = (getShelfProducts = () =>{
		let orderBy = $('.orderByList > ul > li.is--active').attr('data-order');

		let id = (checkPageType() != 'category' ? 'H:' + $('.resultItemsWrapper').data('collectionid') : 'C:' + $('.resultItemsWrapper').data('categoryid'));
		let page = $('.resultItemsWrapper').attr('data-page');
		let shelfTemplate = $('.has-shelf--default > ul > li[layout]').first().attr('layout');
		let productQtd = $('.has-shelf--default > ul > li[layout]').length;
		let selectFilter = (typeof orderBy != 'undefined' ? orderBy : 'O=');

		let urlBusca = '/buscapagina?fq=' + id + '&PS=' + productQtd + '&' + selectFilter + '&sl=' + shelfTemplate + '&cc=' + productQtd + '&sm=0&PageNumber=' + page;
		$.ajax({
			crossDomain: false,
			type: 'GET',
			url: urlBusca,
			success: function(data){
				if(!data){
					$('button.seemore[data-controls=vitrine]');
				}else{
					$('.resultItemsWrapper > [id*=ResultItems_]').html(data);
				}
			}
		})
	});
	var changeShelfFilter = $('.orderByList > ul > li').on('click', function(e){
		e.preventDefault();
		// Remove qualquer filtro ativo
		$('.orderByList > ul > li').removeClass('is--active')
		// Aplica o novo filtro
		$(this).addClass('is--active');
		// Altera o url com o filtro selecionado
		updateQueryString('O', $(this).data('order').split('O=')[1])

		getShelfProducts();
	});
	var changeShelfPage = $('.resultItemsWrapper > .pager > ul.pages').on('click', 'li:not(.pgEmpty, .pgCurrent)', function(){
		let v = $('.resultItemsWrapper'),
			li = $('.resultItemsWrapper > .pager > ul.pages > li')
			s = $(this);

		li.removeClass('pgCurrent');
		s.addClass('pgCurrent')
		v.attr('data-page', parseInt(s.text()));

		getShelfProducts();
	});
	//Pequena animação para o filtro mobile
	if(isMobile()){
		var filterAnimation = $('.orderByList > .filterSelector').on('click', function(){
			let wrapper = $('.orderByList > ul'),
				filters = $('.orderByList > ul > li[data-order]'),
				filtersR = [].reverse.call($('.orderByList > ul > li[data-order]'));

			if((wrapper).hasClass('is--active')){
				$.each(filtersR, function(i){
					let $this = $(this);					
					$this.css('animation', 'popIn '+ (i + 1) +'s ease-in');
					$this.css('display', 'block');
					
					setTimeout(function(){
						$this.find('span').first().fadeIn();
					}, (i * 1000));

					setTimeout(function(){
						$this.find('span').first().fadeOut();
					}, 1500 + (i * 1000));
				});
			}else{
				$.each(filters, function(i){
					let $this = $(this);
					wrapper.css('display', 'flex');
					$this.css('animation', 'popOut '+ (i + 1) +'s ease-in');

					setTimeout(function(){
						$this.fadeOut();
					}, (i * 500));

					setTimeout(function(){
						wrapper.css('display', 'none');
					}, 1500);
				});
			}
		});
	}
	//Restrito a páginas de produto apenas
	if($('main .csm-product').length != 0){
		var variableSKU = (variableSKU = () =>{
			let arr = $('main .csm-product #___rc-p-sku-ids').get(0).value.split(','),
			pid = $('main .csm-product #___rc-p-id').get(0).value,
			f = $('main .csm-product .product-sku-selection').eq(0),
			prevAvaliable = null,
			bwrapper = $('main .csm-product div.product-buy'),
			bExists = $('main .csm-product div.product-buy a.buy-button.buy-button-ref');
			if(arr.length > 1){
				$.ajax({
					accept: "application/vnd.vtex.ds.v10+json",
					contentType: 'application/json; charset=utf-8',
					crossDomain: false,
					type: 'GET',
					url: '/api/catalog_system/pub/products/search/?fq=productId:' + pid
				}).done(function(e){
					//Exibe o select
					f.slideDown();

					$.each(e.first().items, function(i){
						let avaliable = this.sellers.first().commertialOffer.AvailableQuantity,
						variations = {},
						prices = {
							'NumberOfInstallments' : null,
							'Value' : null
						};
						//Verifica qual o primeiro produto que possui unidades disponíveis
						prevAvaliable = (i == 0 && avaliable > 0 ? ' selected' : (i > 0 && avaliable > 0 && prevAvaliable == null ? ' selected' : ''));
						//Coleta o nome das variações para criar o select
						$.each(e.first().items.sort(), function(x){
							let [first, ...rest] = this.name.split(' '),
							second = (rest.join(' ') == '' ? null : rest.join(' '));
							variations[x] = {'var' : {first, second}}
						})
						//Coleta a melhor forma de pagamento parcelado
						$.each(this.sellers.first().commertialOffer.Installments, function(x){
							if((this.Value < prices.Value || prices.Value == null) && (this.NumberOfInstallments > prices.NumberOfInstallments || prices.NumberOfInstallments == null)){
								prices = {
									'NumberOfInstallments' : this.NumberOfInstallments,
									'Value' : this.Value
								}
							}
						})
						//Caso sejam nomes compostos por duas palavras, divide-os em grupos
						//Ex: Carvalho Rosa, Carvalho Branco
						if(variations[i].var.second != null){
							if((i > 0 ? variations[i].var.first != variations[i-1].var.first : false ||
							 i == 0) && f.find('optgroup[label='+ variations[i].var.first +']').length < 1){
								f.append('<optgroup label="'+ variations[i].var.first +'">');
								
							}

							f.find('optgroup[label='+ variations[i].var.first +']').eq(0).append('<option class="sku-item" sku-id="'+ this.itemId +'" id="'+ this.itemId +'" sku-price="'+ this.sellers.first().commertialOffer.Price +'" sku-installments-price="'+ prices.Value +'" sku-installments-amount="'+ prices.NumberOfInstallments +'" sku-qty="'+ this.sellers.first().commertialOffer.AvailableQuantity +'" cart-ref="'+ this.sellers.first().addToCartLink +'" '+ (avaliable <= 0 ? 'disabled' : '') + prevAvaliable +'>'+variations[i].var.second+'</option>');
							$('#' + this.itemId).data('sku-images', this.images);

							if(((i > 0 ? true : false) && 
								(i < Object.keys(variations).length - 1 && i > 0 ? variations[i].var.first != variations[i+1].var.first : '') || 
								i == Object.keys(variations).length - 1) && f.find('optgroup[label='+ variations[i].var.first +']').length < 1){
								f.append('</optgroup>');	
							}
							//Caso sejam nomes simples
							//Ex: P, M, GG, Preto, Rosa
						}else{
							f.append('<option class="sku-item" sku-id="'+ this.itemId +'" id="'+ this.itemId +'" sku-price="'+ this.sellers.first().commertialOffer.Price +'" sku-installments-price="'+ prices.Value +'" sku-installments-amount="'+ prices.NumberOfInstallments +'" sku-qty="'+ this.sellers.first().commertialOffer.AvailableQuantity +'" cart-ref="'+ this.sellers.first().addToCartLink +'" '+ (avaliable <= 0 ? 'disabled' : '') + prevAvaliable +'>'+variations[i].var.first+'</option>');
							$('#' + this.itemId).data('sku-images', this.images);
						}
						if(i == e.first().items.length - 1){
							f.prepend('<option '+ prevAvaliable +' sku-id="none">Nenhum selecionado</option>');
						}
					});
					if(bExists.length != 0){
						bExists.get(0).href = e.first().items.first().sellers.first().addToCartLink;
					}else{
						bwrapper.html('<a target="_top" class="buy-button buy-button-ref" href="'+ e.first().items.first().sellers.first().addToCartLink +'" style="display:block">Comprar</a>')
					}
					f.trigger('change');
				});
			}
		})();
		var selectvariableSKU = $('main .csm-product .product-sku-selection').on('change', function(){
			let bwrapper = $('main .csm-product div.product-buy'),
			pwrapper = $('main .csm-product .csm-product__info .product-price'),
			item = $(this).find(':selected'),
			priceQty = $('main .csm-product .price-quanty');

			if(item.attr('sku-id') == 'none'){
				priceQty.slideUp();
				bwrapper.find('a.buy-button.buy-button-ref').remove();
				pwrapper.find('.plugin-preco').remove()

				$(".available-alert").eq(0).html('<p>Selecione um produto!</p>');
			}else{
				priceQty.slideDown();
				if(bwrapper.find('a.buy-button.buy-button-ref').length != 0){
					bwrapper.find('a.buy-button.buy-button-ref').get(0).href = item.attr('cart-ref');
				}else{
					bwrapper.html('<a target="_top" class="buy-button buy-button-ref" href="'+ item.attr('cart-ref') +'" style="display:block">Comprar</a>')
				}
				if(pwrapper.find('.plugin-preco .productPrice .descricao-preco em.price-best-price').length != 0){
					pwrapper.find('.plugin-preco .productPrice .descricao-preco em.price-best-price strong.skuBestPrice').text('R$ ' + parseFloat(item.attr('sku-price')).toFixed(2).replace(/\./, ","));

					pwrapper.find('.plugin-preco .productPrice .descricao-preco em.price-installments strong.skuBestInstallmentNumber').text(item.attr('sku-installments-amount') + 'x');
					pwrapper.find('.plugin-preco .productPrice .descricao-preco em.price-installments strong.skuBestInstallmentValue').text('R$ ' + item.attr('sku-installments-price'));
				}else{
					pwrapper
					.append('<div></div>')
					.find('div')
					.addClass('plugin-preco')
					.append('<div></div>')
					.find('div')
					.addClass('productPrice')
					.append('<div></div>')
					.find('div')
					.addClass('descricao-preco')

					pwrapper.find('.plugin-preco .productPrice .descricao-preco')
					.append('<em class="valor-por price-best-price"></em>')
					.find('em.price-best-price')
					.html('Por: <strong class="skuBestPrice">R$ '+ parseFloat(item.attr('sku-price')).toFixed(2).replace(/\./, ",") +'</strong>');

					pwrapper.find('.plugin-preco .productPrice .descricao-preco')
					.append('<em class="valor-dividido price-installments"></em>')
					.find('em.price-installments')
					.html('ou <strong class="skuBestInstallmentNumber">'+ item.attr('sku-installments-amount') +'x</strong> de <strong class="skuBestInstallmentValue">R$ '+ item.attr('sku-installments-price') +'</strong>');
				}
				if(parseInt(item.attr('sku-qty')) <= 5){
					$(".available-alert").eq(0).html('<p>Corre que só tem <strong>' + item.attr('sku-qty') + "</strong> unidades disponíveis!</p>");
					$(".available-alert").eq(0).fadeIn();
				}else{
					$(".available-alert").eq(0).fadeOut();
				}

				if(item.data('sku-images').length > 0){
					let sku_images = $('#'+ item.attr('sku-id')).data('sku-images'),
					imagesWrapper = $('.csm-product .csm-product__images .product-images #show ul.thumbs');
					//Limpa as imagens pre-existentes
					imagesWrapper.empty();
					$.each(sku_images, function(i, n){
						imagesWrapper.append('<li><a href="javascript:void(0);" rel="" zoom="" clas="ON"><img src="'+ n.imageUrl +'" title="'+ n.imageLabel +'" alt="'+ n.imageText +'" /></a></li>')
					});
				}
			}
		});
		var availableAlert = (function() {
			try{
				let t = skuJson.productId;
				$.ajax({
					url: "/api/catalog_system/pub/products/search/?fq=productId:" + t,
					method: "GET",
					timeout: 0,
					headers: {
						"Content-Type": "application/json"
					}
				}).done(function(t) {
					let e = t[0].items[0].sellers[0].commertialOffer.AvailableQuantity, 
					b = t[0].brand;
					0 < e && e <= 5 && $(".available-alert").html('<p>Corre que só tem <strong>' + e + "</strong> unidades disponíveis!</p>"), 
					$(".productBySeller").html('<p>Produzido e entregue por: <strong>' + b + "</strong></p>");
				});
			}catch(e){
				console.log(e);
			}
		})();
		// Troca a imagem do produto por outra de tamanho maior
		// É possivel trocar a dimensão no CMS > Configurações > Tipos de Arquivo,
		// mas afeta todos os sites
		(changeProductImage = () =>{
			$("#botaoZoom img").each(function() {
				$(this).attr("src", $(this).attr("src").replace("-350-303", "-400-600"));
			});
		});
		var realidadeAl = (function() {
			let t = navigator.userAgent || navigator.vendor || window.opera, 
			e = $(".value-field.3D-ios").text(), 
			i = $(".value-field.3D-android").text(), 
			o = $(".value-field.3D-ios").text(), 
			s = $(".value-field.3D-desktop").text();

			"" != o && $("#csm-realidadeAumentada").show(), 
			"" != s && ($(".productAugmentedRealityBox").show(), 
				$(".productAugmentedRealityBox").attr("src", s)), 
			/android/i.test(t) && ($("#botaoAndroid").attr("href", i), 
				$("#botaoAndroid").closest("button").show()), 
			/iPad|iPhone|iPod/.test(t) && !window.MSStream && ($("#botaoiOS").attr("href", e), 
			$("#botaoiOS").closest("button").show(), 
			$(".productAugmentedRealityBox").hide());
		})();
		var pdfDowlond = (function() {
			let t = $(".value-field.pdf-dowload").text();
			"" != t && ($(".csm-dowload-pdf").show(), $("#csm-pdf-to-download").attr("href", t));
		})();
	}
	// Newsletter
	var isEmailValid = (isEmailValid = (t) =>{
		return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t);
	});
	var verifyNewsletter = $('#sendFCEmail').on('click', function(e){
		let i = $("#fcEmail").val();
		return isEmailValid(i) ? sendNewsletterEmail(i) : ($("#fcEmail").css("border", "1px solid #D00D0D"), 
				$("footer .news-footer .message").html('Preencha o campo abaixo com um e-mail válido'), 
				$("footer .news-footer .message").effect( "shake" ), false);
	});
	var sendNewsletterEmail = (sendNewsletterEmail = (e) =>{
		let i = {};
		i.email = e, $.ajax({
			accept: "application/vnd.vtex.ds.v10+json",
			contentType: "application/json; charset=utf-8",
			crossDomain: false,
			data: JSON.stringify(i),
			type: "POST",
			url: "/api/dataentities/PU/documents",
			success: function(e) {
				$("#formFC").html("<p class='highlight'>E-mail cadastrado com sucesso!</p><small>Você receberá um cupom de desconto em seu e-mail.</small>"), 
				setTimeout(function() {
					// t("#newsletter-pop").removeClass("slide");
				}, 5e3), sessionStorage.setItem("mindNewsletter", true);
			},
			error: function(t) {}
		})
	});
	var verifyNewsletterOnSession = (verifyNewsletterOnSession = () =>{
		if(sessionStorage.getItem("mindNewsletter") === 'true'){
			$("#formFC").html("<p class='highlight'>E-mail cadastrado com sucesso!</p><small>Você receberá um cupom de desconto em seu e-mail.</small>")
		}
	})();
	// Account
	var getLoginStatus = (getLoginStatus = (e) =>{
		let s = {},
		i = $('.js--logged-in'),
		o = $('.js--logged-out'),
		j = $('.js--user-name'),
		m = $('.csm-header .csm-navigation > .csm-center div.csm-menu__top > .csm-menu__top-customer > .csm-menu__top-customer-text h6'),
		n = $('.csm-header .csm-navigation > .csm-center div.csm-menu__top .csm-menu__top-account');

		$.ajax({
			"async": true,
			"url": "/no-cache/user/welcome",
			"method": "GET",
			"headers": {
				"content-type": "application/json; charset=utf-8"
			}
		}).done(function(r){
			let msg = $(r).text().split('.').first();
			if(msg.length > 12){
				console
				msg = msg.trim().replace(' ', ', <strong>') + '</strong>!';
			}else{
				msg = 'Olá, <strong>Minder!</strong>';
			}

			$.ajax({
				"async": true,
				"url": "/api/vtexid/pub/authenticated/user",
				"method": "GET",
				"headers": {
					"content-type": "application/json; charset=utf-8"
				}
			}).done(function(e){
				if(e != null){
					s['logged'] = true;
					s['user'] = e.user;
					s['userId'] = e.userId;
					s['userType'] = e.userType;
					s['message'] = msg;
				}else{
					s['logged'] = false;
					s['user'] = null;
					s['userId'] = null;
					s['userType'] = null;
					s['message'] = 'Entre ou Cadastre-se';
				}
				return (s["logged"] == true ? (i.show() && o.hide() && j.html(s["message"]) && m.html(s["message"]) && n.text('Minha Conta')) : (o.show() && i.hide() && j.html(s["message"])) && m.html(s["message"]));
			});
		});
	})();

	// Numeração de resultados de busca
	// (jQuery, window, document), function(t, e, i, o) {
 //        "use strict";
 //        PFTX.pages.catalog = new PFTX.constructor.page("catalog-category-view"), PFTX.pages.catalog.redesignVitrine = function() {
 //            "gdUwlr1U" === function(t) {
 //                var i, s, n = decodeURIComponent(e.location.search.substring(1)).split("&");
 //                for (s = 0; s < n.length; s++) if ((i = n[s].split("="))[0] === t) return i[1] !== o && i[1];
 //            }("dev") && t("body").addClass("redesignVitrine");
 //        }, PFTX.pages.catalog.urlParameter = function() {
 //            var i = t(".resultado-busca-numero .value").html();
 //            t(".resultado-busca-filtro .sorter").after('<p class="labelQuant">' + i + " Produto(s)</p>"), 
 //            e.location.host.indexOf("casamind") < 0 ? t('select[id="PS"]').html('<option value="12">12</option><option value="24" selected="selected">24</option><option value="36">36</option><option value="48">48</option>') : t('select[id="PS"]').html('<option value="12">12</option><option value="24">24</option><option value="36">36</option><option value="48" selected="selected">48</option>');
 //            var s = function(t) {
 //                var i, s, n = decodeURIComponent(e.location.search.substring(1)).split("&");
 //                for (s = 0; s < n.length; s++) if ((i = n[s].split("="))[0] === t) return i[1] === o || i[1];
 //            }("PS");
 //            t('select[id="PS"] option').each(function(e, i) {
 //                s == t(this).attr("value") && t(this).attr("selected", "selected");
 //            });
 //        }, PFTX.pages.catalog.DOMReady = function() {
 //            PFTX.modules.gridControl.init(), PFTX.pages.catalog.redesignVitrine(), PFTX.pages.catalog.urlParameter();
 //        };
 //    }
	//NeoAssist 
	var neoAssist = (function () {
		$('body').append('<div id="neoAssist"></div>');

		window.NeoAssistTag = {};
		NeoAssistTag.querystring = true;
		NeoAssistTag.pageid = '';
		NeoAssistTag.clientdomain = 'grupounico.neoassist.com';
		NeoAssistTag.initialize = {};
		let na = document.createElement('script');
		na.type = 'text/javascript';
		na.async = true;
		na.src = 'https://cdn.atendimen.to/n.js';
		let s = document.getElementById('neoAssist');
		s.parentNode.insertBefore(na, s);
	})();
	// Footer
	$('footer #support-extended, label[for="support-extended"]').on('change keyup', function(e){
		let chkd = $('#support-extended')[0];
		// 32 - Space | 13 - Enter
		if(e.which == 32 || e.which == 13){
			chkd.checked = !chkd.checked;
			$(this).attr('aria-expanded', chkd.checked);
			$(this).attr('aria-label', (chkd.checked ? 'Ocultar' : 'Exibir') + ' itens da seção Ajuda e suporte');
		}
		if(!chkd.checked){
			$($('.support-wrapper .support-guide svg line.cls-2')[0]).css('display', 'block');
		}else{
			$($('.support-wrapper .support-guide svg line.cls-2')[0]).css('display', 'none');
		}
	});
	$('footer #aboutUs-extended, label[for="aboutUs-extended"]').on('change keyup', function(e){
		let chkd = $('#aboutUs-extended')[0];
		// 32 - Space | 13 - Enter
		if(e.which == 32 || e.which == 13){
			chkd.checked = !chkd.checked;
			$(this).attr('aria-expanded', chkd.checked);
			$(this).attr('aria-label', (chkd.checked ? 'Ocultar' : 'Exibir') + ' itens da seção Institucional');
		}
		if(!chkd.checked){
			$($('.aboutUs-wrapper .aboutUs-guide svg line.cls-2')[0]).css('display', 'block');
		}else{
			$($('.aboutUs-wrapper .aboutUs-guide svg line.cls-2')[0]).css('display', 'none');
		}
	});
});