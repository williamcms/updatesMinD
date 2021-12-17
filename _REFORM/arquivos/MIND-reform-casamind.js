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