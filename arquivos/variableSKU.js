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
				$.each(e.first().items, function(i){
					let avaliable = this.sellers.first().commertialOffer.AvailableQuantity,
					def = prevAvaliable = (i == 0 && avaliable > 0 ? ' selected' : (i > 0 && avaliable > 0 && prevAvaliable == null ? ' selected' : '')),
					variations = {};
					$.each(e.first().items.sort(), function(x){
						let [first, ...rest] = this.name.split(' '),
						second = (rest.join(' ') == '' ? null : rest.join(' '));
						variations[x] = {'var' : {first, second}}
					})

					if(variations[i].var.second != null){
						if(i > 0 ? variations[i].var.first != variations[i-1].var.first : false || i == 0){
							f.append('<optgroup label="'+ variations[i].var.first +'">');
							
						}

						f.find('optgroup[label='+ variations[i].var.first +']').eq(0).append('<option class="sku-item" sku-id="'+ this.itemId +'" sku-price="'+ this.sellers.first().commertialOffer.price +'" sku-qty="'+ this.sellers.first().commertialOffer.AvailableQuantity +'" sku-images="'+ jQuery.map(this.images, function(n, i){ return n.imageUrl; }) +'" cart-ref="'+ this.sellers.first().addToCartLink +'" '+ (avaliable <= 0 ? 'disabled' : '') + def +'>'+variations[i].var.second+'</option>');

						if((i > 0 ? true : false) && 
							(i < Object.keys(variations).length - 1 && i > 0 ? variations[i].var.first != variations[i+1].var.first : '') || 
							i == Object.keys(variations).length - 1){
							f.append('</optgroup>');
							
						}
					}else{
						f.append('<option class="sku-item" sku-id="'+ this.itemId +'" sku-price="'+ this.sellers.first().commertialOffer.price +'" sku-qty="'+ this.sellers.first().commertialOffer.AvailableQuantity +'" sku-images="'+ jQuery.map(this.images, function(n, i){ return n.imageUrl; }) +'" cart-ref="'+ this.sellers.first().addToCartLink +'" '+ (avaliable <= 0 ? 'disabled' : '') + def +'>'+variations[i].var.first+'</option>');
					}
					if(i == e.first().items.length - 1){
						f.prepend('<option '+def+'>Nenhum selecionado</option>');
					}
				});
				if(bExists.length != 0){
					bExists.get(0).href = e.first().items.first().sellers.first().addToCartLink;
				}else{
					bwrapper.html('<a target="_top" class="buy-button buy-button-ref" href="'+ e.first().items.first().sellers.first().addToCartLink +'" style="display:block">Comprar</a>')
				}
			});
		}
	})();
	var selectvariableSKU = $('main .csm-product .product-sku-selection button.sku-item:not(button[disabled])').on('click', function(){
		var bwrapper = $('main .csm-product div.product-buy'),
		bExists = $('main .csm-product div.product-buy a.buy-button.buy-button-ref');
		if(bExists.length != 0){
			bExists.get(0).href = $(this).attr('cart-ref');
		}else{
			bwrapper.html('<a target="_top" class="buy-button buy-button-ref" href="'+ $(this).attr('cart-ref') +'" style="display:block">Comprar</a>')
		}
	});
});