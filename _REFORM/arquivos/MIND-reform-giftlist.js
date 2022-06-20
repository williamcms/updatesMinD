$(document).ready(function(){
	// Funções da Giftlist da vtex
	// Obtem uma giftlist com base nas informações fornecidas
	var giftList;

	giftList = {
		GiftListId: $("input#gid").val() || $('.action-buy > a').length > 0 && $('.action-buy > a').attr('id').replace('sendtocart-', '') || '0',
		ImageTypeId: $("input#iid").val() || '3',
		ShowPopup: $("input#spu").val() || 'false',
		UrlOrder: $("input#uor").val() != undefined && encodeURIComponent($("input#uor").val()) || false,
		PageSize: $("input#pgs").val() || 10,
		getSkuListFromGiftList: function getSkuListFromGiftList(giftListId, imageTypeId, pageSize, showPopup, callback){
			var url = `/no-cache/giftlistv2/getskulist/${giftListId}/${imageTypeId}/${pageSize}/${showPopup}`;
			$.getJSON(url, function(data){
				if((typeof callback === 'function') && (typeof data != 'undefined')){
					callback(data);
				}
			});
		},
		// Altera a quantidade de itens desejados
		changeWishedQty: function changeWishedQty(giftListId, skuId, newAmount, callback) {
			var url = `/no-cache/giftlistv2/changewishedamount/${giftListId}/${skuId}/${newAmount}`;
			$.post(url, function(data){
				if((typeof callback === 'function') && (typeof data != 'undefined')){
					callback(data);
				}
			});
		},
		// Obtem a lista de pessoas que contribuiram com a lista
		showOrdersFromItem: function showOrdersFromItem(giftListId, skuId, hideclosebtn = false, callback) {
			var url = `/no-cache/giftlistv2/getskuorderinfo/${giftListId}/${skuId}/${hideclosebtn}`;
			$.post(url, function(data){
				if(data != ''){
					if(typeof callback === 'function'){
						callback(data)
					}
				}else{
					console.log('showOrdersFromItem: Sua requisição não retornou resultados!');
				}
			});
		},
		// Obtem as estatisticas da lista
		getListStatistics: function getListStatistics(giftListId, imageTypeId, urlOrder, callback){
			var url = `/no-cache/giftlistv2/getstatistics/${giftListId}/${imageTypeId}/${urlOrder}`;
			$.ajax({
				type: 'POST',
				url: url,
				data: '',
				success: function(data){
					if(data != '') {
						if(typeof callback === 'function'){
							callback(data);
						}
					}else{
						console.log('getListStatistics: Sua requisição não retornou resultados!');
					}
				}
			});
		}
	}
	// Função para algumas otimizações, 
	// como indicador de campo númerico para mobile
	var optimizations = (() =>{
		let giftlisteventdate = $('#giftlisteventdate')
			actionShare = $('.glmanager-actions > .action-share');

		giftlisteventdate.prop('inputmode', 'numeric');

		if(!!actionShare){
			$.each(actionShare, function(){
				$(this).find('a').text('Compartilhar')
			})
		}
	})();
	//Altera o tamanho das imagens para se encaixar melhor e não ter faixas brancas
	var changeProductImageOnGiftList = (changeProductImage = () =>{
		$(".collectionItems img").each(function(){
			console.log('1');
			$(this).attr("src", $(this).attr("src").replace(/\-(\d+)-(\d+)\//g, "-500-0/"));
		});
	})();
	var changeImageSizesAfterPageChange = $(document).on('click', '.ko-grid-pageLinks > a', function(){
		setTimeout(function(){
			console.log('2');
			$(".collectionItems img").each(function(){
				$(this).attr("src", $(this).attr("src").replace(/\-(\d+)-(\d+)\//g, "-500-0/"));
			});
			document.querySelector('.main-container').scrollIntoView({
				behavior: 'smooth'
			});
		}, 800);
	});
	var changeProductTextOnGiftList = (changeProductImage = () =>{
		$(".buyButton a.btn-add-buy-button-asynchronous").each(function(){
			let pName = $(this).parents('.shelf__product--bottom').find('h3 > a').text();
			$(this).text('Presentear');
			$(this).attr("aria-label", `Presentear ${pName}`);
		});
	})();
	var selectCheckbox = $(document).on('click', '.giftlistproductsv2 tr > td.checkuncheck', function(e){
		let input = $(this).find('input[type="checkbox"].checkuncheckthis');

		input.attr('checked', !input.is(':checked'));
	});
	// Função para preencher alguns campos com base no CEP
	var getaddressfromapi = $('body').on('blur', '.address-form-new #ship-postal-code', function(evt) {
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
	var autogeneratename = $('#giftlistform input, #giftlistform select').on('keypress keyup change blur', function(){
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
	var hidefieldsfromform = $("#giftlisttype").on('change', function(){
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
	// Botões de adicionar/remover quantidade
	var changeqtybuttons = $('.shelf__product > .shelf__product--bottom .amount a[role="button"]').on('click', function(){
		let input = $(this).parent().find('input.insert-sku-quantity');
			
		$(this).hasClass('plus') && input.val(parseInt(input.val()) + 1) ||
		$(this).hasClass('minus') && input.val() > 1 && input.val(parseInt(input.val()) - 1);
	});
	// Botão Selecionar todos
	var selectallproducts = waitForElm($('.collectionWrapper .collection > .giftlist-insertsku-wrapper input[type="checkbox"]')).then((elm)=>{
		let button = $('.orderByList > ul > li #selectallproducts');

		button.attr("for", elm.attr("id"));
	});
	var checkuncheckall = waitForElm($('table.giftlistproductsv2 > thead > tr > th > input[type="checkbox"]')).then((elm)=>{
		let button = $('.orderByList > ul > li #selectallproducts');

		elm.attr('id', 'checkuncheckall');

		button.attr("for", elm.attr("id"));
	});
	// Botão incluir selecionados na lista
	var addselectedproducts = $('.orderByList > ul.optionsList > li a#addselectedproducts').on('click', function(){
		let button = $('.giftlist-insertsku-wrapper .giftlist-insertsku-popup a');

		if(button.length < 1){
			createAlert(
				'btn-red', 
				'Erro!', 
				'Você precisa realizar o login para utilizar essa opção.', 
				{text: 'Login', link: `/login?ReturnUrl=${window.location.pathname}`, class: 'btn-red'}, 
				3000
			)
			return 0;
		}
		button.click();
	});
	// Botão presentear selecionados
	var giftselected = $('.orderByList > ul.optionsList > li a#giftselected').on('click', function(){
		let selected = $('.collectionItems .shelf__product .checkboxOnly input[type="checkbox"][checked="checked"]').parents('.shelf__product').find('a.btn-add-buy-button-asynchronous');
		let checkout = '/checkout/cart/add?';
		let href = $.map(selected, function(val, i){
			let url = decodeURIComponent($(val).attr('href'));
			url.slice(1).replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value){
				checkout += str.replace('?', '&')
			});
		});

		if(selected.length < 1){
			createAlert(
				'btn-red', 
				'Erro!', 
				'Você precisa selecionar pelo menos um item para utilizar essa opção', 
				{}, 
				3000
			)
			return 0;
		}

		$.ajax({
			type: 'POST',
			url: checkout,
			success: function(){
				$('#popup-adicionando, #barratempo').addClass('is--active'), $(document).trigger('updateMiniCart'), 
				setTimeout(function(){
					$('#popup-adicionando, #barratempo').removeClass('is--active');
				}, 6200);
			},
			error: function(){
				alert('Um erro ocorreu, tente novamente em alguns momentos!');
			}
		});
	});
	// Botão Compartilhar lista
	var sharethislist = $('.orderByList > ul.optionsList > li a#sharethislist').on('click', function(){
		$('#btnReferAFriend').click();
	});
	// Botão remover selecionados
	var removeselecteditems = $('.orderByList > ul.optionsList > li a#removeselecteditems').on('click', function(){
		$('#giftlistremovecheckedskus').click();
	});
});