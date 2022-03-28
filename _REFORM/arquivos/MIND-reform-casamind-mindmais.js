/*
 *  Código por William Di Biasi Bogik
 *
 */
 $(document).ready(function(){
    "use strict";
    var globalSellers = {};
    var getSellers = (getSellers = () =>{
    let mindmais = {};

    $.ajax({
        async: true,
        accept: "application/json; charset=utf-8",
        contentType: "application/json; charset=utf-8",
        crossDomain: false,
        type: "GET",
        url: "https://imaginarium.vteximg.com.br/arquivos/mindmais.json.css?v="+ Math.random()
    }).then(function(e){
        let categories = [];

        (typeof(e) != 'object' ? mindmais = JSON.parse(e) : mindmais = e);

        mindmais.orderedSellersBy = $.map(mindmais.sellers, function(r){
            if(r.active){
                return r;
            }
        });
        
        //Dados esperados de order: a-z, z-a, first, last
        if(mindmais.order.toLowerCase() == 'a-z'){
            mindmais.orderedSellersBy.sort((a,b) => a.name.localeCompare(b.name));
        }else if(mindmais.order.toLowerCase() == 'z-a'){
            mindmais.orderedSellersBy.sort((a,b) => a.name.localeCompare(b.name));
            mindmais.orderedSellersBy.reverse();
        }else if(mindmais.order.toLowerCase() == 'last'){
            mindmais.orderedSellersBy.sort((a,b) => Date.parse(b.date + "GMT-0300") - Date.parse(a.date + "GMT-0300"));
        }else{
            mindmais.orderedSellersBy.sort((a,b) => Date.parse(a.date + "GMT-0300") - Date.parse(b.date + "GMT-0300"));
        }

        //Deixa automáticamente uma ordenação alfabetica salva
        mindmais.orderedSellers = $.map(mindmais.sellers, function(r){
            if(r.active){
                return r;
            }
        });
        mindmais.orderedSellers.sort((a,b) => a.name.localeCompare(b.name));

        //Remove espaços para evitar problemas de digitação
        // $.map(mindmais.orderedSellers, function(r){ r.categories = (r.categories).replaceAll(' ', '')});

        mindmais.orderedCategories = $.map(mindmais.categories, function(r){
            if(r.active){
                return r;
            }
        });
        mindmais.orderedCategories.sort((a,b) => a.name.localeCompare(b.name));

        mountBanners(mindmais);
        mountSellers(mindmais);
        mountCategories(mindmais);

        console.log(mindmais)

        globalSellers = mindmais.orderedSellers;
    })})();
    var mountBanners = (mountBanners = (mindmais) =>{
        let bannersSlick = $('main.mindmais > .banners-top .slicker');
        $.each(mindmais.orderedSellersBy, function(i, e){
            bannersSlick.slick('slickAdd', $('<div class="img-container"><img data-id="bannerTop'+ i +'" draggable="false" aria-label="Banner mostrando alguns produtos da marca '+ this.name +'" /></div>'));
            if(i == 0){
                $('.banners-top .img-container > img[data-id=bannerTop'+ i +']').attr('src', (isMobile() ? this.bannerM : this.bannerD)).attr('width', (isMobile() ? '500' : '1920')).attr('height', (isMobile() ? '600' : '600')).attr('title', this.name);
            }else{
                $('.banners-top .img-container > img[data-id=bannerTop'+ i +']').attr('data-lazy', (isMobile() ? this.bannerM : this.bannerD)).attr('width', (isMobile() ? '500' : '1920')).attr('height', (isMobile() ? '600' : '600')).attr('title', this.name);
            }

            return (i == parseInt(mindmais.featured) - 1 ? false : true);
        })
        bannersSlick.slick('refresh');
    });
    var mountSellers = (mountSellers = (mindmais) =>{
        let sellersSlick = $('main.mindmais > .nav-brands .slicker');
        $.each(mindmais.orderedSellersBy, function(i, e){
            sellersSlick.slick('slickAdd', $('<div></div>').addClass('item').attr('data-number', i));
            $('.slick-track').find('div[data-number='+i+']').append('<a href="'+ this.pageLink +'" class="image" aria-label="Ir para a página da marca '+ this.name +'"><img width="385" height="570" draggable="false" /></a>');
            if(i == 0){
                $('.slick-track').find('div[data-number='+i+'] a.image').attr('tabindex', '0');
                $('.slick-track').find('div[data-number='+i+'] a.image img').attr('src', e.navBrands).attr('title', this.name).attr('alt', this.name);
            }else{
                $('.slick-track').find('div[data-number='+i+'] a.image').attr('tabindex', '-1');
                $('.slick-track').find('div[data-number='+i+'] a.image img').attr('data-lazy', e.navBrands).attr('title', this.name);
            }
            $('.slick-track').find('div[data-number='+i+']').append('<a href="'+ this.pageLink +'" class="name uppercase bold text-center d-block" aria-hidden="true"></a>'),
            $('.slick-track').find('div[data-number='+i+'] a.name').text(this.name);
            $('.slick-track').find('div[data-number='+i+']').append('<div class="desc"></div>'),
            $('.slick-track').find('div[data-number='+i+'] div.desc').html((this.pageDescription.length > 140 ? this.pageDescription.substring(0, this.pageDescription.substring(0, 140 + 1).search(/\s+\S*$/)) + ' (...)' : this.pageDescription).replace(/<\/?[^>]+(>|$)/g, ""));
            return (i == parseInt(mindmais.featuredBrands) - 1 ? false : true);
        });
        sellersSlick.slick('slickAdd', $('<div></div>').addClass('item').attr('data-number', 'vermais'));
        $('.slick-track').find('div[data-number=vermais]').append('<a href="javascript:void(0)" class="image seemore" aria-controls="navBrandsExpanded"><img width="270" height="400" draggable="false" /></a>'),
        $('.slick-track').find('div[data-number=vermais] a.image img').attr('src', 'https://lojamindesigns.vteximg.com.br/arquivos/BANNER_VERMAIS__385X570.png').attr('title', 'ver mais').attr('alt', 'ver mais').attr('aria-label', 'Ver mais marcas do MinD+');

        sellersSlick.slick('refresh');
    });
    var mountCategories = (mountCategories = (mindmais) =>{
        let categoriesSlick = $('main.mindmais > .nav-categories .slicker');

        $.each(mindmais.orderedCategories, function(i){
            categoriesSlick.slick('slickAdd', $('<div draggable="false" class="p-2"></div>').addClass('item').attr('category-number', i).attr('filter', (this.name).replaceAll(' ', '')));
            $('.slick-track').find('div[category-number='+i+']').append('<a href="'+ this.pageLink +'" draggable="false" class="image"><img width="250" height="166" draggable="false"/></a>');
            if(i == 0){
                $('.slick-track').find('div[category-number='+i+'] a.image').attr('tabindex', '0');
                $('.slick-track').find('div[category-number='+i+'] a.image img').attr('src', this.image).attr('title', 'Imagem da categoria ' + this.name).attr('alt', 'Imagem da categoria ' + this.name).attr('aria-hidden', true);
            }else{
                $('.slick-track').find('div[category-number='+i+'] a.image').attr('tabindex', '-1');
                $('.slick-track').find('div[category-number='+i+'] a.image img').attr('data-lazy', this.image).attr('title', 'Imagem da categoria ' + this.name).attr('alt', 'Imagem da categoria ' + this.name);
            }
            $('.slick-track').find('div[category-number='+i+'] a.image').append('<span href="'+ this.pageLink +'" draggable="false" class="name uppercase bold text-center d-block"></span>'),
            $('.slick-track').find('div[category-number='+i+'] span.name').text(this.name);
            return (i == parseInt(mindmais.featuredCategories) - 1 ? false : true);
        });
        categoriesSlick.slick('refresh');
    });
    var sellersExpanded = $('body').on('click enter', '#expandBrands, .nav-brands .seemore', function(){
        let brandsExpanded = $('main.mindmais .nav-brands-expanded'),
        alphabeticalList = $('main.mindmais .nav-brands-expanded ul.alphabeticalList'),
        alphabeticalListSelect = $('main.mindmais .nav-brands-expanded select.alphabeticalList'),
        alphabet = [ ...Array(26)].map((_, i) => String.fromCharCode(65 + i)),
        sellersContainer = brandsExpanded.find('.sellersContainer');

        brandsExpanded.slideToggle('slow');
        brandsExpanded.attr('aria-hidden', !JSON.parse(brandsExpanded.attr('aria-hidden')));
        $('.nav-brands > .seemore').text(($('.nav-brands > .seemore').text().toLowerCase() == 'ver mais' ? 'ver menos' : 'ver mais'));
        if(!JSON.parse(brandsExpanded.attr('aria-hidden'))){
            scrollTo(0, $('#navBrandsExpanded').position().top - (isMobile() ? 200 : 300));
        }
        if(alphabeticalList.find('li[filter]:not(li[filter=all])').length == 0){
            $.each(alphabet, function(){
                alphabeticalList.append('<li filter="'+ this +'" disabled>' + this + '</li>');
                alphabeticalListSelect.append('<option filter="'+ this +'" disabled>' + this + '</option>');
            });

            $.each(globalSellers, function(){
                let firstLetter = (this.name[0]).normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                html = '<a href="'+ this.pageLink +'" filterid="'+ firstLetter +'" aria-label="Ir para a página da marca '+ this.name +'"><img data-src="'+ this.navBrands +'" class="lazy" width="124" height="184"/><span class="text-center bold d-block">'+ this.name +'</span></div>';

                if(alphabeticalList.find('li[filter='+ firstLetter +'][disabled]')){
                    $(alphabeticalList.find('li[filter='+ firstLetter +'][disabled]')).attr('disabled', false);
                    $(alphabeticalListSelect.find('option[filter='+ firstLetter +'][disabled]')).attr('disabled', false);
                }
                sellersContainer.append(html);
            })
        }
    });
    var sellersFilteredMobile = $('body').on('change', '#navBrandsExpanded > select', function(){
        showSellers($(this));
    });
    var sellersFilteredDesktop = $('body').on('click', '#navBrandsExpanded > ul > li[filter]:not(li[disabled])', function(){
        showSellers($(this));
    });

    var showSellers = (showSellers = (option) =>{
        let alphabeticalList = $('main.mindmais > .nav-brands-expanded ul.alphabeticalList'),
        brandsExpanded = $('main.mindmais .nav-brands-expanded'),
        sellersContainer = brandsExpanded.find('.sellersContainer'),
        filter = option.find('option:selected').attr('filter') || option.attr('filter');

        alphabeticalList.find('li[class=active]').removeClass('active');
        option.addClass('active');

        $.each(sellersContainer.find('a[filterid]'), function(){
            if($(this).attr('filterid') == filter || filter == 'all'){
                $(this).fadeIn()
            }else{
                $(this).fadeOut();
            }
        })
    })

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
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
        $('main.mindmais .slick-categories-dots').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            arrows: false,
            prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
            nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
            lazyLoad: 'ondemand',
            infinite: true,
            swipeToSlide: true,
            slidesToShow: 2,
            slidesToScroll: 2
        });
        $('main.mindmais .slick-dots-banner').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: false,
            arrows: true,
            prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
            nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
            lazyLoad: 'ondemand',
            infinite: true,
            swipeToSlide: true,
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
            swipeToSlide: true,
            slidesToShow: 4,
            slidesToScroll: 1
        });
       $('main.mindmais .slick-categories-dots').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            arrows: false,
            prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
            nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
            lazyLoad: 'ondemand',
            infinite: true,
            swipeToSlide: true,
            slidesToShow: 4,
            slidesToScroll: 2
        });
       $('main.mindmais .slick-dots-banner').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            arrows: false,
            prevArrow: '<button class="slick-prev" aria-label="Anterior" type="button">Anterior</button>',
            nextArrow: '<button class="slick-next" aria-label="Próximo" type="button">Próximo</button>',
            lazyLoad: 'ondemand',
            infinite: true,
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }
})