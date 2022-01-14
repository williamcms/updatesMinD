$(document).ready(function(){
	"use strict";
	//Addons
	Object.defineProperty(Array.prototype, 'first', {
	  value() {
	    return this.find(e => true)     // or this.find(Boolean)
	  }
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
	// Menu
	var openMenu = $('.js--open-menu').on('click', function(){
		$(".csm-header .csm-wrapper, .csm-header .csm-navigation, .js--open-menu").toggleClass('change');
		// Atributos para Leitores de tela
		$x = $(this).hasClass('change');
		$(".csm-header .csm-middle .csm-center .csm-mobile button.js--open-menu").attr('aria-expanded', $x);
	});
	var showDropDownMenu = $('.csm-has-sub').on('click', function(){
		$($(this).find('.csm-dropdown')).toggleClass("change");

	});
	var hideMenuOnScroll = (hideMenuOnScroll = () => {
        var top = 0;
        $(window).on("scroll", function() {
            $(window).scrollTop() > top && 1 < $(window).scrollTop() ? ($(".csm-header .csm-wrapper").slideUp(), 
            $(".csm-header .csm-wrapper .csm-middle .csm-center").addClass("scrollMenu"), $(".csm-header .csm-minicart").addClass("scrollMenu"), $(".csm-header .csm-benefits").slideUp()) : $(window).scrollTop() === 0 ? ($(".csm-header .csm-benefits").slideDown(), 
            $(".csm-header .csm-wrapper").slideDown(), $(".csm-header .csm-wrapper .csm-middle .csm-center").removeClass("scrollMenu"), $(".csm-header .csm-minicart").removeClass("scrollMenu")) : $(".csm-header .csm-wrapper").slideDown();
            top = $(window).scrollTop();
        });
    })();
    // Minicart & Products List
	var showCartWhenHoverIcon = $(".csm-header .csm-cart > a").hover(function(){
		var t = $(this),
		e = $(".csm-minicart"), 
        i = $(".portal-totalizers-ref .amount-items-em").eq(0).text();
        (768 <= $("body").width()) ? (t.hover(function(t) {
            if($(".csm-minicart__products li").length) return e.addClass("is--active"), false;
        }), e.hover(function() {}, function() {
            e.removeClass("is--active");
        })) : t.click(function(t) {
            if ($(".csm-minicart__products li").length) return e.toggleClass("is--active"), false;
        });
	});
	var vtexUpdateItem = (vtexUpdateItem = (itemIndex, qty) =>{
		vtexjs.checkout.getOrderForm()
		.then(function(orderForm) {
	    	var item = orderForm.items[itemIndex];
	    	var updateItem = {
	    		index: itemIndex,
	    		quantity: qty
	    	};
	    return vtexjs.checkout.updateItems([updateItem], null, false);
	  	})
	  	.done(function(orderForm) {
			// console.log(orderForm);
			updateMiniCart(index);
	  	});
	});
	var getOrderForm = (getOrderForm = () =>{
		var e = this;
        vtexjs.checkout.getOrderForm().done(function(t) {
            e.orderForm = t;
        });
        return e;
	})();
	var getMiniCart = (getMiniCart = () =>{
		var e = getOrderForm();
	    return e["orderForm"];
	});
	var updateMiniCart = (updateMiniCart = (e) =>{

	})
	var mounMiniCart = (mounMiniCart = () =>{
		var e = getMiniCart(),
		d = $('.csm-header .csm-minicart .csm-minicart__products .product-list'),
		c = 'R$ ';
		(e.items).forEach(function(item, i){
			let priceAsCurrency = c + (item.price / 100).toFixed(2).toString().replace(/\./, ",");
			let html = '<li class="item-list" sku="'+ item.productId +'"><div class="product-wrapper"><div class="product__image" sku="'+ item.productId +'"><img src="'+ (item.imageUrl).replace("-350-303", "-400-600") +'" alt="'+ (item.name) +'"></div><div class="product__info-container"><div class="product__name">'+ (item.name) +'</div><div class="product__info"><div class="product__price">'+ (priceAsCurrency) +'</div><div class="product__management"><a ndx="'+ i +'" class="_remove">-</a> <input type="number" value="'+ (item.quantity) +'" maxlength="2" ndx="'+ i +'" class="_qty" sku="'+ item.productId +'"> <a ndx="'+ i +'" class="_add">+</a></div></div></div><div class="remove"><a class="_removecsm" sku="'+ item.productId +'" ndx="'+ i +'">X</a></div></div></li>';
			d.append(html)
		})
	});
	var minicartAddQtd = $('.csm-header .csm-minicart a[ndx]_add').on('click', function(e){
		let index = $(this).attr("ndx"), qty = parseInt($('.csm-header .csm-minicart .product-list input[ndx='+index+']')[0].value);
		vtexUpdateItem(index, ++qty);
	});
	var minicartRmvQtd = $('.csm-header .csm-minicart a[ndx]_remove').on('click', function(e){
		let index = $(this).attr("ndx"), qty = parseInt($('.csm-header .csm-minicart .product-list input[ndx='+index+']')[0].value);
		vtexUpdateItem(index, --qty);
	});
	var addtoBag = $('.js--shelf-buy').on('click', function(e){
		e.preventDefault(), e.stopPropagation();
		var sku = $(this).parents('.csm-shelf__product').data('sku'),
		p = getSkuData(sku),
		t = document.cookie.split('; VTEXSC=').pop().split(';').shift().split('src=')[1];
		//Define uma espera para que a função da vtex retorne os dados 
        //antes da execução abaixo e a demora não cause erro no produto
		setTimeout(() => {
			return vtexjs.checkout.addToCart([{
				id: p.id,
				quantity: 1,
				seller: p.DefaultSellerId
			}], null, t).done(function(t){
				$('#popup-adicionando, #barratempo').addClass('is--active'), setTimeout(function(){
					$('#popup-adicionando, #barratempo').removeClass('is--active')
				}, 6200);
			}), false
		}, 500);
	});
	var variableSKU = (variableSKU = () =>{
		var arr = $('main .csm-product #___rc-p-sku-ids').get(0).value.split(','),
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
				$.each(e.first().items, function(i){
					let avaliable = this.sellers.first().commertialOffer.AvailableQuantity,
					def = prevAvaliable = (i == 0 && avaliable > 0 ? ' selected' : (i > 0 && avaliable > 0 && prevAvaliable == null ? ' selected' : '')),
					variations = {};
					$.each(e.first().items.sort(), function(x){
					    let [first, ...rest] = this.name.split(' '),
					    second = (rest.join(' ') == '' ? null : rest.join(' '));
					    variations[x] = {'var' : {first, second}}
					})

					if(variations[i].var.second != null){
						if(i > 0 ? variations[i].var.first != variations[i-1].var.first : false || i == 0){
							f.append('<optgroup label="'+ variations[i].var.first +'">');
							
						}

						f.find('optgroup[label='+ variations[i].var.first +']').eq(0).append('<option class="sku-item" sku-id="'+ this.itemId +'" sku-price="'+ this.sellers.first().commertialOffer.price +'" sku-qty="'+ this.sellers.first().commertialOffer.AvailableQuantity +'" sku-images="'+ jQuery.map(this.images, function(n, i){ return n.imageUrl; }) +'" cart-ref="'+ this.sellers.first().addToCartLink +'" '+ (avaliable <= 0 ? 'disabled' : '') + def +'>'+variations[i].var.second+'</option>');

						if((i > 0 ? true : false) && 
							(i < Object.keys(variations).length - 1 && i > 0 ? variations[i].var.first != variations[i+1].var.first : '') || 
							i == Object.keys(variations).length - 1){
							f.append('</optgroup>');
							
						}
					}else{
						f.append('<option class="sku-item" sku-id="'+ this.itemId +'" sku-price="'+ this.sellers.first().commertialOffer.price +'" sku-qty="'+ this.sellers.first().commertialOffer.AvailableQuantity +'" sku-images="'+ jQuery.map(this.images, function(n, i){ return n.imageUrl; }) +'" cart-ref="'+ this.sellers.first().addToCartLink +'" '+ (avaliable <= 0 ? 'disabled' : '') + def +'>'+variations[i].var.first+'</option>');
					}
					if(i == e.first().items.length - 1){
						f.prepend('<option '+def+'>Nenhum selecionado</option>');
					}
				});
				if(bExists.length != 0){
					bExists.get(0).href = e.first().items.first().sellers.first().addToCartLink;
				}else{
					bwrapper.html('<a target="_top" class="buy-button buy-button-ref" href="'+ e.first().items.first().sellers.first().addToCartLink +'" style="display:block">Comprar</a>')
				}
			});
		}
	})();
	var selectvariableSKU = $('main .csm-product .product-sku-selection button.sku-item:not(button[disabled])').on('click', function(){
		var bwrapper = $('main .csm-product div.product-buy'),
		bExists = $('main .csm-product div.product-buy a.buy-button.buy-button-ref');
		if(bExists.length != 0){
			bExists.get(0).href = $(this).attr('cart-ref');
		}else{
			bwrapper.html('<a target="_top" class="buy-button buy-button-ref" href="'+ $(this).attr('cart-ref') +'" style="display:block">Comprar</a>')
		}
	});
		var availableAlert = (function() {
		try{
			var t = skuJson.productId;
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
	            $(".productedBySeller").html('<p>Produzido e entregue por: <strong>' + b + "</strong></p>");
	        });
		}catch(e){
			console.log(e);
		}
    })();
    var realidadeAl = (function() {
        var t = navigator.userAgent || navigator.vendor || window.opera, 
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
        var t = $(".value-field.pdf-dowload").text();
        "" != t && ($(".csm-dowload-pdf").show(), $("#csm-pdf-to-download").attr("href", t));
    })();
	// Newsletter
	var isEmailValid = (isEmailValid = (t) =>{
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t);
    });
	var verifyNewsletter = $('#sendFCEmail').on('click', function(e){
		var i = $("#fcEmail").val();
		return isEmailValid(i) ? sendNewsletterEmail(e) : $("#fcEmail").css("border", "1px solid #D00D0D"), 
		$("footer .news-footer .message").html('Preencha o campo abaixo com um e-mail válido'), 
		$("footer .news-footer .message").effect( "shake" ), false;
	});
	var sendNewsletterEmail = (sendNewsletterEmail = (e) =>{
		var i = {};
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
		'use strict';
	    var s = {};
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
		    }else{
		    	s.logged = false;
		    	s['user'] = null;
		        s['userId'] = null;
		        s['userType'] = null;
		    }
	    });
	    return s;
	});
	// Login Dropdown
	var changeLoginDropDown = (changeLoginDropDown = () =>{
		var i = $('.js--logged-in'),
		o = $('.js--logged-out'),
		s = getLoginStatus(),
		j = $('.js--user-name');

		return (s["logged"] == true ? (i.show() && o.hide() && j.text('Olá, Minder!')) : (o.show() && i.hide() && j.text('Entre ou Cadastre-se')));
	})();
    // Troca a imagem do produto por outra de tamanho maior
	// É possivel trocar a dimensão no CMS > Configurações > Tipos de Arquivo,
	// mas afeta todos os sites
	(changeProductImage = () =>{
		$("#botaoZoom img").each(function() {
	    	$(this).attr("src", $(this).attr("src").replace("-350-303", "-400-600"));
		});
	});

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
 	// Footer
	$('footer.newfooter #support-extended').change(function(){
		if(!$('#support-extended')[0].checked){
			$($('.support-wrapper .support-guide svg line.cls-2')[0]).css('display', 'block');
		}else{
			$($('.support-wrapper .support-guide svg line.cls-2')[0]).css('display', 'none');
		}
	});
	$('footer.newfooter #aboutUs-extended').change(function(){
		if(!$('#aboutUs-extended')[0].checked){
			$($('.aboutUs-wrapper .aboutUs-guide svg line.cls-2')[0]).css('display', 'block');
		}else{
			$($('.aboutUs-wrapper .aboutUs-guide svg line.cls-2')[0]).css('display', 'none');
		}
	});
});