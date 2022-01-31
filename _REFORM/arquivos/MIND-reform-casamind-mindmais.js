/*
 *  Código por William Di Biasi Bogik
 *
 */
 $(document).ready(function(){
    "use strict";
    var globalSellers = {};
    var getSellers = (getSellers = () =>{
        var mindmais = {};

        $.ajax({
            async: true,
            accept: "application/json; charset=utf-8",
            contentType: "application/json; charset=utf-8",
            crossDomain: false,
            type: "GET",
            url: "./arquivos/mindmais.json.css?v=1.3.2"
        }).then(function(e){
            let categories = [];
            mindmais = JSON.parse(e);
            mindmais.orderedSellers = $.map(mindmais.sellers, function(r){return r});
            mindmais.orderedSellers.sort((a,b) => a.name.localeCompare(b.name));

            mindmais.orderedCategories = $.map(mindmais.categories, function(r){return r});
            mindmais.orderedCategories.sort((a,b) => a.name.localeCompare(b.name));

            console.log(mindmais)

            mountBanners(mindmais);
            mountSellers(mindmais);
            mountCategories(mindmais);

            globalSellers = mindmais.orderedSellers;
        });
    })();
    var mountBanners = (mountBanners = (mindmais) =>{
        var bannersSlick = $('main.mindmais > .banners-top .slicker');
        bannersSlick.slick('slickAdd', $('<img  draggable="false" />').attr('src', (isMobile() ? 'https://lojamindesigns.vteximg.com.br/arquivos/mind_mais-top_mobile.png' : 'https://lojamindesigns.vteximg.com.br/arquivos/mind_mais-top_desktop.png')).attr('title', 'MinD+ Marcas que são extensões da nossa marca'));
        $.each(mindmais.orderedSellers, function(i, e){
            bannersSlick.slick('slickAdd', $('<img  draggable="false" />').attr('src', (isMobile() ? e.bannerM : e.bannerD)).attr('title', e.name));
            return (i == parseInt(mindmais.featured) - 1 ? false : true);
        })
    });
    var mountSellers = (mountSellers = (mindmais) =>{
        var sellersSlick = $('main.mindmais > .nav-brands .slicker');
        $.each(mindmais.orderedSellers, function(i, e){
            sellersSlick.slick('slickAdd', $('<div></div>').addClass('item').attr('data-number', i));
            $('.slick-track').find('div[data-number='+i+']').append('<div class="image"><img width="270" height="400" draggable="false" /></div>'),
            $('.slick-track').find('div[data-number='+i+'] div.image img').attr('src', e.navBrands).attr('title', e.name).attr('alt', e.name),
            $('.slick-track').find('div[data-number='+i+']').append('<div class="name uppercase bold text-center"></div>'),
            $('.slick-track').find('div[data-number='+i+'] div.name').text(e.name);
            $('.slick-track').find('div[data-number='+i+']').append('<div class="desc"></div>'),
            $('.slick-track').find('div[data-number='+i+'] div.desc').html((e.pageDescription.length > 150 ? e.pageDescription.substring(0, e.pageDescription.substring(0, 150 + 1).search(/\s+\S*$/)) + ' (...)' : e.pageDescription).replace(/<\/?[^>]+(>|$)/g, ""));
            return (i == parseInt(mindmais.featuredBrands) - 1 ? false : true);
        })
        if(isMobile()){
            sellersSlick.slick('slickAdd', $('<div><a href="javascript:void(0);" id="expandBrands"><img src="https://lojamindesigns.vteximg.com.br/arquivos/mindmais_ver_mais_teste.png" title="Ver mais" alt="Ver mais" /></a></div>').addClass('item').attr('data-number', 'last'));  
        }
    });
    var mountCategories = (mountCategories = (mindmais) =>{
        var categoriesSlick = $('main.mindmais > .nav-categories .slicker');

        $.each(mindmais.orderedCategories, function(i){
            categoriesSlick.slick('slickAdd', $('<div draggable="false"></div>').addClass('item').attr('category-number', i));
            $('.slick-track').find('div[category-number='+i+']').append('<div class="image"><img width="250" height="166" draggable="false" /></div>'),
            $('.slick-track').find('div[category-number='+i+'] div.image img').attr('src', this.image).attr('title', this.name).attr('alt', this.name),
            $('.slick-track').find('div[category-number='+i+']').append('<div class="name uppercase bold text-center"></div>'),
            $('.slick-track').find('div[category-number='+i+'] div.name').text(this.name);
        })
    });
    var sellersExpanded = $('body').on('click', '#expandBrands, .nav-brands > span.seemore', function(){
        var brandsExpanded = $('main.mindmais .nav-brands-expanded'),
        alphabeticalList = $('main.mindmais .nav-brands-expanded ul.alphabeticalList'),
        alphabeticalListSelect = $('main.mindmais .nav-brands-expanded select.alphabeticalList'),
        alphabet = [ ...Array(26)].map((_, i) => String.fromCharCode(65 + i)),
        sellersContainer = brandsExpanded.find('.sellersContainer');

        brandsExpanded.slideToggle('slow');
        if(alphabeticalList.find('li[filter]:not(li[filter=all])').length == 0){
            $.each(alphabet, function(){
                alphabeticalList.append('<li filter="'+ this +'" disabled>' + this + '</li>');
                alphabeticalListSelect.append('<option filter="'+ this +'" disabled>' + this + '</option>');
            });

            $.each(globalSellers, function(){
                let firstLetter = (this.name[0]).normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                html = '<div filterid="'+ firstLetter +'"><img src="'+ this.logo +'"/><p class="text-center bold">'+ this.name +'</p></div>';

                if(alphabeticalList.find('li[filter='+ firstLetter +'][disabled]')){
                    $(alphabeticalList.find('li[filter='+ firstLetter +'][disabled]')).attr('disabled', false)
                    $(alphabeticalListSelect.find('option[filter='+ firstLetter +'][disabled]')).attr('disabled', false)
                }
                sellersContainer.append(html);
            })
        }
    });
    var categoriesExpanded = $('body').on('click', 'div.nav-categories span.seemore, div.nav-categories div.item', function(){
        console.log(this);
        var brandsExpanded = $('main.mindmais .nav-categories-expanded'),
        sellersContainer = brandsExpanded.find('.sellersContainer');
        if($(this).hasClass('item')){
            brandsExpanded.slideDown('slow');
        }else{
            brandsExpanded.slideToggle('slow');
        }

        $.each(globalSellers, function(){
            let html = '<div categories="'+ this.categories +'"><img src="'+ this.logo +'"/><p class="text-center bold">'+ this.name +'</p></div>';

            sellersContainer.append(html);
        })
    });
    var sellersFilteredMobile = $('body').on('change', '#navBrandsExpanded > select', function(){
        showSellers($(this));
    });
    var sellersFilteredDesktop = $('body').on('click', '#navBrandsExpanded > ul > li[filter]:not(li[disabled])', function(){
        showSellers($(this));
    });
    var categoriesFiltered = $('body').on('click', 'div.nav-categories div.item', function(){
        console.log($(this));
    });

    var showSellers = (showSellers = (option) =>{
        var alphabeticalList = $('main.mindmais .nav-brands-expanded ul.alphabeticalList'),
        brandsExpanded = $('main.mindmais .nav-brands-expanded'),
        sellersContainer = brandsExpanded.find('.sellersContainer'),
        filter = option.find('option:selected').attr('filter') || option.attr('filter');

        alphabeticalList.find('li[class=active]').removeClass('active');
        option.addClass('active');

        $.each(sellersContainer.find('div[filterid]'), function(){
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
            slidesToShow: 1,
            slidesToScroll: 1
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
       $('main.mindmais .slick-dots-banner').slick({
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
    }
    

})