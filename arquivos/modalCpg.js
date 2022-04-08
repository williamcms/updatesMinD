const ModalCpg = {
	triggerItemsList: [],
	itemsAdded: [],
	promo: null,
	previousOrderForm: {},
	selectors: {
		overlay: "#e-modalCpg",
		content: ".e-modalCpg__content",
		closeButton: "#e-modalCpg-close",
		title: "#e-modalCpg h2",
		discount: "#e-modalCpg-discount",
		addButton: "#e-modalCpg-add",
		addButtonIcon: "#e-modalCpg-add .icon",
		refuseButton: "#e-modalCpg-refuse",
		shelf: "#e-modalCpg-shelf",
		selectedItem: "#e-modalCpg-shelf .slick-current",
		slickSlider: "#e-modalCpg .slick-slider",
		slickArrows: "#e-modalCpg-shelf .slick-arrow"
	},
	api: {
		getPromo: function() {
			const promoId = `promoId=${modalCpgConfig.promotionId}`;
			const url = `https://app.econverse.com.br/cliente/imaginarium/casa-mind/get-promo.php?${promoId}`;
			return $.ajax({
				url: url
			});
		},
		getProductBySku: function(sku) {
			const fq = `fq=skuId:${sku}`;
			const url = `/api/catalog_system/pub/products/search/?${fq}`;
			$.ajax({
				url: url,
				success: function(data) {
					if (!data.length) return;
					ModalCpg.build.setProduct(data[0]);
				}
			});
		}
	},
	build: {
		setTitle: function() {
			$(ModalCpg.selectors.content).find("h2").text(modalCpgConfig.modalTitle);
		},
		setAddButtonText: function() {
			$(ModalCpg.selectors.addButton).find("> span").text(modalCpgConfig.addButtonText);
		},
		setRefuseButtonText: function() {
			$(ModalCpg.selectors.refuseButton).text(modalCpgConfig.refuseButtonText);
		},
		setDiscountLabel: function() {
			const percentual = ModalCpg.promo.percentualDiscountValueList2;
			$(ModalCpg.selectors.discount).text(`${percentual}%`);
		},
		unslickShelf: function() {
			$(ModalCpg.selectors.shelf).slick("unslick");
		},
		slickShelf: function() {
			$(ModalCpg.selectors.shelf).slick({
				infinite: false,
				centerMode: true,
				variableWidth: true
			});
		},
		setProduct: function(product) {
			const floatToCurrency = (price, base = 1) => `R$ ${(price / base).toFixed(2).toString().replace(".", ",")}`;
			const item = product.items[0];
			if (!item.sellers[0].commertialOffer.AvailableQuantity) return;
			ModalCpg.build.unslickShelf();
			const skuId = item.itemId;
			const imageUrl = item.images[0].imageUrl;
			const imageAlt = item.images[0].imageAlt;
			const productName = product.productName;
			const listPriceFormatted = floatToCurrency(item.sellers[0].commertialOffer.ListPrice);
			const bestPrice = Math.min(item.sellers[0].commertialOffer.ListPrice * Math.abs(ModalCpg.promo.percentualDiscountValueList2 / 100 - 1), item.sellers[0].commertialOffer.Price);
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
			ModalCpg.build.slickShelf();
		},
		setShelfContent: function() {
			ModalCpg.promo.listSku2BuyTogether.forEach(function(item) {
				ModalCpg.api.getProductBySku(item.id);
			});
		},
		init: function() {
			ModalCpg.build.setTitle();
			ModalCpg.build.setAddButtonText();
			ModalCpg.build.setRefuseButtonText();
			ModalCpg.build.setDiscountLabel();
			ModalCpg.build.slickShelf();
			ModalCpg.build.setShelfContent();
		}
	},
	addButton: {
		setDisabled(disabled) {
			$(ModalCpg.selectors.addButton).attr("disabled", disabled);
		},
		setLoading(loading) {
			if (loading) {
				$(ModalCpg.selectors.addButton).addClass("loading");
				$(ModalCpg.selectors.slickArrows).addClass("slick-disabled");
			} else {
				$(ModalCpg.selectors.addButton).removeClass("loading");
				$(ModalCpg.selectors.slickArrows).removeClass("slick-disabled");
			}
			ModalCpg.addButton.setDisabled(loading);
		},
		setDone: function(done) {
			if (done) {
				$(ModalCpg.selectors.addButton).addClass("done");
			} else {
				$(ModalCpg.selectors.addButton).removeClass("done");
			}
			ModalCpg.addButton.setDisabled(done);
		},
		handleClick: function() {
			$(ModalCpg.selectors.addButton).on("click", function() {
				const selectedItem = $(ModalCpg.selectors.selectedItem);
				const id = selectedItem.find("*[data-skuid]").attr("data-skuid");
				const quantity = 1;
				const seller = 1;
				const item = {
					id: id,
					quantity: quantity,
					seller: seller
				};
				ModalCpg.addButton.setLoading(true);
				vtexjs.checkout.addToCart([ item ]).then(function() {
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
			$(window).on("orderFormUpdated.vtex", function(_, orderForm) {
				if (!ModalCpg.previousOrderForm || ModalCpg.previousOrderForm.items.length >= orderForm.items.length || orderForm.value < ModalCpg.promo.totalValueFloor) return;
				let hasTriggerItemsInCart = false;
				orderForm.items.every(function(item) {
					if (ModalCpg.triggerItemsList.indexOf(item.id) > -1) {
						hasTriggerItemsInCart = true;
					}
					return !hasTriggerItemsInCart;
				});
				if (!hasTriggerItemsInCart) return;
				setTimeout(ModalCpg.open, 5e3);
				ModalCpg.previousOrderForm = orderForm;
			});
		},
		handleModalClose: function() {
			$(ModalCpg.selectors.closeButton).on("click", ModalCpg.close);
			$(ModalCpg.selectors.refuseButton).on("click", ModalCpg.close);
		},
		handleSlideChange: function() {
			$(document).on("beforeChange", ModalCpg.selectors.slickSlider, function(_e, _slick, _currentSlick, nextSlide) {
				const isNextItemAdded = ModalCpg.itemsAdded.indexOf($(ModalCpg.selectors.slickSlider).find(`*[data-slick-index=${nextSlide}] *[data-skuid]`).attr("data-skuid")) > -1;
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
		$("body").css("overflow", "hidden");
		$("#e-modalCpg-shelf").slick("refresh");
	},
	close: function() {
		$(ModalCpg.selectors.overlay).hide();
		$("body").css("overflow", "initial");
	},
	init: function() {
		if (!modalCpgConfig.promotionId || !modalCpgConfig.enabled) return;
		ModalCpg.api.getPromo().then(function(promo) {
			if (!promo) return;
			ModalCpg.promo = promo;
			ModalCpg.previousOrderForm = vtexjs.checkout.orderForm;
			ModalCpg.triggerItemsList = ModalCpg.promo.listSku1BuyTogether.map(item => item.id);
			ModalCpg.events.init();
			ModalCpg.build.init();
			ModalCpg.addButton.init();
		});
	}
};

ModalCpg.init();

window.ModalCpg = ModalCpg;