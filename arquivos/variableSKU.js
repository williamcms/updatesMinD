$(document).ready(function() {
	//Implementa função para arrays que pega o primeiro resultado disponivel do indice
	Object.defineProperty(Array.prototype, 'first', {
	  value() {
			return this.find(e => true);
		}
	});
	var variableSKU = (variableSKU = () =>{
		var arr = $('main .csm-product #___rc-p-sku-ids').get(0).value.split(','),
		pid = $('main .csm-product #___rc-p-id').get(0).value,
		f = $('main .csm-product .product-sku-selection').eq(0),
		prevAvaliable = null,
		bwrapper = $('main .csm-product div.product-buy'),
		bExists = $('main .csm-product div.product-buy a.buy-button.buy-button-ref');
		if(arr.length > 1){
			$.ajax({
				accept: "application/vnd.vtex.ds.v10+json",
				contentType: 'application/json; charset=utf-8',
				crossDomain: false,
				type: 'GET',
				url: '/api/catalog_system/pub/products/search/?fq=productId:' + pid
			}).done(function(e){
				//Exibe o select
				f.slideDown()
				
				$.each(e.first().items, function(i){
					let avaliable = this.sellers.first().commertialOffer.AvailableQuantity,
					variations = {},
					prices = {
						'NumberOfInstallments' : null,
						'Value' : null
					};
					//Verifica qual o primeiro produto que possui unidades disponíveis
					prevAvaliable = (i == 0 && avaliable > 0 ? ' selected' : (i > 0 && avaliable > 0 && prevAvaliable == null ? ' selected' : ''));
					//Coleta o nome das variações para criar o select
					$.each(e.first().items.sort(), function(x){
						let [first, ...rest] = this.name.split(' '),
						second = (rest.join(' ') == '' ? null : rest.join(' '));
						variations[x] = {'var' : {first, second}}
					})
					//Coleta a melhor forma de pagamento parcelado
					$.each(this.sellers.first().commertialOffer.Installments, function(x){
						if((this.Value < prices.Value || prices.Value == null) && (this.NumberOfInstallments > prices.NumberOfInstallments || prices.NumberOfInstallments == null)){
							prices = {
								'NumberOfInstallments' : this.NumberOfInstallments,
								'Value' : this.Value
							}
						}
					})
					//Caso sejam nomes compostos por duas palavras, divide-os em grupos
					//Ex: Carvalho Rosa, Carvalho Branco
					if(variations[i].var.second != null){
						if((i > 0 ? variations[i].var.first != variations[i-1].var.first : false ||
						 i == 0) && f.find('optgroup[label='+ variations[i].var.first +']').length < 1){
							f.append('<optgroup label="'+ variations[i].var.first +'">');
							
						}

						f.find('optgroup[label='+ variations[i].var.first +']').eq(0).append('<option class="sku-item" sku-id="'+ this.itemId +'" id="'+ this.itemId +'" sku-price="'+ this.sellers.first().commertialOffer.Price +'" sku-installments-price="'+ prices.Value +'" sku-installments-amount="'+ prices.NumberOfInstallments +'" sku-qty="'+ this.sellers.first().commertialOffer.AvailableQuantity +'" cart-ref="'+ this.sellers.first().addToCartLink +'" '+ (avaliable <= 0 ? 'disabled' : '') + prevAvaliable +'>'+variations[i].var.second+'</option>');
						$('#' + this.itemId).data('sku-images', this.images);

						if(((i > 0 ? true : false) && 
							(i < Object.keys(variations).length - 1 && i > 0 ? variations[i].var.first != variations[i+1].var.first : '') || 
							i == Object.keys(variations).length - 1) && f.find('optgroup[label='+ variations[i].var.first +']').length < 1){
							f.append('</optgroup>');	
						}
						//Caso sejam nomes simples
						//Ex: P, M, GG, Preto, Rosa
					}else{
						f.append('<option class="sku-item" sku-id="'+ this.itemId +'" id="'+ this.itemId +'" sku-price="'+ this.sellers.first().commertialOffer.Price +'" sku-installments-price="'+ prices.Value +'" sku-installments-amount="'+ prices.NumberOfInstallments +'" sku-qty="'+ this.sellers.first().commertialOffer.AvailableQuantity +'" cart-ref="'+ this.sellers.first().addToCartLink +'" '+ (avaliable <= 0 ? 'disabled' : '') + prevAvaliable +'>'+variations[i].var.first+'</option>');
						$('#' + this.itemId).data('sku-images', this.images);
					}
					if(i == e.first().items.length - 1){
						f.prepend('<option '+ prevAvaliable +' sku-id="none">Nenhum selecionado</option>');
					}
				});
				if(bExists.length != 0){
					bExists.get(0).href = e.first().items.first().sellers.first().addToCartLink;
				}else{
					bwrapper.html('<a target="_top" class="buy-button buy-button-ref" href="'+ e.first().items.first().sellers.first().addToCartLink +'" style="display:block">Comprar</a>')
				}
				f.trigger('change');
			});
		}
	})();
	var selectvariableSKU = $('main .csm-product .product-sku-selection').on('change', function(){
		var bwrapper = $('main .csm-product div.product-buy'),
		pwrapper = $('main .csm-product .csm-product__info .product-price'),
		item = $(this).find(':selected'),
		priceQty = $('main .csm-product .price-quanty');

		if(item.attr('sku-id') == 'none'){
			priceQty.slideUp();
			bwrapper.find('a.buy-button.buy-button-ref').remove();
			pwrapper.find('.plugin-preco').remove()

			$(".available-alert").eq(0).html('<p>Selecione um produto!</p>');
		}else{
			priceQty.slideDown();
			if(bwrapper.find('a.buy-button.buy-button-ref').length != 0){
				bwrapper.find('a.buy-button.buy-button-ref').get(0).href = item.attr('cart-ref');
			}else{
				bwrapper.html('<a target="_top" class="buy-button buy-button-ref" href="'+ item.attr('cart-ref') +'" style="display:block">Comprar</a>')
			}
			if(pwrapper.find('.plugin-preco .productPrice .descricao-preco em.price-best-price').length != 0){
				pwrapper.find('.plugin-preco .productPrice .descricao-preco em.price-best-price strong.skuBestPrice').text('R$ ' + parseFloat(item.attr('sku-price')).toFixed(2).replace(/\./, ","));

				pwrapper.find('.plugin-preco .productPrice .descricao-preco em.price-installments strong.skuBestInstallmentNumber').text(item.attr('sku-installments-amount') + 'x');
				pwrapper.find('.plugin-preco .productPrice .descricao-preco em.price-installments strong.skuBestInstallmentValue').text('R$ ' + item.attr('sku-installments-price'));
			}else{
				pwrapper
				.append('<div></div>')
				.find('div')
				.addClass('plugin-preco')
				.append('<div></div>')
				.find('div')
				.addClass('productPrice')
				.append('<div></div>')
				.find('div')
				.addClass('descricao-preco')

				pwrapper.find('.plugin-preco .productPrice .descricao-preco')
				.append('<em class="valor-por price-best-price"></em>')
				.find('em.price-best-price')
				.html('Por: <strong class="skuBestPrice">R$ '+ parseFloat(item.attr('sku-price')).toFixed(2).replace(/\./, ",") +'</strong>');

				pwrapper.find('.plugin-preco .productPrice .descricao-preco')
				.append('<em class="valor-dividido price-installments"></em>')
				.find('em.price-installments')
				.html('ou <strong class="skuBestInstallmentNumber">'+ item.attr('sku-installments-amount') +'x</strong> de <strong class="skuBestInstallmentValue">R$ '+ item.attr('sku-installments-price') +'</strong>');
			}
			if(parseInt(item.attr('sku-qty')) <= 5){
				$(".available-alert").eq(0).html('<p>Corre que só tem <strong>' + item.attr('sku-qty') + "</strong> unidades disponíveis!</p>");
				$(".available-alert").eq(0).fadeIn();
			}else{
				$(".available-alert").eq(0).fadeOut();
			}

			if(item.data('sku-images').length > 0){
				console.log($('#'+ item.attr('sku-id')).data('sku-images'));
				let sku_images = $('#'+ item.attr('sku-id')).data('sku-images'),
				imagesWrapper = $('.csm-product .csm-product__images .product-images #show ul.thumbs');
				//Limpas imagens pre-existentes
				imagesWrapper.empty();
				$.each(sku_images, function(i, n){
					imagesWrapper.append('<li><a href="javascript:void(0);" rel="" zoom="" clas="ON"><img src="'+ n.imageUrl +'" title="'+ n.imageLabel +'" alt="'+ n.imageText +'" /></a></li>')
				});
			}
		}
	});
});