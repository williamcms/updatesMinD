$(document).ready(function(){
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
	var ocultaFiltroRepetido = (function(){
		var n = $('.main-container .col-left #boxFiltros .navigation-tabs .menu-departamento .search-single-navigator ul.Função li a'),
		seen = null;
		$.each(n, function(i, r){
		    if($(this).attr('title') === seen){
		        $(this).hide();
		    }else{
		        seen = $(this).attr('title');
		    }
		})
	})();
});