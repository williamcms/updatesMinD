/*
 *	Código por William Di Biasi Bogik
 *
 */
 $(document).ready(function(){
    "use strict";
    var getSellers = (getSellers = () =>{
        var mindmais = {};

        $.ajax({
            async: true,
            accept: "application/json; charset=utf-8",
            contentType: "application/json; charset=utf-8",
            crossDomain: false,
            type: "GET",
            url: "https://lojamindesigns.vteximg.com.br/arquivos/mindmais.json.css?v=1.2.1"
        }).then(function(e){
            mindmais = JSON.parse(e);
            mindmais.orderedSellers = $.map(mindmais.sellers, function(r){return r});
            mindmais.orderedSellers.sort((a,b) => a.name.localeCompare(b.name));
            mountBanners(mindmais);
            mountSellers(mindmais);

            console.log(mindmais);
        });
    })();
    var mountBanners = (mountBanners = (mindmais) =>{
        var bannersSlick = $('main.mindmais > .banners-top .slicker');
        $.each(mindmais.orderedSellers, function(i, e){
            bannersSlick.slick('slickAdd', $('<img />').attr('src', e.bannerD).attr('title', e.name));
            return (i == parseInt(mindmais.featured) - 1 ? false : true);
        })
    });
    var mountSellers = (mountSellers = (mindmais) =>{
        var sellersSlick = $('main.mindmais > .nav-brands .slicker');
        $.each(mindmais.orderedSellers, function(i, e){
            sellersSlick.slick('slickAdd', $('<div></div>').addClass('item').attr('data-number', i));
            $('.slick-track').find('div[data-number='+i+']').append('<div class="image"><img /></div>'),
            $('.slick-track').find('div[data-number='+i+'] div.image img').attr('src', e.logo).attr('title', e.name),
            $('.slick-track').find('div[data-number='+i+']').append('<div class="name uppercase bold"></div>'),
            $('.slick-track').find('div[data-number='+i+'] div.name').text(e.name),
            $('.slick-track').find('div[data-number='+i+']').append('<div class="desc"></div>'),
            $('.slick-track').find('div[data-number='+i+'] div.desc').html(e.pageDescription.length > 150 ? e.pageDescription.substring(0, e.pageDescription.substring(0, 150 + 1).search(/\s+\S*$/)) + ' (...)' : e.pageDescription);
        })
        sellersSlick.slick('slickAdd', $('<div><a href="#">Ver Mais</a></div>').addClass('item').attr('data-number', 'last'));
    });
    if(isMobile()){
        $('main.mindmais .slick-dots').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            arrows: false,
            prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
            nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
            lazyLoad: 'ondemand',
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        }); 
    }else{
       $('main.mindmais .slick-dots').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            arrows: false,
            prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
            nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
            lazyLoad: 'ondemand',
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 2
        }); 
    }
    

})