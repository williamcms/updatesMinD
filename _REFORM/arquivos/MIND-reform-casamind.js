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
	var openMenu = $('.js--open-menu').on('click', function(){
		$(".csm-header .csm-wrapper, .csm-header .csm-navigation, .js--open-menu").toggleClass('change');
		// Atributos para Leitores de tela
		$x = $(this).hasClass('change');
		$(".csm-header .csm-middle .csm-center .csm-mobile button.js--open-menu").attr('aria-expanded', $x);
	});
	var showDropDownMenu = $('.csm-has-sub').on('click', function(){
		$($(this).find('.csm-dropdown')).toggleClass("change");

	});
	(hideMenuOnScroll = () => {
        var top = 0;
        $(window).on("scroll", function() {
            $(window).scrollTop() > top && 1 < $(window).scrollTop() ? ($(".csm-header .csm-wrapper").slideUp(), 
            $(".csm-header .csm-wrapper .csm-middle .csm-center").addClass("scrollMenu"), $(".csm-header .csm-benefits").slideUp()) : $(window).scrollTop() === 0 ? ($(".csm-header .csm-benefits").slideDown(), 
            $(".csm-header .csm-wrapper").slideDown(), $(".csm-header .csm-wrapper .csm-middle .csm-center").removeClass("scrollMenu")) : $(".csm-header .csm-wrapper").slideDown();
            top = $(window).scrollTop();
        });
    })();
	var showCartWhenHoverIcon = $(".csm-header .csm-cart >a").hover(function(){
		var t = $(this),
		e = $(".csm-minicart"), 
        i = $(".portal-totalizers-ref .amount-items-em").eq(0).text();
        $(".js--minicart-close__amount").text(i), 
        $(".js--minicart-count").text(i), 768 <= $("body").width() ? (t.hover(function(t) {
            if($(".csm-minicart__products li").length) return e.addClass("is--active"), false;
        }), e.hover(function() {}, function() {
            e.removeClass("is--active");
        })) : t.click(function(t) {
            if ($(".csm-minicart__products li").length) return e.toggleClass("is--active"), false;
        });
	});
	(isEmailValid = (t) =>{
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t);
    });
	var verifyNewsletter = $('#sendFCEmail').on('click', function(e){
		var i = $("#fcEmail").val();
		return isEmailValid(i) ? sendNewsletterEmail(e) : $("#fcEmail").css("border", "1px solid #D00D0D"), 
		$("footer .news-footer .message").html('Preencha o campo abaixo com um e-mail válido'), 
		$("footer .news-footer .message").effect( "shake" ), false;
	});
	(sendNewsletterEmail = (e) =>{
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
	(verifyNewsletterOnSession = () =>{
		if(sessionStorage.getItem("mindNewsletter") === 'true'){
			$("#formFC").html("<p class='highlight'>E-mail cadastrado com sucesso!</p><small>Você receberá um cupom de desconto em seu e-mail.</small>")
		}
	})();
	var addtoBag = $('.js--shelf-buy').on('click', function(e){
		var sku = $(this).parents('.csm-shelf__product').data('sku'),
		t = document.cookie.split('; VTEXSC=').pop().split(';').shift().split('src=')[1]
		return vtexjs.checkout.addToCart([{
			id: sku,
			quantity: 1,
			seller: '1'
		}], null, t).done(function(t){
			$('#popup-adicionando, #barratempo').addClass('is--active'), setTimeout(function(){
				$('#popup-adicionando, #barratempo').removeClass('is--active')
			}, 6200);
		}), false;
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

//	minicartMain: function() {
//		function e(t) {
//          var c = jQuery.extend({
//              container: ".csm-minicart__products",
//              items: ".amount-items",
//              list: ".product-list",
//              price_label: "R$ ",
//              total_price_currency: "",
//              total_price_container: "",
//              total_price_label: "",
//              cart_conclude: null,
//              remove_btn: !1,
//              finish_order_btn: ".finish-order-btn",
//              finish_order_btn_link: "/Site/Carrinho.aspx",
//              finish_order_btn_text: "Finalizar compra",
//              empty_cart_message: "Carrinho vazio",
//              items_text: [ "nenhum item", "", "" ],
//              hover: ".tpl-cart",
//              callback: null,
//              cart_empty_cb: null,
//              quantity: !0,
//              total_price_class: ".csm-sub",
//              total_price_label_class: ".total-priccsm-label",
//              dropdown: !0,
//              show_images: !0
//          }, t), p = {
//              checkoutURL: "/api/checkout/pub/orderForm/",
//              temp: null,
//              total_itens: 0,
//              total: "0,00",
//              empty_cart: null,
//              itens: 0,
//              data: null,
//              init: function(t) {
//                  p.get.cart.update(t);
//              },
//              checkoutUpdateURL: function() {
//                  return p.checkoutURL + p.orderFormId + "/items/update/";
//              },
//              get: {
//                  cart: {
//                      update: function(t) {
//                          var e = {
//                              expectedOrderFormSections: [ "items", "paymentData", "totalizers" ]
//                          }, t = t ? ($.extend(e, t), p.checkoutUpdateURL()) : p.checkoutURL;
//                          $.ajax({
//                              url: t,
//                              data: JSON.stringify(e),
//                              dataType: "json",
//                              contentType: "application/json; charset=utf-8",
//                              type: "POST",
//                              success: function(t) {
//                                  p.total_itens = t.items.length, $(".menu-entrar .item .qty").text(t.items.length), 
//                                  0 < p.total_itens ? (p.orderFormId = t.orderFormId, p.data = t.items, p.set.cart.items(), 
//                                  p.total = _.intAsCurrency(t.value), $(".menu-entrar .valor .vl").text(_.intAsCurrency(t.value)), 
//                                  p.set.cart.total(), c.dropdown && p.mount.cart.dropdown()) : p.set.cart.empty(), 
//                                  i(p.total_itens);
//                              }
//                          });
//                      },
//                      text: function() {
//                          var t = c.items_text.length - 1, e = c.items_text.length - 1 == 2 ? 1 : 0, i = void 0 === c.items_text[t] ? "" : " ", o = void 0 === c.items_text[e] ? "" : " ";
//                          return 1 < parseInt(p.total_itens) ? p.total_itens + i + c.items_text[t] : 0 == p.total_itens ? c.items_text[0] : p.total_itens + o + c.items_text[e];
//                      }
//                  }
//              },
//              mount: {
//                  cart: {
//                      dropdown: function() {
//                          var t, e = 0, i = c.list.split(".")[1] || "", o = jQuery("<ul/>").addClass(i);
//                          for (t in p.data) {
//                              if ("function" == typeof p.data[t]) break;
//                              var s = p.data[t].productId, n = jQuery("<li>").addClass("row").addClass("row-" + e).attr("sku", s), r = jQuery("<div>").addClass("col").addClass("col-0"), a = jQuery("<div>").addClass("_qc-img").addClass("_qc-img-" + e).attr("sku", s), l = jQuery("<div>").addClass("_qc-product").addClass("_qc-product-" + e);
//                              jQuery(l).text(p.data[t].name), jQuery(r).append(a.html('<img src="' + p.data[t].imageUrl.replace("55-55", "300-300") + '" />')), 
//                              c.show_images && jQuery(r).append(l);
//                              var d = jQuery("<div>").addClass("col").addClass("col-1"), a = p.data[t].quantity, l = jQuery('<input type="text" value="' + a + '" maxlength="2" />').attr("ndx", e).addClass("_qty").addClass("_qty-" + e).attr("sku", s), a = jQuery("<a>", {
//                                  ndx: e
//                              }).addClass("_add").addClass("_add-" + e).text("+"), s = jQuery("<a>", {
//                                  ndx: e
//                              }).addClass("_remove").addClass("_removcsm-" + e).text("-");
//                              jQuery(d).append(s).append(l).append(a);
//                              s = (p.data[t].sellingPrice / 100).toFixed(2).toString().replace(/\./, ","), l = c.price_label + s, 
//                              a = jQuery("<div>").addClass("col").addClass("col-2").html(l), s = p.data[t].id, 
//                              l = jQuery("<a>").addClass("removcsm-link").addClass("removcsm-link-" + e).attr({
//                                  sku: s,
//                                  index: e
//                              }).html("X"), s = jQuery("<div>").addClass("col").addClass("col-3");
//                              jQuery(s).append(l), jQuery(n).append(r).append(d).append(a).append(s), jQuery(o).append(n), 
//                              e++;
//                          }
//                          jQuery(c.container).html(o), p.set.events(), p.set.cart.conclusion(), p.set.cart.active(), 
//                          c.show_images;
//                      }
//                  }
//              },
//              set: {
//                  cart: {
//                      items: function() {
//                          var t = p.get.cart.text();
//                          jQuery(c.items).html(t);
//                      },
//                      total: function() {
//                          var t = c.total_price_currency + p.total;
//                          jQuery(c.total_price_container).html(t);
//                      },
//                      empty: function() {
//                          jQuery(c.hover).unbind().removeClass("active").addClass("empty");
//                          var t = p.get.cart.text();
//                          p.set.cart.items(t), 0 < jQuery(c.container).length && jQuery(c.container).html(""), 
//                          "function" == typeof c.cart_empty_cb && c.cart_empty_cb();
//                      },
//                      conclusion: function() {
//                          var t = jQuery("<div/>").addClass("cart_conclude");
//                          0 < jQuery(c.cart_conclude).length && (t = jQuery(c.cart_conclude));
//                          var e = c.finish_order_btn.substring(1) || "", e = jQuery("<a/>").addClass(e).attr("href", c.finish_order_btn_link).html(c.finish_order_btn_text);
//                          jQuery(t).append(e);
//                          e = c.total_price_currency + p.total;
//                          $('<div class="csm-finish"><div class="csm-total"><div class="csm-valorTotal">' + e + '</div><div class="csm-actions"><div class="csm-tocart"><a href="/checkout/#/cart">Finalizar compra</a></div></div></div></div>').appendTo("#quickCartDropdown");
//                      },
//                      active: function() {
//                          jQuery(c.hover).removeClass("empty").addClass("available"), "function" == typeof c.callback && c.callback();
//                      }
//                  },
//                  events: function() {
//                      jQuery(c.hover).hover(function() {
//                          jQuery(this).addClass("active");
//                      }, function() {
//                          jQuery(c.hover).removeClass("active");
//                      }), jQuery(c.container).find(".removcsm-link").click(function() {
//                          var t;
//                          t = $(this).attr("index"), p.init({
//                              orderItems: [ {
//                                  index: t,
//                                  quantity: 0
//                              } ]
//                          });
//                      }), jQuery(c.container).find('._qty:not(".keydown_binding")').addClass("keydown_binding").keydown(function(t) {
//                          t = t.charCode || t.keyCode || 0;
//                          return 8 == t || 9 == t || 46 == t || 37 <= t && t <= 40 || 48 <= t && t <= 57 || 96 <= t && t <= 105;
//                      }), jQuery(c.container).find('._add:not(".active")').addClass("active").click(function() {
//                          _ndx = jQuery(this).attr("ndx"), _val = parseInt(jQuery("._qty-" + _ndx).val()), 
//                          _val = 99 <= _val ? 99 : _val + 1, jQuery("._qty-" + _ndx).val(_val).change();
//                      }), jQuery(c.container).find('._remove:not(".active")').addClass("active").click(function() {
//                          _ndx = jQuery(this).attr("ndx"), _val = parseInt(jQuery("._qty-" + _ndx).val()), 
//                          _val = _val <= 1 ? 1 : _val - 1, jQuery("._qty-" + _ndx).val(_val).change();
//                      }), jQuery(c.container).find('._qty:not(".active")').addClass("active").keyup(function() {
//                          jQuery(this).val() < 1 ? jQuery(this).val(1) : 99 < jQuery(this).val() && jQuery(this).val(99);
//                      }).change(function() {
//                          var t, e;
//                          t = jQuery(this).attr("ndx"), e = jQuery(this).val(), jQuery(c.container).find("._qty,._add,._remove").removeClass("active").removeClass("keydown_binding"), 
//                          jQuery(c.container).find("._qty").attr("readonly", !0), p.init({
//                              orderItems: [ {
//                                  index: t,
//                                  quantity: e
//                              } ]
//                          });
//                      });
//                  }
//              },
//              refresh: function() {
//                  p.init();
//              }
//          };
//          return p.init(), {
//              refresh: p.refresh
//          };
//      }
//      function i(t) {
//          0 < t ? ($(".csm-group-cart").addClass("csm-active"), $(".amount-items-em").addClass("amount-items-action")) : $(".csm-group-cart").removeClass("csm-active");
//      }
//      jQuery.vtex_quick_cart = function(t) {
//          return new e(t);
//      }, jQuery.vtex_quick_cart({
//          items_text: [ '<em class="amount-items-em">0</em>', "", "" ],
//          callback: function() {
//              vtexjs.checkout.getOrderForm().done(function(t) {
//                  i(t.items[0].quantity);
//              });
//          }
//      });
//  }
	// Troca a imagem do produto por outra de tamanho maior
	(changeProductImage = () =>{
		$("#botaoZoom img").each(function() {
	    	$(this).attr("src", $(this).attr("src").replace("-350-303", "-400-600"));
		});
	})
	(getOrderFrom = () =>{
		var e = this;
        vtexjs.checkout.getOrderForm().done(function(t) {
            e.orderForm = t;
        });
	})
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