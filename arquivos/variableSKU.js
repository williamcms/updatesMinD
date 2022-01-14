$(document).ready(function() {
	//Implementa função para arrays que pega o primeiro resultado disponivel do indice
	Object.defineProperty(Array.prototype, 'first', {
	  value() {
			return this.find(e => true);
		}
	});
	var variableSKU = (variableSKU = () => {
		var arr = $('main .csm-product #___rc-p-sku-ids').get(0).value.split(','), 
		pid = $('main .csm-product #___rc-p-id').get(0).value, 
		f = $('main .csm-product .product-sku-selection').eq(0), 
		prevAvaliable = null, 
		bwrapper = $('main .csm-product div.product-buy'), 
		bExists = $('main .csm-product div.product-buy a.buy-button.buy-button-ref');
		if (arr.length > 1) {
			$.ajax({
				accept: 'application/vnd.vtex.ds.v10+json',
				contentType: 'application/json; charset=utf-8',
				crossDomain: false,
				type: 'GET',
				url: '/api/catalog_system/pub/products/search/?fq=productId:' + pid
			}).done(function(e) {
				$.each(e.first().items, function(i) {
					let avaliable = this.sellers.first().commertialOffer.AvailableQuantity, def = prevAvaliable = i == 0 && avaliable > 0 ? ' active' : i > 0 && avaliable > 0 && prevAvaliable == null ? ' active' : '';
					f.append('<button class="sku-item' + def + '" sku-id="' + this.itemId + '" cart-ref="' + this.sellers.first().addToCartLink + '" ' + (avaliable <= 0 ? 'disabled' : '') + '>' + this.name + '</button>');
				});
				if (bExists.length != 0) {
					bExists.get(0).href = e.first().items.first().sellers.first().addToCartLink;
				} else {
					bwrapper.html('<a target="_top" class="buy-button buy-button-ref" href="' + e.first().items.first().sellers.first().addToCartLink + '" style="display:block">Comprar</a>');
				}
			});
		}
	})();
	//Usando delegação para achar elementos adicionados via script
	var selectvariableSKU = $('body').on('click', 'main .csm-product .product-sku-selection button.sku-item:not(button[disabled])', function() {
		var bwrapper = $('main .csm-product div.product-buy'), 
		bExists = $('main .csm-product div.product-buy a.buy-button.buy-button-ref'), 
		buttons = $('main .csm-product .product-sku-selection button.sku-item:not(button[disabled])');
		if (bExists.length != 0) {
			bExists.get(0).href = $(this).attr('cart-ref');
		} else {
			bwrapper.html('<a target="_top" class="buy-button buy-button-ref" href="' + $(this).attr('cart-ref') + '" style="display:block">Comprar</a>');
		}
		buttons.each(function(e) {
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});
});