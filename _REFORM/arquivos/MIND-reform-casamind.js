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
		$(".csm-header .csm-navigation").fadeToggle();
		$(this).toggleClass("change");

	});
	var showDropDownMenu = $('.csm-has-sub').on('click', function(){
		$($(this).find('.csm-dropdown')).toggleClass("change");

	});
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
	
	/* Footer */
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