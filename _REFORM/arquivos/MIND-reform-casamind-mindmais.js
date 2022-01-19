/*
 *	Código por William Di Biasi Bogik
 *
 */
 $(document).ready(function(){
    "use strict";
    var getSellersList = (function = () =>{
        var sellers = {};

        $.ajax({
            accept: "application/vnd.vtex.ds.v10+json",
            contentType: "application/json; charset=utf-8",
            crossDomain: false,
            type: "GET",
            url: "/arquivos/mindmais.json"
        }).done(function(e){
            sellers = $.map(e, function(r){return r.sellers});
            sellers.sort((a,b) => a.name.localeCompare(b.name));
        });
        return sellers;
    });
}