//
// Código por William Di Biasi Bogik
//
//

$(document).ready(function () {
	"use strict";

	//Addons
	if (typeof (Array.prototype.first) === "undefined") {
		Object.defineProperty(Array.prototype, "first", {
			value() {
				return this.find(() => true);     //or this.find(Boolean)
			}
		});
	}

	var copyText = (copyText = (text) => {
		navigator.clipboard.writeText(text);
	});

	$("select[name=emailType]").on("change", function () {
		let type0 = $(".emailType-0"),
			type1 = $(".emailType-1");

		let selectedType = $(this).find("option:selected").val();

		if (selectedType == 0) {
			type0.slideDown();
			type1.slideUp();
		} else if (selectedType == 1) {
			type0.slideUp();
			type1.slideDown();
		}
		//Limpa o HTML renderizado
		$("#viewRenderedHTML").empty();
		$("#viewHTMLCode").empty();
	});

	$(document).on("click", ".getDetails", function () {
		let inputN = $(this).data("input"),
			ref = $("input[name=vitrine-" + inputN + "]").val(),
			product = {};

		$.ajax({
			accept: "application/vnd.vtex.ds.v10+json",
			contentType: "application/json; charset=utf-8",
			crossDomain: false,
			type: "GET",
			url: "/api/catalog_system/pub/products/search/?fq=alternateIds_RefId:" + ref
		}).done(function (e) {
			//Pega o melhor parcelamento
			let prices = {},
				currencySymbol = "R$ ";
			$.each(e.first().items.first().sellers.first().commertialOffer.Installments, function () {
				if ((this.Value < prices.Value || prices.Value == null) && (this.NumberOfInstallments > prices.NumberOfInstallments || prices.NumberOfInstallments == null)) {
					prices = {
						"NumberOfInstallments": this.NumberOfInstallments,
						"Value": this.Value
					};
				}
			});

			//Pega os dados do produto
			product = {
				name: $.trim((e.first().productName).slice(0, 40)) + (e.first().productName.length > 40 ? "..." : ""),
				priceP: currencySymbol + (e.first().items.first().sellers.first().commertialOffer.ListPrice).toFixed(2).replace(/\./, ","),
				priceN: currencySymbol + (e.first().items.first().sellers.first().commertialOffer.PriceWithoutDiscount).toFixed(2).replace(/\./, ","),
				installments: prices.NumberOfInstallments + "x " + currencySymbol + (prices.Value).toFixed(2).replace(/\./, ","),
				qty: e.first().items.first().sellers.first().commertialOffer.AvailableQuantity,
				image: e.first().items.first().images.first().imageUrl,
				link: e.first().link
			};

			//Remove priceP se os preços forem iguais (não há desconto)
			if (product.priceP === product.priceN) {
				product.priceP = "";
			}

			if ($(".row.newFields[data-input=" + inputN + "]").length >= 1) {
				$(".row.newFields").find("input[name=vitrine-name-" + inputN + "]").val(product.name);
				$(".row.newFields").find("input[name=vitrine-priceP-" + inputN + "]").val(product.priceP);
				$(".row.newFields").find("input[name=vitrine-priceN-" + inputN + "]").val(product.priceN);
				$(".row.newFields").find("input[name=vitrine-installments-" + inputN + "]").val(product.installments);
				$(".row.newFields").find("input[name=vitrine-link-" + inputN + "]").val(product.link + "?reportEmail=produto_" + inputN);
				$(".row.newFields").find("input[name=vitrine-image-" + inputN + "]").val((product.image).replace(/\d+/g, "$&-290-435"));
				$(".row.newFields").find("input[name=vitrine-qty-" + inputN + "]").val(product.qty);
			}

			$("#vitrines").find("a.getDetails[data-input=" + inputN + "]").removeClass("change");
			$("#vitrines").find("a.getDetails[data-input=" + inputN + "]").addClass("complete");
		});
	});

	$(document).on("change keyup paste", "#vitrines input", function () {
		$("#vitrines").find("a.getDetails[data-input=" + $(this).data("input") + "]").removeClass("complete");
		$("#vitrines").find("a.getDetails[data-input=" + $(this).data("input") + "]").addClass("change");
	});

	$(".btn-add").on("click", function () {
		let referId = $(this).data("refer"),
			container = $("#" + referId),
			eFields = container.find(".form-group"),
			clone = eFields,
			html = clone[0].outerHTML;
		html = html.replaceAll(1, eFields.length + 1).replaceAll(0, eFields.length);

		container.append($(html));
	});

	$(document).on("click", ".btn-remove", function () {
		let referInput = $(this).data("input"),
			referId = $(this).data("refer");

		$("#" + referId + " > .form-group")[referInput].remove();
	});

	$("#generateHTML").on("click", function () {
		let type = $("select[name=emailType]").val();

		if (type == 1) {
			// news/foter - 1
			let html = "<table class=\"nl-container\" style=\"table-layout:fixed;vertical-align:top;min-width:320px;border-spacing:0;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;width:100%\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\" bgcolor=\"#FFFFFF\" valign=\"top\"> <tbody> <tr> <td style=\"opacity:0;font-size:0\">SUBSTITUIR-PREHEADER</td></tr><tr style=\"vertical-align:top\" valign=\"top\"> <td style=\"word-break:break-word;vertical-align:top\" valign=\"top\"> <div style=\"background-color:transparent\"> <div class=\"block-grid\" style=\"min-width:320px;max-width:730px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;margin:0 auto;background-color:#fff\"> <div style=\"border-collapse:collapse;display:table;width:100%;background-color:#fff;background-image:undefined;background-position:undefined;background-repeat:undefined\"> <div class=\"col num12\" style=\"min-width:320px;max-width:730px;display:table-cell;vertical-align:top;width:730px;padding:0\"> <div class=\"col_cont\" style=\"width:100%!important\"> <div style=\"border:0 solid transparent;padding:0\"> <div class=\"img-container center autowidth\" align=\"center\" style=\"padding-right:0;padding-left:0\"> <div style=\"display:none\">Decore a sua casa com os objetos de decoração modernos e cheios de personalidade da Casa MinD. Nós oferecemos decoração, iluminação, mobiliário e muito mais em estilos contemporâneos e designs inspiradores. Apaixone-se pela sua casa todos os dias!</div><a href=\"https://www.casamind.com.br\" style=\"outline:0\" rel=\"noopener noreferrer\" tabindex=\"-1\"><img class=\"center autowidth\" align=\"center\" border=\"0\" src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_01.png\" style=\"text-decoration:none;-ms-interpolation-mode:bicubic;height:auto;border:0;max-width:100%;display:block;margin:0 auto\" width=\"730\" alt=\"Logo\" title=\"Logo\"></a> </div></div></div></div></div></div></div><div> <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\" bgcolor=\"#FFFFFF\" style=\"background-color: transparent;\"> <tbody> <tr> <td><a href=\"https://www.casamind.com.br/promocao?ReportEmail=header_promo\" target=\"_blank\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_02.png\" alt=\"Promoções\" title=\"Promoções\"></a></td><td><a href=\"https://www.casamind.com.br/decoracao/VASOS-E-CACHEPOTS?O=OrderByTopSaleDESC&amp;ReportEmail=header_vasosecachepots\" target=\"_blank\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_04.png\" alt=\"Vasos &amp; Cachepots\" title=\"Vasos &amp; Cachepots\"></a></td><td><a href=\"https://www.casamind.com.br/novidades?ReportEmail=header_novidades\" target=\"_blank\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_03.png\" alt=\"Novidades\" title=\"Novidades\"></a></td><td><a href=\"https://www.casamind.com.br/moveis2?O=OrderByTopSaleDESC?ReportEmail=header_moveis\" target=\"_blank\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_05.png\" alt=\"Móveis\" title=\"Móveis\"></a> </td></tr></tbody> </table> </div><div style=\"background-color:transparent\"> <div class=\"block-grid\" style=\"min-width:320px;max-width:730px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;margin:0 auto;background-color:#fff\"> <div style=\"border-collapse:collapse;display:table;width:100%;background-color:#fff\"> <div class=\"col num12\" style=\"min-width:320px;max-width:730px;display:table-cell;vertical-align:top;width:730px\"> <div class=\"col_cont\" style=\"width:100%!important\"> <div style=\"border:0 solid transparent;padding:5px 0 5px 0\">BANNERTOPFOOTER</div></div></div></div></div></div><div style=\"background-color:transparent\"> <div class=\"block-grid\" style=\"min-width:320px;max-width:601px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;margin:0 auto;background-color:#fff\"> <div style=\"border-collapse:collapse;display:table;width:100%;background-color:#fff\"> <div class=\"col num12\" style=\"min-width:320px;max-width:601px;display:table-cell;vertical-align:top;width:601px\"> <div class=\"col_cont\" style=\"width:100%!important\"> <div style=\"border:0 solid transparent;padding:5px 0 5px 0\"> <table class=\"divider\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;min-width:100%;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%\" role=\"presentation\" valign=\"top\"> <tbody> <tr style=\"vertical-align:top\" valign=\"top\"> <td class=\"divider_inner\" style=\"word-break:break-word;vertical-align:top;min-width:100%;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;padding:0\" valign=\"top\"> <table class=\"divider_content\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;border-top:1px solid transparent;width:100%\" align=\"center\" role=\"presentation\" valign=\"top\"> <tbody> <tr style=\"vertical-align:top\" valign=\"top\"> <td style=\"word-break:break-word;vertical-align:top;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%\" valign=\"top\"><span></span></td></tr></tbody> </table> </td></tr></tbody> </table> </div></div></div></div></div></div><div style=\"background-color:transparent\"> <div style=\"min-width:320px;max-width:601px;padding:32px 0 0 0;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;margin:0 auto;background-color:#fff\"> <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"600\"> <tr style=\"background-image:linear-gradient(#fff,#fff)\"> <td><a href=\"https://www.casamind.com.br/institucional/regulamento-promocoes\" target=\"https://www.casamind.com.br/institucional/regulamento-promocoes?ReportEmail=footer_beneficios\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_07.png\" alt=\"Entrega\" width=\"100%\" border=\"0\" style=\"display:block\" align=\"center\"></a></td><td><a href=\"https://www.tiktok.com/@casamindbr/\" target=\"https://www.tiktok.com/@casamindbr\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_08.png\" alt=\"Entrega\" width=\"100%\" border=\"0\" style=\"display:block\" align=\"center\"></a></td><td><a href=\"https://www.instagram.com/casamindbr/\" target=\"https://www.instagram.com/casamindbr/\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_09.png\" alt=\"Entrega\" width=\"100%\" border=\"0\" style=\"display:block\" align=\"center\"></a></td><td><a href=\"https://www.facebook.com/casamind\" target=\"https://www.facebook.com/casamind/\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_10.png\" alt=\"Entrega\" width=\"100%\" border=\"0\" style=\"display:block\" align=\"center\"></a></td><td><a href=\"https://br.pinterest.com/casamind/\" target=\"https://br.pinterest.com/casamind/\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_11.png\" alt=\"Entrega\" width=\"100%\" border=\"0\" style=\"display:block\" align=\"center\"></a></td><td><a href=\"https://www.youtube.com/channel/UCyB6v68SH6KrYa4PESKV79w\" target=\"https://www.youtube.com/channel/UCyB6v68SH6KrYa4PESKV79wl\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_12.png\" alt=\"Entrega\" width=\"100%\" border=\"0\" style=\"display:block\" align=\"center\"></a></td></tr></table> </div></div><div style=\"background-color:transparent\"> <div style=\"min-width:320px;max-width:601px;padding:0;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;margin:0 auto;background-color:#fff\"> <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"600\"> <tr style=\"background-image:linear-gradient(#fff,#fff)\"> <td style=\"padding:5px 10px;max-width:600px;font-size:12px;font-family:Muli,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:12px;text-align:center;color:#888\" class=\"x-gmail-data-detectors\"> <font class=\"rfm\" style=\"font-family:Muli,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:10px;color:#666;max-width:600px\"> <a style=\"text-decoration:none;color:#ff129e\" href=\"[unsubscribe]\"></a> <p style=\"margin-top:16px;margin-bottom:32px;border-bottom:1px solid #888\" class=\"spacer\"></p><p>Adicione o endereço <a href=\"mailto:mind@mkt.casamind.com.br\" style=\"text-decoration:none;color:#f2008b\" target=\"_blank\">mind@mkt.casamind.com.br </a>em sua lista de remetentes confiáveis para garantir que as nossas mensagens e ofertas cheguem à sua caixa de e-mails. Você está recebendo este email através da assinatura em nosso site.</p><p>A Casa Mind respeita a sua privacidade e opinião. Caso queira deixar de receber os nossos e-mails <a style=\"text-decoration:none;color:#ff129e\" href=\"[unsubscribe]\">descadastre-se aqui.</a><br>Ao solicitar o cancelamento, pode-se levar até três dias úteis para atualização da solicitação em nosso sistema.</p><p style=\"margin-top:32px;margin-bottom:32px;border-bottom:1px solid #888\" class=\"spacer\"></p><p style=\"font-weight:600\"><strong>Informações:</strong></p><p>*Preços sujeitos à alterações e exclusivos para este canal de comunicação. Para ativação de determinados descontos é necessário a inserção do código promocional enviado no email. Caso haja diferença de preço ou descrição de produto, a condição válida e praticada é a presente no site. *O pagamento pode ser à vista ou parcelado em até 06 vezes sem juros, sujeito à política comercial. </p><p style=\"margin-top:32px;margin-bottom:32px;border-bottom:1px solid #888\" class=\"spacer\"></p><p><strong>Nosso endereço:</strong></p><p>Rua Gercino Machado, 207 - Beira Rio, Biguaçu - SC - CEP 88164-290 - CNPJ: 00.399.603/0006-12</p><p>Consulte nossa <a href=\"https://ms.imgnet.com.br/privacy/\" style=\"text-decoration:none;color:#f2008b\" target=\"_blank\">Política de Privacidade</a> para mais informações.<br>Este e-mail foi mandado por Casa Mind</p></font> </td></tr></table> </div></div></td></tr></tbody></table>",
				banner = "<div class=\"img-container center autowidth big\" align=\"center\" style=\"padding-right: 0px; padding-left: 0px;\"><a href=\"BANNERLINK\" title=\"BANNERALT\"><img class=\"center autowidth\" align=\"center\" border=\"0\" src=\"BANNERIMAGEM\" alt=\"BANNERALT\" title=\"BANNERALT\" style=\"text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 730px; max-width: 100%; display: block;\" width=\"730\" /></a></div>",
				preheader = $("input[name=preheader]").val(),
				bannerTemp = "";

			$.each($("#bannerstopfooter > .form-group"), function (i) {
				let bannerimage = $(this).find("input[name=banners-image-" + i + "]").val(),
					bannerlink = $(this).find("input[name=banners-link-" + i + "]").val(),
					bannertitle = $(this).find("input[name=banners-title-" + i + "]").val();

				let reportEmail = "reportEmail=banner_" + i;
				bannerlink = bannerlink + (bannerlink.indexOf("?") === -1 ? "?" : "&") + reportEmail;

				bannerTemp += banner.replaceAll("BANNERLINK", bannerlink).replaceAll("BANNERALT", bannertitle).replaceAll("BANNERIMAGEM", bannerimage);

			});

			html = html.replaceAll("SUBSTITUIR-PREHEADER", preheader).replaceAll("BANNERTOPFOOTER", bannerTemp);
			$("#viewRenderedHTML").html(html);
			$("#viewHTMLCode").text(html);

		} else if (type == 0) {
			// vitrines
			let html = "<!DOCTYPE html><html lang=\"br\"><head><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"><meta charset=\"utf-8\"/><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"/><meta http-equiv=\"cleartype\" content=\"on\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\"/><meta name=\"robots\" content=\"noindex, nofollow\"/><link rel=\"shortcut icon\" href=\"https://lojapuket.vteximg.com.br/arquivos/favicon.ico\"/><title>MinD</title></head><body><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"100%\" style=\"font-family: ff-cocon-pro, Lucida Sans Unicode, Arial, sans-serif; font-weight: 100; color:#666666; background-color: #ffffff;\" bgcolor=\"#ffffff\"><tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\" height=\"30\"><tr><td style=\"opacity:0;font-size:0;\">SUBSTITUIR-PREHEADER</td></tr></table></td></tr><tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\" bgcolor=\"#FFFFFF\" style=\"background-color: transparent;\"><td><a href=\"https://www.casamind.com.br/?ReportEmail=header_home\" target=\"_blank\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_01.png\" alt=\"Casa MinD\" title=\"Casa MinD\" width=\"100%\" border=\"0\" style=\"display:block;\" align=\"center\"></a></td></tr></table></td></tr><tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\" bgcolor=\"#FFFFFF\" style=\"background-color: transparent;\">SUBSTITUIR-MENU</table></td></tr>SUBSTITUIR-BANNER-TOP<tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\"><tr><td height=\"24\"></td></tr></table></td></tr><tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\"><tr><td align=\"center\"><font style=\"color: CORDOTITULOVITRINE;font-size: 24px;text-decoration: none;font-weight: bold;\">SUBSTITUIR-TITLE-VITRINE</font></td></tr></table></td></tr><tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\"><tr><td height=\"24\"></td></tr></table></td></tr>SUBSTITUIR-VITRINES SUBSTITUIR-BANNER-BAIXO<tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\"></table></td></tr>SUBSTITUIR-FOOTER</table></body></html>",
				menu = "<tr> <td> <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\" bgcolor=\"#FFFFFF\" style=\"background-color: transparent;\"> <tbody> <tr> <td><a href=\"https://www.casamind.com.br/promocao?ReportEmail=header_promo\" target=\"_blank\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_02.png\" alt=\"Promoções\" title=\"Promoções\"></a></td><td><a href=\"https://www.casamind.com.br/decoracao/VASOS-E-CACHEPOTS?O=OrderByTopSaleDESC&amp;ReportEmail=header_vasosecachepots\" target=\"_blank\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_04.png\" alt=\"Vasos &amp; Cachepots\" title=\"Vasos &amp; Cachepots\"></a></td><td><a href=\"https://www.casamind.com.br/novidades?ReportEmail=header_novidades\" target=\"_blank\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_03.png\" alt=\"Novidades\" title=\"Novidades\"></a></td><td><a href=\"https://www.casamind.com.br/moveis2?O=OrderByTopSaleDESC?ReportEmail=header_moveis\" target=\"_blank\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_05.png\" alt=\"Móveis\" title=\"Móveis\"></a> </td></tr></tbody> </table> </td></tr>",
				footer = "<tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\"><tr><td><div style=\"background-color:transparent\"><div style=\"min-width:320px;max-width:601px;padding:32px 0 0 0;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;margin:0 auto;background-color:#fff\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"600\"><tr style=\"background-image:linear-gradient(#fff,#fff)\"><td><a href=\"https://www.casamind.com.br/institucional/regulamento-promocoes\" target=\"https://www.casamind.com.br/institucional/regulamento-promocoes?ReportEmail=footer_beneficios\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_07.png\" alt=\"Entrega\" width=\"100%\" border=\"0\" style=\"display:block\" align=\"center\"></a></td><td><a href=\"https://www.tiktok.com/@casamindbr/\" target=\"https://www.tiktok.com/@casamindbr\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_08.png\" alt=\"Entrega\" width=\"100%\" border=\"0\" style=\"display:block\" align=\"center\"></a></td><td><a href=\"https://www.instagram.com/casamindbr/\" target=\"https://www.instagram.com/casamindbr/\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_09.png\" alt=\"Entrega\" width=\"100%\" border=\"0\" style=\"display:block\" align=\"center\"></a></td><td><a href=\"https://www.facebook.com/casamind\" target=\"https://www.facebook.com/casamind/\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_10.png\" alt=\"Entrega\" width=\"100%\" border=\"0\" style=\"display:block\" align=\"center\"></a></td><td><a href=\"https://br.pinterest.com/casamind/\" target=\"https://br.pinterest.com/casamind/\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_11.png\" alt=\"Entrega\" width=\"100%\" border=\"0\" style=\"display:block\" align=\"center\"></a></td><td><a href=\"https://www.youtube.com/channel/UCyB6v68SH6KrYa4PESKV79w\" target=\"https://www.youtube.com/channel/UCyB6v68SH6KrYa4PESKV79wl\"><img src=\"https://imagens.imgnet.com.br/puket/_2022/mind/header&footer/layout_mind2_12.png\" alt=\"Entrega\" width=\"100%\" border=\"0\" style=\"display:block\" align=\"center\"></a></td></tr></table></div></div><div style=\"background-color:transparent\"><div style=\"min-width:320px;max-width:601px;padding:0;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;margin:0 auto;background-color:#fff\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"600\"><tr style=\"background-image:linear-gradient(#fff,#fff)\"><td style=\"padding:5px 10px;max-width:600px;font-size:12px;font-family:Muli,Helvetica Neue,Helvetica,Arial,sans-serif;line-height:12px;text-align:center;color:#888\" class=\"x-gmail-data-detectors\"><font class=\"rfm\" style=\"font-family:Muli,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:10px;color:#666;max-width:600px\"><a style=\"text-decoration:none;color:#ff129e\" href=\"[unsubscribe]\"></a><p style=\"margin-top:16px;margin-bottom:32px;border-bottom:1px solid #888\" class=\"spacer\"></p><p>Adicione o endereço <a href=\"mailto:mind@mkt.casamind.com.br\" style=\"text-decoration:none;color:#f2008b\" target=\"_blank\">mind@mkt.casamind.com.br </a>em sua lista de remetentes confiáveis para garantir que as nossas mensagens e ofertas cheguem à sua caixa de e-mails. Você está recebendo este email através da assinatura em nosso site.</p><p>A Casa Mind respeita a sua privacidade e opinião. Caso queira deixar de receber os nossos e-mails <a style=\"text-decoration:none;color:#ff129e\" href=\"[unsubscribe]\">descadastre-se aqui.</a><br>Ao solicitar o cancelamento, pode-se levar até três dias úteis para atualização da solicitação em nosso sistema.</p><p style=\"margin-top:32px;margin-bottom:32px;border-bottom:1px solid #888\" class=\"spacer\"></p><p style=\"font-weight:600\"><strong>Informações:</strong></p><p>*Preços sujeitos à alterações e exclusivos para este canal de comunicação. Para ativação de determinados descontos é necessário a inserção do código promocional enviado no email. Caso haja diferença de preço ou descrição de produto, a condição válida e praticada é a presente no site. *O pagamento pode ser à vista ou parcelado em até 06 vezes sem juros, sujeito à política comercial.</p><p style=\"margin-top:32px;margin-bottom:32px;border-bottom:1px solid #888\" class=\"spacer\"></p><p><strong>Nosso endereço:</strong></p><p>Rua Gercino Machado, 207 - Beira Rio, Biguaçu - SC - CEP 88164-290 - CNPJ: 00.399.603/0006-12</p><p>Consulte nossa <a href=\"https://ms.imgnet.com.br/privacy/\" style=\"text-decoration:none;color:#f2008b\" target=\"_blank\">Política de Privacidade</a> para mais informações.<br>Este e-mail foi mandado por Casa Mind</p></font></td></tr></table></div></div></td></tr></table></td></tr>",
				vitrines = "<tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\"><tbody><tr><td style=\"display:DISPLAY1\"> <a href=\"LINK1\" title=\"NOME1\" target=\"_blank\"> <img src=\"IMAGEM1\" alt=\"NOME1\" border=\"0\" style=\"display: block;margin:0 auto;\" width=\"228\"> </a> </td><td width=\"23\"></td><td style=\"display:DISPLAY2\"> <a href=\"LINK2\" title=\"NOME2\" target=\"_blank\"> <img src=\"IMAGEM2\" alt=\"NOME2\" border=\"0\" style=\"display: block;margin:0 auto;\" width=\"228\"> </a> </td><td width=\"23\"></td><td style=\"display:DISPLAY3\"> <a href=\"LINK3\" title=\"NOME3\" target=\"_blank\"> <img src=\"IMAGEM3\" alt=\"NOME3\" border=\"0\" style=\"display: block;margin:0 auto;\" width=\"228\"> </a> </td></tr><tr height=\"32\"><td></td><td width=\"23\"></td><td></td><td width=\"23\"></td><td></td></tr><tr><td height=\"50\" align=\"center\" valign=\"top\" style=\"display:DISPLAY1\"> <a href=\"LINK1\" title=\"NOME1\" target=\"_blank1\" style=\"text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;\"> NOME1 </a> </td><td width=\"23\"></td><td height=\"50\" align=\"center\" valign=\"top\" style=\"display:DISPLAY2\"> <a href=\"LINK2\" title=\"NOME2\" target=\"_blank\" style=\"text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;\"> NOME2 </a> </td><td width=\"23\"></td><td height=\"50\" align=\"center\" valign=\"top\" style=\"display:DISPLAY3\"> <a href=\"LINK3\" title=\"NOME3\" target=\"_blank\" style=\"text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;\"> NOME3 </a> </td></tr><tr height=\"16\"><td></td><td width=\"23\"></td><td></td><td width=\"23\"></td><td></td></tr><tr><td style=\"display:DISPLAY1\"><table style=\"margin:0 auto;\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\"><tbody><tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"100%\"><tbody><tr><td style=\"text-align: center;\"> <a href=\"LINK1\" title=\"NOME1\" target=\"_blank\" style=\"text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px\"> DE1 </a> </td></tr><tr><td> <a href=\"LINK1\" title=\"NOME1\" target=\"_blank\" style=\"text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px\"> POR1 </a> </td></tr><tr><td style=\"text-align: center;\"> <a href=\"LINK1\" title=\"NOME1\" target=\"_blank\" style=\"text-align: center; color:CORINSTALLMENTS; text-decoration:none; font-size:12px\"> PARCELAMENTO1 </a> </td></tr></tbody></table></td><td> SEPARADOR1 </td><td> <a href=\"LINK1\" title=\"NOME1\" target=\"_blank\" style=\"text-align: center; color:#4D4D44; text-decoration:none; font-size:12px\"> <img src=\"BOTAOCTA\" alt=\"eu quero\" border=\"0\" width=\"75\" style=\"display: block;\"> </a> </td></tr></tbody></table></td><td width=\"23\"></td><td style=\"display:DISPLAY2\"><table style=\"margin:0 auto;\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\"><tbody><tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"100%\"><tbody><tr><td style=\"text-align: center;\"> <a href=\"LINK2\" title=\"NOME2\" target=\"_blank\" style=\"text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px\"> DE2 </a> </td></tr><tr><td> <a href=\"LINK2\" title=\"NOME2\" target=\"_blank\" style=\"text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px\"> POR2 </a> </td></tr><tr><td style=\"text-align: center;\"> <a href=\"LINK2\" title=\"NOME2\" target=\"_blank\" style=\"text-align: center; color:CORINSTALLMENTS; text-decoration:none; font-size:12px\"> PARCELAMENTO2 </a> </td></tr></tbody></table></td><td> SEPARADOR2 </td><td> <a href=\"LINK2\" title=\"NOME2\" target=\"_blank\" style=\"text-align: center; color:#4D4D44; text-decoration:none; font-size:12px\"> <img src=\"BOTAOCTA\" alt=\"eu quero\" border=\"0\" width=\"75\" style=\"display: block;\"> </a> </td></tr></tbody></table></td><td width=\"23\"></td><td style=\"display:DISPLAY3\"><table style=\"margin:0 auto;\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\"><tbody><tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"100%\"><tbody><tr><td style=\"text-align: center;\"> <a href=\"LINK3\" title=\"NOME3\" target=\"_blank\" style=\"text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px\"> DE3 </a> </td></tr><tr><td> <a href=\"LINK3\" title=\"NOME3\" target=\"_blank\" style=\"text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px\"> POR3 </a> </td></tr><tr><td style=\"text-align: center;\"> <a href=\"LINK3\" title=\"NOME3\" target=\"_blank\" style=\"text-align: center; color:CORINSTALLMENTS; text-decoration:none; font-size:12px\"> PARCELAMENTO3 </a> </td></tr></tbody></table></td><td> SEPARADOR3 </td><td> <a href=\"LINK3\" title=\"NOME3\" target=\"_blank\" style=\"text-align: center; color:#4D4D44; text-decoration:none; font-size:12px\"> <img src=\"BOTAOCTA\" alt=\"eu quero\" border=\"0\" width=\"75\" style=\"display: block;\"> </a> </td></tr></tbody></table></td></tr></tbody></table></td></tr>",
				vitrines2 = "<tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\"><tbody><tr><td width=\"65\"></td><td style=\"display:DISPLAY1\"><a href=\"LINK1\" title=\"NOME1\" target=\"_blank\"><img src=\"IMAGEM1\" alt=\"NOME1\" border=\"0\" style=\"display: block;margin:0 auto;\" width=\"288\"></a></td><td width=\"24\"></td><td style=\"display:DISPLAY2\"><a href=\"LINK2\" title=\"NOME2\" target=\"_blank\"><img src=\"IMAGEM2\" alt=\"NOME2\" border=\"0\" style=\"display: block;margin:0 auto;\" width=\"288\"></a></td><td width=\"65\"></td></tr><tr height=\"16\"><td width=\"65\"></td><td></td><td width=\"24\"></td><td></td><td width=\"65\"></td></tr><tr><td width=\"65\"></td><td height=\"50\" align=\"center\" valign=\"top\" style=\"display:DISPLAY1\"><a href=\"LINK1\" title=\"NOME1\" target=\"_blank\" style=\"text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;\">NOME1</a></td><td width=\"24\"></td><td height=\"50\" align=\"center\" valign=\"top\" style=\"display:DISPLAY2\"><a href=\"LINK2\" title=\"NOME2\" target=\"_blank\" style=\"text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;\">NOME2</a></td><td width=\"65\"></td></tr><tr height=\"16\"><td width=\"65\"></td><td></td><td width=\"24\"></td><td></td><td width=\"65\"></td></tr><tr><td width=\"65\"></td><td style=\"display:DISPLAY1\"><table style=\"margin:0 auto;\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\"><tbody><tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"100%\"><tbody><tr><td style=\"text-align: center;\"><a href=\"LINK1\" title=\"NOME1\" target=\"_blank\" style=\"text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px\">DE1</a></td></tr><tr><td><a href=\"LINK1\" title=\"NOME1\" target=\"_blank\" style=\"text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px\">POR1</a></td></tr><tr><td style=\"text-align: center;\"><a href=\"LINK1\" title=\"NOME1\" target=\"_blank\" style=\"text-align: center; color:CORINSTALLMENTS; text-decoration:none; font-size:12px\">PARCELAMENTO1</a></td></tr></tbody></table></td><td>SEPARADOR1</td><td><a href=\"LINK1\" title=\"NOME1\" target=\"_blank\" style=\"text-align: center; color:#4D4D44; text-decoration:none; font-size:12px\"><img src=\"BOTAOCTA\" alt=\"eu quero\" border=\"0\" width=\"75\" style=\"display: block;\"></a></td></tr></tbody></table></td><td width=\"24\"></td><td style=\"display:DISPLAY2\"><table style=\"margin:0 auto;\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\"><tbody><tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"100%\"><tbody><tr><td style=\"text-align: center;\"><a href=\"LINK2\" title=\"NOME2\" target=\"_blank\" style=\"text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px\">DE2</a></td></tr><tr><td><a href=\"LINK2\" title=\"NOME2\" target=\"_blank\" style=\"text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px\">POR2</a></td></tr><tr><td style=\"text-align: center;\"><a href=\"LINK2\" title=\"NOME2\" target=\"_blank\" style=\"text-align: center; color:CORINSTALLMENTS; text-decoration:none; font-size:12px\">PARCELAMENTO2</a></td></tr></tbody></table></td><td>SEPARADOR2</td><td><a href=\"LINK2\" title=\"NOME2\" target=\"_blank\" style=\"text-align: center; color:#4D4D44; text-decoration:none; font-size:12px\"><img src=\"BOTAOCTA\" alt=\"eu quero\" border=\"0\" width=\"75\" style=\"display: block;\"></a></td></tr></tbody></table></td><td width=\"65\"></td></tr></tbody></table></td></tr>",
				espaco = " <tr> <td> <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\"> <tr> <td height=\"24\"></td> </tr> </table> </td> </tr> ",
				banner = "<tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" width=\"730\"><tr><td><a href=\"BANNERLINK\" target=\"_blank\"><img src=\"BANNERIMAGEM\" alt=\"BANNERALT\" title=\"BANNERALT\" width=\"100%\" border=\"0\" style=\"display:block;width:100%;max-width:100%;\" align=\"center\"></a></td></tr></table></td></tr>",
				preheader = $("input[name=preheader]").val(),
				vitrineTitle = $("input[name=vitrine-title]").val(),
				columns = $("select[name=vitrine-column-number]").val(),
				vitrineColorTitle = $("input[name=vitrine-title-color]").val(),
				color = $("input[name=vitrine-price-color]").val(),
				textColor = $("input[name=vitrine-text-color]").val(),
				installmentsColor = $("input[name=vitrine-installments-color]").val(),
				botaoCTA = $("select[name=vitrine-botao-cta]").val();

			let vitrineTemp = "",
				vitrineLinha = "",
				bannerTempTop = "",
				bannerTempMid = "",
				bannerTempBot = "",
				bannerTempMidInserted = 0;

			//banners
			$.each($("#banners > .form-group"), function (i) {
				let bannerimage = $(this).find("input[name=banner-image-" + i + "]").val(),
					bannerlocal = $(this).find("select[name=banner-local-" + i + "]").val(),
					bannerlink = $(this).find("input[name=banner-link-" + i + "]").val(),
					bannertitle = $(this).find("input[name=banner-title-" + i + "]").val();

				//Adiciona pararamentro na URL
				let reportEmail = "reportEmail=banner_" + bannerlocal + "_" + i;
				bannerlink = bannerlink + (bannerlink.indexOf("?") === -1 ? "?" : "&") + reportEmail;

				if (bannerimage) {
					if (bannerlocal === "top") {
						bannerTempTop += espaco + banner.replaceAll("BANNERLINK", bannerlink).replaceAll("BANNERALT", bannertitle).replaceAll("BANNERIMAGEM", bannerimage);
					}
					if (bannerlocal === "mid") {
						bannerTempMid += espaco + banner.replaceAll("BANNERLINK", bannerlink).replaceAll("BANNERALT", bannertitle).replaceAll("BANNERIMAGEM", bannerimage);
					}
					if (bannerlocal === "bot") {
						bannerTempBot += espaco + banner.replaceAll("BANNERLINK", bannerlink).replaceAll("BANNERALT", bannertitle).replaceAll("BANNERIMAGEM", bannerimage);
					}
				}
			});

			//vitrines & banner meio
			$.each($("#vitrines > .form-group"), function (i) {
				let vitrineName = $(this).find("input[name=vitrine-name-" + i + "]").val(),
					vitrineImage = $(this).find("input[name=vitrine-image-" + i + "]").val(),
					vitrineLink = $(this).find("input[name=vitrine-link-" + i + "]").val(),
					vitrinePriceP = $(this).find("input[name=vitrine-priceP-" + i + "]").val(),
					vitrinePriceN = $(this).find("input[name=vitrine-priceN-" + i + "]").val(),
					vitrineInstallments = $(this).find("input[name=vitrine-installments-" + i + "]").val(),
					vitrinePricing = $(this).find("select[name=vitrine-pricing-" + i + "]").val(),
					vitrineSeparator = "<img src=\"https://imagens.imgnet.com.br/puket/_2021/ECM/Header_Footer_2021/email-separador.png\" border=\"0\" width=\"20\" style=\"display: block;\">";


				if (vitrinePricing == 3) { //Nada
					vitrinePriceP = vitrinePriceN = vitrineInstallments = vitrinePricing = vitrineSeparator = "";

				} else if (vitrinePricing == 2) { //Porcentagem
					vitrinePriceN = parseFloat(vitrinePriceN.replaceAll("R$", "").trim());
					vitrinePriceP = parseFloat(vitrinePriceP.replaceAll("R$", "").trim());

					vitrinePriceN = `${(((vitrinePriceP - vitrinePriceN) / vitrinePriceP) * 100).toFixed(0)}% OFF`;
					vitrinePriceP = vitrineInstallments = vitrinePricing = "";

				}

				if (vitrineLinha.search("LINK") <= 0) {
					if (columns == 2) {
						vitrineLinha += vitrines2 + espaco;
					} else {
						vitrineLinha += vitrines + espaco;
					}
				}

				if (vitrineLinha.search("LINK1") > 0 && vitrineName != "") {
					vitrineLinha = vitrineLinha.replaceAll("NOME1", vitrineName).replaceAll("IMAGEM1", vitrineImage).replaceAll("LINK1", vitrineLink).replaceAll("DE1", vitrinePriceP).replaceAll("POR1", vitrinePriceN).replaceAll("PARCELAMENTO1", vitrineInstallments).replaceAll("DISPLAY1", "block").replaceAll("SEPARADOR1", vitrineSeparator);
				} else if (vitrineLinha.search("LINK2") > 0 && vitrineName != "") {
					vitrineLinha = vitrineLinha.replaceAll("NOME2", vitrineName).replaceAll("IMAGEM2", vitrineImage).replaceAll("LINK2", vitrineLink).replaceAll("DE2", vitrinePriceP).replaceAll("POR2", vitrinePriceN).replaceAll("PARCELAMENTO2", vitrineInstallments).replaceAll("DISPLAY2", "block").replaceAll("SEPARADOR2", vitrineSeparator);
				} else if (vitrineLinha.search("LINK3") > 0 && vitrineName != "") {
					vitrineLinha = vitrineLinha.replaceAll("NOME3", vitrineName).replaceAll("IMAGEM3", vitrineImage).replaceAll("LINK3", vitrineLink).replaceAll("DE3", vitrinePriceP).replaceAll("POR3", vitrinePriceN).replaceAll("PARCELAMENTO3", vitrineInstallments).replaceAll("DISPLAY3", "block").replaceAll("SEPARADOR3", vitrineSeparator);
				}

				if (((i == Math.floor($("#vitrines > .form-group").length / 2) - 1) || (i == 2 && $("#vitrines > .form-group").length <= 6)) && !bannerTempMidInserted) {
					vitrineLinha += bannerTempMid + espaco;
					bannerTempMidInserted = 1;
				}

			});

			vitrineTemp = vitrineLinha.replaceAll("CORDOPRECO", color).replaceAll("CORDOPRODUTO", textColor).replaceAll("BOTAOCTA", botaoCTA).replaceAll("CORINSTALLMENTS", installmentsColor);

			//Oculta vitrines sem produtos
			if (vitrineTemp.search("DISPLAY1") > 0) {
				vitrineTemp = vitrineTemp.replaceAll("DISPLAY1", "none");
			}
			if (vitrineTemp.search("DISPLAY2") > 0) {
				vitrineTemp = vitrineTemp.replaceAll("DISPLAY2", "none");
			}
			if (vitrineTemp.search("DISPLAY3") > 0) {
				vitrineTemp = vitrineTemp.replaceAll("DISPLAY3", "none");
			}

			//montagem de blocos
			html = html.replaceAll("SUBSTITUIR-PREHEADER", preheader).replaceAll("SUBSTITUIR-MENU", menu).replaceAll("SUBSTITUIR-BANNER-TOP", bannerTempTop).replaceAll("SUBSTITUIR-TITLE-VITRINE", vitrineTitle).replaceAll("SUBSTITUIR-VITRINES", vitrineTemp).replaceAll("SUBSTITUIR-BANNER-BAIXO", bannerTempBot).replaceAll("CORDOTITULOVITRINE", vitrineColorTitle).replaceAll("SUBSTITUIR-FOOTER", footer);
			$("#viewRenderedHTML").html(html);
			$("#viewHTMLCode").text(html);

		}
	});

	// Copia o código HTML gerado
	$("#copytext > .copy").on("click", function () {
		let code = $("#viewHTMLCode").val();

		copyText(code);
	});
});