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
            console.log(mindmais);
        });
    });
})