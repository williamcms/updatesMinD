$(document).ready(function(){
	// Função para algumas otimizações, 
	// como indicador de campo númerico para mobile
	(() =>{
		let giftlisteventdate = $('#giftlisteventdate');

		giftlisteventdate.prop('inputmode', 'numeric');
	})();
	// Função para preencher alguns campos com base no CEP
	$('body').on('blur', '.address-form-new #ship-postal-code', function(evt) {
		let cep = $(this).val();

		$.ajax({
			type: "GET",
			url: "//api.postmon.com.br/v1/cep/" + cep,
			success: function(address){
				let _bairro = address.bairro,
					_cidade = address.cidade,
					_endereco = address.logradouro,
					_estado = address.estado;
				// Adiciona os dados adquiridos por meio da api
				$("#ship-neighborhood").val(_bairro),
				$("#ship-city").val(_cidade),
				$("#ship-street").val(_endereco),
				$("#ship-state-alternate").val(_estado);
				// Encadeia um evento para ativar a verificação de preenchimento da vtex
				$("#ship-neighborhood").trigger('keyup'),
				$("#ship-city").trigger('keyup'),
				$("#ship-street").trigger('keyup'),
				$("#ship-state-alternate").trigger('keyup');
				// Remove qualquer valor selecionado e aplica o novo
				$('#ship-state').find('option').prop('selected', false);
				$('#ship-state').find(`option[value="${_estado}"]`).prop('selected', true);
				// Remove indicador de erro
				$('#ship-postal-code').removeClass('error')
			},
			error: function(){
				// Adiciona indicador de erro
				$('#ship-postal-code').addClass('error');
			}
		})
	});
	// Função para gerar automáticamente um valor para o endereço de compartilhamento da lista
	$('#giftlistform input, #giftlistform select').on('keypress keyup change blur', function(){
		let giftlisttype = $('#giftlisttype').find(':selected').text(),
			giftlistname = $('#giftlistname').val(),
			giftlisturl = $('#giftlisturl-site'),
			creationdate = Date.now();

		creationdate = String(creationdate).substr(0, 4);

		let str = giftlisttype + giftlistname + creationdate;
		// Remove acentuações e espaços
		let url = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			url = str.replace(/\s/g, '').toLowerCase();

		$('#giftlisturl').val(url);

		if(!!giftlisturl.attr('data-url')){
			giftlisturl.text(giftlisturl.attr('data-url') + url);
		}else{
			giftlisturl.attr('data-url', giftlisturl.text());
			giftlisturl.text(giftlisturl.attr('data-url') + url);
		}
	});
	// Função para ocultar um ou mais campos com base na lista
	$("#giftlisttype").on('change', function(){
		// 20 - guideshop / 6 - lista de presentes / ...etc.
		let skipCity = ['20', '6'],
			selectedOption = $(this).find(':selected').val();

		let giftlisteventcity = $('.giftlisteventlocation, .giftlisteventcity');

		// Verifica se o valor se encontra na array acima
		// -1 representa falso, qualquer outro número é a posição
		if($.inArray(selectedOption, skipCity) >= 0){
			giftlisteventcity.slideUp();
		}else{
			giftlisteventcity.slideDown();
		}
	});
})