$(document).ready(function(){
	$("body").on("blur", ".address-form-new #ship-postal-code", function(event) {
		var _element = $(this)
		, _cep = _element.val();
		$.ajax({
			type: "GET",
			url: "//api.postmon.com.br/v1/cep/" + _cep,
			success: function(_address) {
				var _bairro = _address.bairro,
					_cidade = _address.cidade,
					_endereco = _address.logradouro,
					_estado = _address.estado;
					
				$(".address-form-new #ship-neighborhood").val(_bairro),
				$(".address-form-new #ship-city").val(_cidade),
				$(".address-form-new #ship-street").val(_endereco),
				$(".address-form-new #ship-state-alternate").val(_estado)
			}
		})
	});
	$('#giftlistform input, #giftlistform select').on('keydown change', function(){
		let giftlisttype = $('#giftlisttype').find(':selected').text(),
			giftlistname = $('#giftlistname').val(),
			creationdate = Date.now();

		let str = giftlisttype + giftlistname + creationdate;
		// Remove acentuações e espaços
		let url = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			url = str.replace(/\s/g, '');

		$('#giftlisturl').val(url);
		$('#giftlisturl').trigger('change');
	});
	$("#giftlisttype").on('change', function(){
		var _el = $(this);
		console.log(_el.find(':selected').val())
		if(_el.find(':selected').val() == 20){
			$('.giftlisteventlocation, .giftlisteventcity').hide()
		}else{
			$('.giftlisteventlocation, .giftlisteventcity').show()
		}
	});
})