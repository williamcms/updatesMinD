const ModalCpg = {
	triggerItemsList: [],
	itemsAdded: [],
	promo: null,
	previousOrderForm: {},

	selectors: {
		overlay: '#e-modalCpg',
		content: '.e-modalCpg__content',
		closeButton: '#e-modalCpg-close',
		title: '#e-modalCpg h2',
		discount: '#e-modalCpg-discount',
		addButton: '#e-modalCpg-add',
		addButtonIcon: '#e-modalCpg-add .icon',
		refuseButton: '#e-modalCpg-refuse',
		shelf: '#e-modalCpg-shelf',
		selectedItem: '#e-modalCpg-shelf .slick-current',
		slickSlider: '#e-modalCpg .slick-slider',
		slickArrows: '#e-modalCpg-shelf .slick-arrow',
	},

	api: {
		getPromo: function() {
			const promoId = `promoId=${window.modalCpgConfig.promotionId}`;
			const url = `https://app.econverse.com.br/cliente/imaginarium/casa-mind/get-promo.php?${promoId}`;

			return $.ajax({ url });
		},

		getProductBySku: function(sku) {
			const fq = `fq=skuId:${sku}`;
			const url = `/api/catalog_system/pub/products/search/?${fq}`;

			$.ajax({
				url,
				success: function(data) {
					if (!data.length) return;

					ModalCpg.build.setProduct(data[0], sku);
				}
			});
		},

		getProductById: function(id) {
			const fq = `fq=productId:${id}`;
			const url = `/api/catalog_system/pub/products/search/?${fq}`;

			$.ajax({
				url,
				success: function(data) {
					if (!data.length) return;

					ModalCpg.build.setProduct(data[0]);
				}
			});
		},

		getShelfByCollection: function(collectionId) {
			const fq = `fq=H:${collectionId}`;
			const sl = `sl=99c99f67-bb7b-4c64-a28d-37b8feeaa4bc`;
			const sm = `sm=0`
			const PS = `PS=99`;
			const cc = `cc=12`;
			const PageNumber = `PageNumber=1`

			const url = `/buscapagina?${fq}&${sl}&${sm}&${PS}&${cc}&${PageNumber}?_v=${Date.now()}`;

			$.ajax({
				url,
				success: function(data) {
					if (!data) return;

					$('.e-modalCpg').append(`<div class="temp-collection">${data}</div>`);

					const ids = [];

					$('.e-modalCpg .temp-collection *[data-skuid]').each((_, element) => {
						const skuId = $(element).data('skuid');

						ids.push(skuId);
					})

					$('.temp-collection').remove();

					ids.forEach(id => {
						ModalCpg.api.getProductBySku(id);
					});
				}
			});
		}
	},

	build: {
		setTitle: function() {
			$(ModalCpg.selectors.content).find('h2').text(window.modalCpgConfig.modalTitle);
		},

		setAddButtonText: function() {
			$(ModalCpg.selectors.addButton).find('> span').text(window.modalCpgConfig.addButtonText);
		},

		setRefuseButtonText: function() {
			$(ModalCpg.selectors.refuseButton).text(window.modalCpgConfig.refuseButtonText);
		},

		setDiscountLabel: function() {
			const percentual = ModalCpg.promo.percentualDiscountValue;
			$(ModalCpg.selectors.discount).text(`${percentual}%`);
		},

		unslickShelf: function() {
			$(ModalCpg.selectors.shelf).slick('unslick');
		},

		slickShelf: function() {
			$(ModalCpg.selectors.shelf).slick({
				infinite: false,
				centerMode: true,
				variableWidth: true,
			});
		},

		setProduct: function(product, sku) {
			const floatToCurrency = (price, base = 1) => `R$ ${(price/base).toFixed(2).toString().replace('.', ',')}`

			const item = sku ? product.items.find((item) => item.itemId == sku) : product.items[0];

			if (!item.sellers[0].commertialOffer.AvailableQuantity) return;

			const skuId = item.itemId;
			const imageUrl = item.images[0].imageUrl;
			const imageAlt = item.images[0].imageAlt;
			const productName = product.productName;
			const listPriceFormatted = floatToCurrency(item.sellers[0].commertialOffer.ListPrice);
			const bestPrice = Math.min(
				item.sellers[0].commertialOffer.ListPrice *
				Math.abs(ModalCpg.promo.percentualDiscountValue / 100 - 1),
				item.sellers[0].commertialOffer.Price
			);
			const bestPriceFormatted = floatToCurrency(bestPrice);
			const installments = item.sellers[0].commertialOffer.PaymentOptions.installmentOptions[0].installments.length;
			const installmentsPrice = floatToCurrency(bestPrice / installments);

			$(ModalCpg.selectors.shelf).append(`
				<li class="modalShelfItem" data-skuid=${skuId}>
					<img src=${imageUrl} alt=${imageAlt} />
					<h3>${productName}</h3>
					<span class="modalShelfItem__listPrice">${listPriceFormatted}</span>
					<span class="modalShelfItem__bestPrice">${bestPriceFormatted}</span>
					<span class="modalShelfItem__installments">Ou ${installments}x ${installmentsPrice}</span>
				</li>
			`);
		},

		setShelfContent: function() {
			ModalCpg.promo.skus.forEach(function({ id }) {
				ModalCpg.api.getProductBySku(id);
			});
			ModalCpg.promo.products.forEach(function({ id }) {
				ModalCpg.api.getProductById(id);
			});
			ModalCpg.promo.collections.forEach(function({ id }) {
				ModalCpg.api.getShelfByCollection(id);
			});
		},

		init: function() {
			ModalCpg.build.setTitle();
			ModalCpg.build.setAddButtonText();
			ModalCpg.build.setRefuseButtonText();
			ModalCpg.build.setDiscountLabel();
			ModalCpg.build.setShelfContent();
		}
	},

	addButton: {
		setDisabled(disabled) {
			$(ModalCpg.selectors.addButton).attr('disabled', disabled);
		},
		setLoading(loading) {
			if (loading) {
				$(ModalCpg.selectors.addButton).addClass('loading');
				$(ModalCpg.selectors.slickArrows).addClass('slick-disabled');
			} else {
				$(ModalCpg.selectors.addButton).removeClass('loading');
				$(ModalCpg.selectors.slickArrows).removeClass('slick-disabled');
			}

			ModalCpg.addButton.setDisabled(loading);
		},
		setDone: function(done) {
			if (done) {
				$(ModalCpg.selectors.addButton).addClass('done');
			} else {
				$(ModalCpg.selectors.addButton).removeClass('done');
			}

			ModalCpg.addButton.setDisabled(done);
		},

		handleClick: function() {
			$(ModalCpg.selectors.addButton).on('click', function() {
				const selectedItem = $(ModalCpg.selectors.selectedItem);

				const id = selectedItem.find('*[data-skuid]').attr('data-skuid');
				const quantity = 1;
				const seller = 1;

				const item = {
					id,
					quantity,
					seller,
				}

				ModalCpg.addButton.setLoading(true);
				vtexjs.checkout.addToCart([item]).then(function() {
					ModalCpg.addButton.setLoading(false);
					ModalCpg.addButton.setDone(true);
					ModalCpg.itemsAdded.push(id);
				});
			});
		},

		init: function() {
			ModalCpg.addButton.handleClick();
		}
	},

	events: {
		handleOrderFormUpdate: function() {
			$(window).on('orderFormUpdated.vtex', function(_, orderForm) {
				if (
					!ModalCpg.previousOrderForm
					|| ModalCpg.previousOrderForm.items.length >= orderForm.items.length
					|| orderForm.value/100 < ModalCpg.promo.totalValueFloor
				) return;

				setTimeout(ModalCpg.open, 5000);

				ModalCpg.previousOrderForm = orderForm;
			});
		},
		handleModalClose: function() {
			$(ModalCpg.selectors.closeButton).on('click', ModalCpg.close);
			$(ModalCpg.selectors.refuseButton).on('click', ModalCpg.close);
		},
		handleSlideChange: function() {
			$(document).on('beforeChange', ModalCpg.selectors.slickSlider, function(_e, _slick, _currentSlick, nextSlide) {
				const isNextItemAdded = ModalCpg.itemsAdded.indexOf(
					$(ModalCpg.selectors.slickSlider).find(`*[data-slick-index=${nextSlide}] *[data-skuid]`).data('skuid')
				) > -1;

				ModalCpg.addButton.setDone(isNextItemAdded);
			});
		},

		init: function() {
			ModalCpg.events.handleOrderFormUpdate();
			ModalCpg.events.handleModalClose();
			ModalCpg.events.handleSlideChange();
		}
	},

	open: function() {
		$(ModalCpg.selectors.overlay).show();
		$('body').css('overflow', 'hidden');
		ModalCpg.build.slickShelf();
	},

	close: function() {
		$(ModalCpg.selectors.overlay).hide();
		$('body').css('overflow', 'initial');
	},

	init: function() {
		if (!window.modalCpgConfig || !window.modalCpgConfig.promotionId || !window.modalCpgConfig.enabled) return;

		ModalCpg.api.getPromo().then(function(promo) {
			if (!promo) return;

			console.log('>>> promo', promo);

			ModalCpg.promo = promo;
			ModalCpg.previousOrderForm = vtexjs.checkout.orderForm;

			ModalCpg.triggerItemsList = ModalCpg.promo.listSku1BuyTogether.map((item) => item.id);

			ModalCpg.events.init();
			ModalCpg.build.init();
			ModalCpg.addButton.init();
		});
	}
}

ModalCpg.init();
window.ModalCpg = ModalCpg;