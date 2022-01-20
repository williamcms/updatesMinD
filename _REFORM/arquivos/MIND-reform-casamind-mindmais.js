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
            url: "https://lojamindesigns.vteximg.com.br/arquivos/mindmais.json.css?v=1"
        }).then(function(e){
            mindmais = JSON.parse(e);
            mindmais.orderedSellers = $.map(mindmais.sellers, function(r){return r});
            mindmais.orderedSellers.sort((a,b) => a.name.localeCompare(b.name));
            mountSellers(mindmais);
        });
    })();
    var mountSellers = (mountSellers = (mindmais) =>{
    	console.log(mindmais);
    	var sellersSlick = $('main.mindmais .slick-carousel-dots');
    	$.each(mindmais.orderedSellers, function(i, e){
    		sellersSlick.slick('slickAdd', $('<img />').attr('src', e.bannerD).attr('title', e.name));
    	})
    })

})