/*
 *	Código por William Di Biasi Bogik
 *
 */
(isMobile = () => {
	let isMobile = false; //initiate as false
	//device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){ 
		isMobile = true;
	}
	return isMobile;
});
var formOn = (formOn = (num) => {
	$("#form"+num).fadeIn();
});
var formOff = (formOff = (num) => {
	$("#form"+num).fadeOut();
	//window.location = window.location;
});
$(document).ready(function(){
	"use strict";
	//Addons
	if(typeof(Array.prototype.first) === 'undefined'){
		Object.defineProperty(Array.prototype, 'first', {
			value(){
				return this.find(e => true)     //or this.find(Boolean)
			}
		});
	}
	//Aguarda o determinado elemento carregar
	//Exemplo de uso:
	//waitForElm('.selector').then((elm) =>{
	//});
	function waitForElm(selector){
		return new Promise(resolve =>{
			if(!!$(selector).length){
				return resolve($(selector));
			}

			const observer = new MutationObserver(mutations =>{
				if($(selector)){
					resolve($(selector));
					observer.disconnect();
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		});
	}
	//Atualiza os parametros do url
	function updateQueryString(key, value){
		if(history.pushState){
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
			onError: function(e){
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
	//Menu
	var openMenu = $('.js--open-menu').on('click', function(){
		$(".csm-header .csm-wrapper, .csm-header .csm-navigation, .js--open-menu").toggleClass('change');
		$("body").toggleClass('noscroll');
		//Atributos para Leitores de tela
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
	var hideMenuOnScroll = (hideMenuOnScroll = () =>{
		let top = 0;
		$(window).on("scroll", function(){
			$(window).scrollTop() > top && 1 < $(window).scrollTop() ? ($(".csm-header .csm-wrapper").slideUp(), 
			$(".csm-header .csm-wrapper .csm-middle .csm-center").addClass("scrollMenu"), $(".csm-header .csm-minicart").addClass("scrollMenu"), $(".csm-header .csm-benefits").slideUp(), $(".csm-header #popup-adicionando").removeClass("scrollMenu").addClass("hiddenMenu")) : $(window).scrollTop() === 0 ? ($(".csm-header .csm-benefits").slideDown(), 
			$(".csm-header .csm-wrapper").slideDown(), $(".csm-header .csm-wrapper .csm-middle .csm-center").removeClass("scrollMenu"), $(".csm-header .csm-minicart").removeClass("scrollMenu"), $(".csm-header #popup-adicionando").removeClass("scrollMenu hiddenMenu")) : $(".csm-header .csm-wrapper").slideDown(), 
			($(window).scrollTop() < top && $(window).scrollTop() != 0 && $(".csm-header #popup-adicionando").removeClass("hiddenMenu").addClass("scrollMenu"));
			top = $(window).scrollTop();
		});
	})();
	//Minicart & Products List
	var showCartWhenHoverIcon = $('.csm-header .csm-cart > a').on('hover', function(){
		let t = $(this),
		e = $(".csm-minicart"), 
		i = $(".portal-totalizers-ref .amount-items-em").eq(0).text();
		(768 <= $("body").width()) ? (t.hover(function(t){
			if(parseInt($(".cart-info > .amount-items > em.amount-items-em").first().text()) != 0) return e.addClass("is--active"), false;
		}), e.hover(function(){}, function(){
			e.removeClass("is--active");
		})) : t.click(function(t){
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
		.done(function(orderForm){
			updateMiniCart();
			(qty == 0 && $('.csm-minicart__products > ul > li')[itemIndex].remove());
		});
	});
	//Scripts que serão acionados com base no orderForm
	var checkOrderForm = (checkOrderForm = () =>{
		let minicart = $('.csm-header .csm-middle .csm-center .csm-user > ul > li.csm-cart > a');
		vtexjs.checkout.getOrderForm().done(function(t){
			(t.items.length > 0 && updateMiniCart());
		});
	})();
	var updateMiniCart = (updateMiniCart = () =>{
		let p = $('.csm-header .csm-minicart .csm-minicart__products .product-list'),
		item = $('.csm-header .csm-cart .portal-totalizers-ref > .amount-items-in-cart > .cartInfoWrapper .amount-items em.amount-items-em').first().text(),
		minicartIcon = $('ul > li.csm-cart > a');

		minicartIcon.prepend('Você possui ' + item + ' ' + (item == 1 ? 'item' : 'itens') + ' no Carrinho');
		minicartIcon.attr('aria-label', 'Você possui ' + item + ' ' + (item == 1 ? 'item' : 'itens') + ' no Carrinho');
		minicartIcon.attr('title', 'Você possui ' + item + ' ' + (item == 1 ? 'item' : 'itens') + ' no Carrinho');

		vtexjs.checkout.getOrderForm().done(function(t){
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
			}], null, t).done(function(){
				updateMiniCart();
				$('#popup-adicionando, #barratempo').addClass('is--active'), setTimeout(function(){
					$('#popup-adicionando, #barratempo').removeClass('is--active')
				}, 6200);
			}), false;
		});
	});
	//Coleções / Categorias
	//Abre a seleção de filtros da página de coleção
	var openFilterSelection = $('.orderByList > .filterSelector').on('click', function(){
		let options = $('main.collection > .main-container > .collectionWrapper > .row > .col-auto .orderByList > ul');

		options.toggleClass('is--active');
	});
	var getParamsFromVtexSearch = (() =>{
		let params = [],
		partialUrl = decodeURIComponent(partialSearchUrl);
		partialUrl.slice(1).replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value){
			if(value.includes(':')){
				let fq = value.split(':');
				params[fq[0]] = fq[1];
			}else{
				params[key] = value;
			}
		});
		return params;
	});
	var checkPageType = (checkPageType = () =>{
		let v = ($('.resultItemsWrapper').length > 0 ? $('.resultItemsWrapper') : $('.has-shelf--default')),
			t = $('.breadcrumbs + .page-title.category-title > h1');

		let params = getParamsFromVtexSearch();

		let defaultProductMaxQtd = 48,
			numBusca = $('.resultado-busca-numero > .value').eq(0),
			numAtual = $('ul > li[layout]').length;

		waitForElm('button.seeMoreProducts[data-controls=0]').then((elm) =>{
			if(numBusca.length > 0){
				if(parseInt(numBusca.text()) < defaultProductMaxQtd){
					elm.remove();
				}else if(parseInt(numBusca.text()) <= numAtual){
					elm.text('Não há mais produtos para carregar');
					elm.attr('disabled', true);
				}
			}
		});

		//Atribui um indice de paginação
		(typeof v.data('page') == 'undefined' && v.attr('data-page', 1));

		//Verifica se existe partialSearchUrl e se o container de vitrines para
		//categorias e coleções existe, caso não, assume que é uma página que pode ter
		//vitrines colocadas por placeholder.
		if(typeof partialSearchUrl != 'undefined' && $('.resultItemsWrapper').length > 0){
			//Quantidade de itens para prateleiras unicas na página
			(!v.data('qty') && v.attr('data-qty', $('.has-shelf--default > ul > li[layout]').length));
			//Verifica se existe a variável da vtex que informa informações de categorias
			//ou procura informações sobre a coleção, tentando distinguir entre as duas páginas.
			//Após isso, atribui um indice para paginação e grava a o id referente a vitrine
			if((!!params['H'])){
				v.attr('data-collectionid', params['H']);
				//Adiciona o botão ver mais produtos
				let c = v.find('[id*=ResultItems_]');
				//data-controls definido para zero pois esse tipo de págia possui apenas uma lista/vitrine de produtos
				if(c.find('button.seeMoreProducts[data-controls]').length <= 0){
					c.append(`<button class="button2 btn-brand seeMoreProducts" data-controls="0"><span>Ver mais produtos</span></button>`);
				}
				return 'collection';
			}else if(!!vtxctx && !!vtxctx.categoryId && vtxctx.searchTerm != 'colecoes' && vtxctx.searchTerm != 'mindmais'){
				let categoryId = vtxctx.categoryId;
				if(!!vtxctx.departmentyId && vtxctx.categoryId != vtxctx.departmentyId){
					categoryId = vtxctx.departmentyId + '/' + vtxctx.categoryId;
				}
				v.attr('data-categoryid', categoryId);
				//Adiciona um título para páginas de categoria e remove caracteres numéricos
				//Móveis2 --> Móveis
				t.text(t.text().replace(/\d+/g, '') || vtxctx.categoryName.replace(/\d+/g, ''));
				//Adiciona o botão ver mais produtos
				let c = v.find('[id*=ResultItems_]');
				//data-controls definido para zero pois esse tipo de págia possui apenas uma lista/vitrine de produtos
				if(c.find('button.seeMoreProducts[data-controls]').length <= 0){
					c.append(`<button class="button2 btn-brand seeMoreProducts" data-controls="0"><span>Ver mais produtos</span></button>`);
				}
				return 'category';
			}else if($('.orderBy > select[onchange]').length != 0){
				//Último recurso para identificar informações da coleção
				let h = $('.orderBy > select[onchange]').attr('onchange').split('?PS', 1).toString();
					h = h.split('\'/')[1];
					v.attr('data-collectionid', h.toString());
				return 'undefined';
			}
			//Modelo para vitrines inseridas por meio do controle
		}else if(v.hasClass('has-shelf--default prateleira')){
			$.each(v, function(i){
				if(typeof $(this).data('collectionid') == 'undefined' && $(this).parents('.has-shelf--default').length == 0 && $(this).find('button.seeMoreProducts[data-controls]').length <= 0){
					let vId = parseInt($(this).find('h2').text());
					$(this).append(`<button class="button2 btn-brand seeMoreProducts" data-controls="${i}"><span>Ver mais produtos</span></button>`);
					$(this).attr('data-collectionid', vId);
					$(this).attr('data-num', i);
					$(this).attr('data-qty', $(this).find('ul > li[layout]').length);
				}
			});
			return 'hotsite';
		}
		return false;
	});
	//Retorna uma seleção de vitrines (prateleia) levando em conta os filtros
	//getShelfProducts(index da vitrine, adicionar contéudo no final, antes do botão ver mais?)
	var getShelfProducts = (getShelfProducts = (num = 0, seemore = 0) =>{
		let orderBy = $('.orderByList > ul > li.is--active').attr('data-order');

		let id = (checkPageType() != 'category' ? 'H:' + ($('.resultItemsWrapper').length > 0 ? $('.resultItemsWrapper').data('collectionid') : $('.has-shelf--default').eq(num).data('collectionid')) : 'C:' + $('.resultItemsWrapper').data('categoryid'));
		let page = ($('.resultItemsWrapper').length > 0 ? $('.resultItemsWrapper').attr('data-page') : $('.has-shelf--default').attr('data-page'));
		let shelfTemplate = $('.has-shelf--default').eq(num).find('ul > li[layout]').first().attr('layout');
		let productQtd = ($('.resultItemsWrapper').length > 0 ? $('.resultItemsWrapper').attr('data-qty') : $('.has-shelf--default').attr('data-qty'));
		let selectFilter = (typeof orderBy != 'undefined' ? orderBy : 'O=');
		let aditionalFilters = '';
		let container = ($('.resultItemsWrapper > [id*=ResultItems_]').length > 0 ? $('.resultItemsWrapper > [id*=ResultItems_]') : $('.has-shelf--default').eq(num));

		let urlBusca = `/buscapagina?fq=${id}&PS=${productQtd}&${selectFilter}&sl=${shelfTemplate}&cc=${productQtd}&sm=0&PageNumber=${page}`;

		$.ajax({
			crossDomain: false,
			type: 'GET',
			url: urlBusca,
			success: function(data){
				if(!data){
					$(`button.seeMoreProducts[data-controls=${num}]`).text('Não há mais produtos para carregar');
					$(`button.seeMoreProducts[data-controls=${num}]`).attr('disabled', true);
				}else{
					if(container.find('button.seeMoreProducts').length > 0 && seemore == 1){
						container.find('button.seeMoreProducts').before(data);
					}else{
						container.html(data);
						//Adiciona elementos necessários
						checkPageType();
					}
				}
			}
		})
	});
	//Alterna entre os filtros clicados
	var changeShelfFilter = $('.orderByList > ul > li').on('click', function(e){
		e.preventDefault();
		//Remove qualquer filtro ativo
		$('.orderByList > ul > li').removeClass('is--active')
		//Aplica o novo filtro
		$(this).addClass('is--active');
		//Altera o url com o parâmetro do filtro selecionado
		updateQueryString('O', $(this).data('order').split('O=')[1]);

		getShelfProducts();
	});
	//Carrega mais produtos (botão ver mais produtos)
	var seeMoreProducts = $('.has-shelf--default').on('click', 'button.seeMoreProducts[data-controls]', function(){
		let num = $(this).data('controls');
		let v = ($('.resultItemsWrapper').length > 0 ? $('.resultItemsWrapper') : $('.has-shelf--default').eq(num));

		v.attr('data-page', parseInt(v.attr('data-page')) + 1);

		getShelfProducts(num, 1);
	});
	//Troca de página nas vitrines (opção paged)
	var changeShelfPage = $('.resultItemsWrapper > .pager > ul.pages').on('click', 'li:not(.pgEmpty, .pgCurrent)', function(){
		let v = $('.resultItemsWrapper'),
			li = $('.resultItemsWrapper > .pager > ul.pages > li'),
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
	//Aplica o filtro automaticamente quando carregar a página
	//É utilizado também para fazer a primeira chamada a checkPageType
	//e configurar a maioria das vitrines
	var getFilterFromParms = (function(){
		let searchParams = new URLSearchParams(window.location.search),
			orderFilter = searchParams.get('O'),
			resultsWrap = ($('.resultItemsWrapper > [id*=ResultItems_]').length > 0 ? $('.resultItemsWrapper > [id*=ResultItems_]') : $('.has-shelf--default'));

			if(orderFilter != undefined){
				$('.orderByList > ul > li[data-order*='+ orderFilter +']').addClass('is--active');
			}
			if(checkPageType() != 'category' && checkPageType() != 'hotsite' && resultsWrap.length != 0){
				getShelfProducts();
			}
	})();
	//Restrito a páginas de produto apenas
	if($('main .csm-product').length != 0){
		//Tratamentos para quando é exibida mensagem de produto indisponível
		var productNotAvailable = waitForElm('fieldset.sku-notifyme-form.notifyme-form').then((elm) =>{
			let wrapper = $('.product-data > .product__info'),
				container = wrapper.find('.buttonsContainer'),
				buybutton = container.find('.buy-button.buy-button-ref');

			if(!!elm.length && elm.is(':visible') && !buybutton.is(':visible')){
				elm.find('#notifymeClientName').attr('aria-label', 'Digite seu nome para ser avisado da disponibilidade deste produto!');
				elm.find('#notifymeClientEmail').attr('aria-label', 'Digite seu email para ser avisado da disponibilidade deste produto!');
				elm.find('#notifymeButtonOK').attr('aria-label', 'Enviar formulário');

				container.find('div.product-buy').addClass('unavailable');

				wrapper.find('.sales-condition').remove();
				container.find('.product-quantity-add').remove();
				container.find('#addToBagPDP').remove();
				container.find('#addLista').remove();
			}
		});
		var selectvariableSKU = $('main .csm-product .product-sku-selection').on('change', function(){
			let bwrapper = $('main .csm-product div.product-buy'),
			pwrapper = $('main .csm-product .product__info .product-price'),
			item = $(this).find(':selected'),
			buttonsContainer = $('.product-data > .product__info .buttonsContainer');

			if(item.attr('sku-id') == 'none'){
				buttonsContainer.slideUp();
				pwrapper.slideUp();

				$(".available-alert").eq(0).html('<p>Selecione um produto!</p>');
			}else{
				buttonsContainer.slideDown();
				pwrapper.slideDown();

				bwrapper.find('a.buy-button.buy-button-ref').get(0).href = item.attr('cart-ref');

				if(!!pwrapper.find('.descricao-preco > em.valor-por').length){
					pwrapper.find('.descricao-preco > em.valor-por strong.skuBestPrice').text(`R$ ${parseFloat(item.attr('sku-price')).toFixed(2).replace(/\./, ",")}`);

					pwrapper.find('.descricao-preco > em.valor-dividido strong.skuBestInstallmentNumber').text(`${item.attr('sku-installments-amount')}x`);
					pwrapper.find('.descricao-preco > em.valor-dividido strong.skuBestInstallmentValue').text(`R$ ${parseInt(item.attr('sku-installments-price')).toFixed(2).replace(/\./, ",")}`);
				}else{
					pwrapper
					.append('<div class="descricao-preco"></div>')
					.find('div.descricao-preco')
					.append('<em class="valor-por price-best-price"></em>')
					.append('<em class="valor-dividido price-installments"></em>')


					pwrapper.find('.descricao-preco > em.valor-por')
					.html(`Por: <strong class="skuBestPrice">R$ ${parseFloat(item.attr('sku-price')).toFixed(2).replace(/\./, ",")}</strong>`);

					pwrapper.find('.descricao-preco > em.valor-dividido')
					.html(`ou <strong class="skuBestInstallmentNumber">${item.attr('sku-installments-amount')}x</strong> de 
							<strong class="skuBestInstallmentValue">R$ ${item.attr('sku-installments-price')}</strong>`);
				}
				if(parseInt(item.attr('sku-qty')) <= 5){
					$(".available-alert").eq(0).html(`<p>Corre que só tem <strong>${item.attr('sku-qty')}</strong> unidades disponíveis!</p>`);
					$(".available-alert").eq(0).fadeIn();
				}else{
					$(".available-alert").eq(0).fadeOut();
				}

				if(item.data('sku-images').length > 0){
					let sku_image = item.data('sku-images').first(),
						imageExpanded = $('.zoomPad > #image-main');
					//Coleta o id da imagem para substituição
					let ids = sku_image.imageUrl.match(/ids\/\d+/g);
					//Troca da imagem para uma com especificação de tamanho
					let image = sku_image.imageUrl.replace(/ids\/\d+/g, ids.toString() + '-0-750');
					//Troca a imagem de exibição para a do item selecionado
					imageExpanded.attr('src', image);
				}
			}
		});
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
							let [first, ...rest] = this.name.split('+'),
							second = (rest.join('+') == '' ? null : rest.join('+'));
							//remove espaços desnecessários
							first = $.trim(first);
							second = $.trim(second);
							variations[x] = {'var' : {first, second}}
						});
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
						if(!!variations[i].var.second){
							if((i > 0 ? variations[i].var.first != variations[i-1].var.first : false ||
							 i == 0) && f.find('optgroup[label="'+ variations[i].var.first +'"]').length < 1){
								f.append('<optgroup label="'+ variations[i].var.first +'">');
								
							}

							f.find('optgroup[label="'+ variations[i].var.first +'"]').eq(0).append('<option class="sku-item" sku-id="'+ this.itemId +'" id="'+ this.itemId +'" sku-price="'+ this.sellers.first().commertialOffer.Price +'" sku-installments-price="'+ prices.Value +'" sku-installments-amount="'+ prices.NumberOfInstallments +'" sku-qty="'+ this.sellers.first().commertialOffer.AvailableQuantity +'" cart-ref="'+ this.sellers.first().addToCartLink +'" '+ (avaliable <= 0 ? 'disabled' : '') + prevAvaliable +'>'+variations[i].var.second+'</option>');
							$('#' + this.itemId).data('sku-images', this.images);

							if(((i > 0 ? true : false) && 
								(i < Object.keys(variations).length - 1 && i > 0 ? variations[i].var.first != variations[i+1].var.first : '') || 
								i == Object.keys(variations).length - 1) && f.find('optgroup[label="'+ variations[i].var.first +'"]').length < 1){
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
		var changeQtyBuyButton = $('.product-quantity-add > a[role="button"]').on('click', function(){
			let input = $(this).parent().find('input[type="number"]');
			
			$(this).hasClass('plus') && input.get(0).stepUp() ||
			$(this).hasClass('minus') && input.val() > 1 && input.get(0).stepDown();
		});
		var addtoBagPDP = $('button.addtoCartButton.icon').on('click', function(){
			let buybutton = $('a.buy-button.buy-button-ref').attr('href');
			var params = {};
			buybutton.replace(/[?&]+([^=&]+)=([^&]*)/gi,
				function(str, key, value){
					params[key] = value;
				});
			return vtexjs.checkout.addToCart([{
				id: params['sku'],
				quantity: params['qty'],
				seller: params['seller']
			}], null, params['sc']).done(function(){
				updateMiniCart();
				$('#popup-adicionando, #barratempo').addClass('is--active'), setTimeout(function(){
					$('#popup-adicionando, #barratempo').removeClass('is--active')
				}, 6200);
			}), false;
		});
		//O slick vertical é quebrado quando usado, 
		//criar outra instancia do slick para o mobile
		//pois não é possível desativa-lo pelo responsive
		if(isMobile()){
			$('#show > ul.thumbs').slick({
				autoplay: false,
				dots: false,
				arrows: true,
				prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
				nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
				lazyLoad: 'ondemand',
				infinite: false,
				accessibility: true,
				focusOnChange: true,
				swipeToSlide: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				vertical: false,
				verticalSwiping: false,
				centerMode: false
			});
		}else{
			$('#show > ul.thumbs').slick({
				autoplay: false,
				dots: false,
				arrows: true,
				prevArrow: '<button class="slick-prev vertical" aria-label="Anterior" type="button">Anterior</button>',
				nextArrow: '<button class="slick-next vertical" aria-label="Próximo" type="button">Próximo</button>',
				lazyLoad: 'ondemand',
				infinite: false,
				accessibility: true,
				focusOnChange: true,
				swipeToSlide: true,
				slidesToShow: 5,
				slidesToScroll: 1,
				vertical: true,
				verticalSwiping: true,
				centerMode: true,
				responsive: [
				{
					breakpoint: 900,
					settings: {
						prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
						nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}]
			});
		}
		var availableAlert = (function(){
			try{
				let t = skuJson.productId;
				$.ajax({
					url: "/api/catalog_system/pub/products/search/?fq=productId:" + t,
					method: "GET",
					timeout: 0,
					headers: {
						"Content-Type": "application/json"
					}
				}).done(function(t){
					let e = t[0].items[0].sellers[0].commertialOffer.AvailableQuantity, 
					b = t[0].brand;
					0 < e && e <= 5 && $(".available-alert").html('<p>Corre que só tem <strong>' + e + "</strong> unidades disponíveis!</p>"), 
					$(".productBySeller").html('<p>Produzido e entregue por: <strong>' + b + "</strong></p>");
				});
			}catch(e){
				console.log(e);
			}
		})();
		//Troca a imagem do produto por outra de tamanho maior
		//É possivel trocar a dimensão no CMS > Configurações > Tipos de Arquivo,
		//mas afeta todos os sites
		var changeProductImage = (changeProductImage = () =>{
			$("ul.thumbs img").each(function(){
				if(!isMobile()){
					$(this).closest('a').attr("rel", 
					$(this).closest('a').attr("rel").replace(/\-(\d+)-(\d+)\//g, "-0-750/"));
					$(this).attr("src", $(this).attr("src").replace(/\-(\d+)-(\d+)\//g, "-0-130/"));
				}else{
					$(this).closest('a').attr("rel", 
					$(this).closest('a').attr("rel").replace(/\-(\d+)-(\d+)\//g, "-400-0/"));
					$(this).attr("src", $(this).attr("src").replace(/\-(\d+)-(\d+)\//g, "-400-0/"));
				}
			});
		})();
		var changeProductImageExpanded = waitForElm('.zoomPad > img#image-main').then((elm) =>{
			elm.attr("src", elm.attr("src").replace(/\-(\d+)-(\d+)\//g, "-0-750/"));
		});
		var realidadeAl = (function(){
			let t = navigator.userAgent || navigator.vendor || window.opera, 
			e = $(".value-field.3D-ios").text(), 
			i = $(".value-field.3D-android").text(), 
			s = $(".value-field.3D-desktop").text();

			//Arruma a estilização visto que alguns elementos serão/estão ocultos
			$.each($('.group.Informacao-Adicional tr').find('th:visible'), function(i){
				if(i % 2 == 0){
					$(this).parents('tr').addClass('even')
				}else{
					$(this).parents('tr').removeClass('even')
				}
			});

			if(s != "" && !isMobile()){
				//Removido por hora para entender se será utilizado
				//$("#botaoDesktop").attr("href", s);
				//$("#botaoDesktop").closest("span").show();
				return false;
			}else if(i != "" && /android/i.test(t)){
				$("#botaoAndroid").attr("href", i);
				$("#botaoAndroid").closest("span").show();
			}else if(e != "" && !window.MSStream && /iPad|iPhone|iPod/.test(t)){
				$("#botaoiOS").attr("href", e);
				$("#botaoiOS").closest("span").show();
			}else if(isMobile() && i == ''){
				$("#botaoAndroid").attr("href", 'javascript:undefined');
				$("#botaoAndroid").attr("disabled", true);
				$("#botaoAndroid").parents('.arButton.icon').attr("disabled", true);
				$("#botaoAndroid").find('.text').text("Visualização em realidade aumentada não disponível para esse produto");
				$("#botaoAndroid").parents('.arButton.icon').attr("title", "Visualização em realidade aumentada não disponível para esse produto");
				$("#botaoAndroid").closest("span").show();
			}else if(isMobile()){
				$("#botaoAndroid").attr("href", i);
				$("#botaoAndroid").closest("span").show();
			}else{
				return false;
			}

			$("#csm-realidadeAumentada").show()
		})();
		var pdfDowlond = (function(){
			let t = $(".value-field.pdf-dowload").text();

			if(t != ""){
				$(".csm-dowload-pdf").show();
				$("#csm-pdf-to-download").attr("href", t);
			}else{
				$(".csm-dowload-pdf").remove();
			}
		})();
		var videoOnPDP = (async () => {
			const response = await fetch(`/api/catalog_system/pub/products/search/?fq=productId:${skuJson.productId}`);
			const [productInfo] = await response.json();
			const video = productInfo.items.first().Videos;

			let container = $('.csm-product-video');

			if(!video.first()) return;

			container.addClass('is--active');

			$.each(video, function(i, e){
				let autoplay = (i == 0 ? 1 : 0);
				container.append(`
					<iframe width="560" height="315" src="https://www.youtube.com/embed/${e}?&mute=1&autoplay=${autoplay}&rel=0&loop=1&controls=0&modestbranding=1" 
						title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				`);
			});

			$('.csm-product-video.is--active').slick({
				autoplay: false,
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
		})();
	}
	//Newsletter
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
			success: function(e){
				$("#formFC").html("<p class='highlight'>E-mail cadastrado com sucesso!</p><small>Você receberá um cupom de desconto em seu e-mail.</small>"), 
				setTimeout(function(){
					//t("#newsletter-pop").removeClass("slide");
				}, 5e3), sessionStorage.setItem("mindNewsletter", true);
			},
			error: function(t){}
		})
	});
	var verifyNewsletterOnSession = (verifyNewsletterOnSession = () =>{
		if(sessionStorage.getItem("mindNewsletter") === 'true'){
			$("#formFC").html("<p class='highlight'>E-mail cadastrado com sucesso!</p><small>Você receberá um cupom de desconto em seu e-mail.</small>")
		}
	})();
	//Account
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
	//NeoAssist 
	var neoAssist = (function(){
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
	//Footer
	$('footer #support-extended, label[for="support-extended"]').on('change keyup', function(e){
		let chkd = $('#support-extended')[0];
		//32 - Space | 13 - Enter
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
		//32 - Space | 13 - Enter
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