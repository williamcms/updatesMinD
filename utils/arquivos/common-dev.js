//
// Código por William Di Biasi Bogik
// 
//
$(document).ready(function(){
	'use strict';

	var mountResults = $(document).on('click', '.getDetails', function(){
		let inputN = $(this).data('input'),
		ref = $('input[name=vitrine-'+ inputN +']').val(),
		product = {};
		
		$.ajax({
			accept: "application/vnd.vtex.ds.v10+json",
			contentType: 'application/json; charset=utf-8',
			crossDomain: false,
			type: 'GET',
			url: 'https://www.casamind.com.br/api/catalog_system/pub/products/search/?fq=alternateIds_RefId:' + ref
		}).done(function(e){
			//Pega o melhor parcelamento
			let prices = {},
			currencySymbol = 'R$ ';
			$.each(e.first().items.first().sellers.first().commertialOffer.Installments, function(x){
				if((this.Value < prices.Value || prices.Value == null) && (this.NumberOfInstallments > prices.NumberOfInstallments || prices.NumberOfInstallments == null)){
					prices = {
						'NumberOfInstallments' : this.NumberOfInstallments,
						'Value' : this.Value
					}
				}
			})
			//Pega os dados do produto
			product = {
				name: e.first().productName,
				priceP: currencySymbol + (e.first().items.first().sellers.first().commertialOffer.ListPrice).toFixed(2).replace(/\./, ","),
				priceN: currencySymbol + (e.first().items.first().sellers.first().commertialOffer.PriceWithoutDiscount).toFixed(2).replace(/\./, ","),
				installments: prices.NumberOfInstallments + 'x ' + currencySymbol + (prices.Value).toFixed(2).replace(/\./, ","),
				qty: e.first().items.first().sellers.first().commertialOffer.AvailableQuantity
			}
			console.log(product);
		});
	});
	var addField = $('.btn-add').on('click', function(){
		let referId = $(this).data('refer'),
		container = $('#' + referId),
		eFields = container.find('.form-group'),
		clone = eFields,
		html = clone[0].outerHTML;
		console.log(eFields.length, eFields.length + 1)
		html = html.replaceAll(1, eFields.length + 1).replaceAll(0, eFields.length);

		container.append($(html));

		console.log(html)

	});
	var mountHTML = $('#generateHTML').on('click', function(){
		let type = $('select[name=emailType]').val();
		console.log(type)

		if(type == 1){
			// news/foter - 1
			console.log('news');

		}else if(type == 0){
			console.log('vitrines');

			let html = '<!DOCTYPE html><html lang="br"><head><meta http-equiv="content-type" content="text/html; charset=utf-8"><meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><meta http-equiv="cleartype" content="on"/><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/><meta name="robots" content="noindex, nofollow"/><link rel="shortcut icon" href="https://lojapuket.vteximg.com.br/arquivos/favicon.ico"/><title>MinD</title></head><body><table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="font-family: ff-cocon-pro, Lucida Sans Unicode, Arial, sans-serif; font-weight: 100; color:#666666; background-color: #ffffff;" bgcolor="#ffffff"><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730" height="30"><tr><td>SUBSTITUIR-PREHEADER</td></tr></table></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730" bgcolor="#FFFFFF" style="background-color: transparent;"><tr><td style="width:324px"></td><td><a href="https://www.casamind.com.br/?ReportEmail=header_home" target="_blank"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ce3f6a25-b72e-4662-afd3-c45aa4fdc306/casamind/news_cab_rod_600px_mind_1.png" alt="Casa MinD" title="Casa MinD" width="100%" border="0" style="display:block;" align="center"></a></td><td style="width:324px"></td></tr></table></td></tr><tr style="height:13px"><td></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730" bgcolor="#FFFFFF" style="background-color: transparent;"><tr><td><a href="https://www.casamind.com.br/promocao?ReportEmail=header_promo" target="_blank" style="text-decoration:none;font-weight: 600;font-size: 1.2rem;color: #000000;text-transform: uppercase;"><span>Promo</span></a></td><td><a href="https://www.casamind.com.br/decoracao/VASOS-E-CACHEPOTS?O=OrderByTopSaleDESC&ReportEmail=header_vasosecachepots" target="_blank" style="text-decoration:none;font-weight: 600;font-size: 1.2rem;color: #000000;text-transform: uppercase;"><span>Vasos & Cachepots</span></a></td><td><a href="https://www.casamind.com.br/novidade?ReportEmail=header_novidades" target="_blank" style="text-decoration:none;font-weight: 600;font-size: 1.2rem;color: #000000;text-transform: uppercase;"><span>Novidades</span></a></td><td><a href="https://www.casamind.com.br/moveis2?O=OrderByTopSaleDESC?ReportEmail=header_moveis" target="_blank" style="text-decoration:none;font-weight: 600;font-size: 1.2rem;color: #000000;text-transform: uppercase;"><span>Móveis</span></a></td></tr></table></td></tr>SUBSTITUIR-BANNER-TOP<tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td height="24"></td></tr></table></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td align="center">SUBSTITUIR-TITLE-VITRINE</td></tr></table></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td height="24"></td></tr></table></td></tr>SUBSTITUIR-VITRINESSUBSTITUIR-BANNER-BAIXO<tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td height="24"></td></tr></table></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td><span style="font-size: 12px;"><a href="https://www.casamind.com.br/central-de-relacionamento" style="color: #e94273; text-decoration: none;">CENTRAL DE RELACIONAMENTO</a></span></td><td><div class="img-container center autowidth" align="right"><a href="https://www.instagram.com/casamindbr/" target="_blank"><img align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ce3f6a25-b72e-4662-afd3-c45aa4fdc306/casamind/news__ig_30px.png" style="max-width: 100%; display: inline-block; height: 31px; width: auto;" width="30" height="30" alt="Logo Instagram"></a><a href="https://www.facebook.com/casamind" style="margin-left: 9.166575px; width: 100%; height: 100%;" target="_blank"><img align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ce3f6a25-b72e-4662-afd3-c45aa4fdc306/casamind/news__fb_30px.png" style="text-decoration: none; border: 0; max-width: 100%; display: inline-block; height: 31px; width: auto;" width="30" height="30" alt="Logo Facebook"></a><a href="https://br.pinterest.com/casamind/" style="margin-left: 9.166575px; width: 100%; height: 100%;" target="_blank"><img align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ce3f6a25-b72e-4662-afd3-c45aa4fdc306/casamind/news__pin_30px.png" style="max-width: 100%; display: inline-block; height: 31px; width: auto;" width="30" height="30" alt="Logo Pinterest"></a><a href="https://open.spotify.com/user/haj0455ld4irud1xncxa0ho3p#_=_" style="margin-left: 9.166575px; width: 100%; height: 100%;" target="_blank"><img align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ce3f6a25-b72e-4662-afd3-c45aa4fdc306/casamind/news__spot_30px.png" style="max-width: 100%; display: inline-block; height: 31px; width: auto;" width="30" height="30" alt="Logo Spotify"></a></div></td></tr></table></td></tr><tr><td height="15"></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td style="height: 1px;border-top: 1px solid #000000;"></td><td style="height: 1px;border-top: 1px solid #000000;"></td></tr><tr><td height="5"></td></tr><tr><td><div style="font-size: 14px; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif;"><p style="margin:0"><span style="font-size: 10px;">APROVEITE O CUPOM&nbsp;<span style="background-color: #000000; color: #ffffff;"><strong>MIND10</strong></span><strong>&nbsp;</strong>E GANHE 10% OFF NAS LOJAS*</span></p><p style="font-size: 9px; line-height: 1; word-break: break-word; text-align: left; mso-line-height-alt: 12px; margin-top: 5px; margin-bottom: 0; color: #808080;font-style: italic;">*Cupom válido apenas nas lojas online</p></div></td><td><div class="img-container autowidth" align="right" style="padding-right: 0px; padding-left: 0px;"><a href="https://guten.com.br/" target="_blank"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ce3f6a25-b72e-4662-afd3-c45aa4fdc306/casamind/news__guten_maior.png" style="height: 13px; width: auto; max-width: 100%; display: inline-block;" width="58" height="13"></a> <a href="https://loja.imaginarium.com.br" target="_blank"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ce3f6a25-b72e-4662-afd3-c45aa4fdc306/casamind/news__img_maior.png" style="height: 17px; width: auto; padding-left: 5px; max-width: 100%; display: inline-block;" width="77" height="17"></a> <a href="https://www.lovebrands.com.br" target="_blank"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ce3f6a25-b72e-4662-afd3-c45aa4fdc306/casamind/news__love_maior.png" style="height: 21px; width: auto; padding-left: 5px; max-width: 100%; display: inline-block;" width="51" height="21"></a> <a href="https://www.puket.com.br/" target="_blank"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ce3f6a25-b72e-4662-afd3-c45aa4fdc306/casamind/news__puket_maior.png" style="height: 21px; width: auto; padding-left: 5px; max-width: 100%; display: inline-block;" width="56" height="21"></a></div></td></tr><tr><td height="5"></td></tr><tr><td style="height: 1px;border-bottom: 1px solid #000000;"></td><td style="height: 1px;border-bottom: 1px solid #000000;"></td></tr></table></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td><span style="font-size: 10px;">Você está incrito como&nbsp;<span style="color: #e94273; text-decoration: none;">*|EMAIL|*</span></span></td></tr><tr><td><span style="font-size: 10px;"><a href="https://www.casamind.com.br/account" style="color: #e94273; text-decoration: none;">Atualize suas informações</a>&nbsp;ou&nbsp;<a href="[unsubscribe]" style="color: #e94273; text-decoration: none;">descadastre-se</a></span></td><td><span style="font-size: 10px;"><a href="https://www.casamind.com.br/institucional/seguranca-e-privacidade" style="color: #e94273; text-decoration: none;">Política de privacidade</a></span></td></tr><tr><td><span style="font-size: 10px;">UNI.CO Comércio S/A. | CNPJ 00.399.603/0008-84</span></td></tr><tr><td><span style="font-size: 10px;">Rua Hélio Ossamu Daikuara, 1445 - Galpão 07A</span></td></tr><tr><td><span style="font-size: 10px;">CEP 06807-000, Jardim Vista Alegre, Embu das Artes - SP</span></td></tr><tr><td><span style="font-size: 10px;">© 2021&nbsp;<a style="color: #e94273; text-decoration: none;">casamind.com.br</a>. Todos os direitos reservados</span></td></tr></table></td></tr></table></body></html>',
			vitrines = ' <tr> <td> <table cellpadding="0" cellspacing="0" border="0" align="center" width="730"> <tr> <td> <a href="LINK1" title="NOME1" target="_blank"> <img src="IMAGEM1" alt="NOME1" border="0" style="display: block;" width="228"> </a> </td><td width="23"></td><td> <a href="LINK2" title="NOME2" target="_blank"> <img src="IMAGEM2" alt="NOME2" border="0" style="display: block;" width="228"> </a> </td><td width="23"></td><td> <a href="LINK3" title="NOME3" target="_blank"> <img src="IMAGEM3" alt="NOME3" border="0" style="display: block;" width="228"> </a> </td></tr><tr height="32"> <td></td><td width="23"></td><td></td><td width="23"></td><td></td></tr><tr> <td height="40" align="center" valign="top"> <a href="LINK1" title="NOME1" target="_blank1" style="text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;"> NOME1 </a> </td><td width="23"></td><td height="40" align="center" valign="top"> <a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;"> NOME2 </a> </td><td width="23"></td><td height="40" align="center" valign="top"> <a href="LINK3" title="NOME3" target="_blank" style="text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;"> NOME3 </a> </td></tr><tr height="16"> <td></td><td width="23"></td><td></td><td width="23"></td><td></td></tr><tr> <td> <table cellpadding="0" cellspacing="0" border="0" align="center"> <tr> <td> <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%"> <tr> <td> <a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px"> DE1 </a> </td></tr><tr> <td> <a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px"> POR1 </a> </td></tr><tr> <td> <a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:#838282; text-decoration:none; font-size:12px"> PARCELAMENTO1 </a> </td></tr></table> </td><td> <img src="https://imagens.imgnet.com.br/puket/_2021/ECM/Header_Footer_2021/email-separador.png" border="0" width="20" style="display: block;"> </td><td> <a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:none; font-size:12px"> <img src="https://imaginarium.vteximg.com.br/arquivos/MIND_EMAIL_Botoes_EU_QUERO.png" alt="eu quero" border="0" width="75" style="display: block;"> </a> </td></tr></table> </td><td width="23"></td><td> <table cellpadding="0" cellspacing="0" border="0" align="center"> <tr> <td> <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%"> <tr> <td> <a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px"> DE2 </a> </td></tr><tr> <td> <a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px"> POR2 </a> </td></tr><tr> <td> <a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:#838282; text-decoration:none; font-size:12px"> PARCELAMENTO2 </a> </td></tr></table> </td><td> <img src="https://imagens.imgnet.com.br/puket/_2021/ECM/Header_Footer_2021/email-separador.png" border="0" width="20" style="display: block;"> </td><td> <a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:none; font-size:12px"> <img src="https://imaginarium.vteximg.com.br/arquivos/MIND_EMAIL_Botoes_EU_QUERO.png" alt="eu quero" border="0" width="75" style="display: block;"> </a> </td></tr></table> </td><td width="23"></td><td> <table cellpadding="0" cellspacing="0" border="0" align="center"> <tr> <td> <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%"> <tr> <td> <a href="LINK3" title="NOME3" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px"> DE3 </a> </td></tr><tr> <td> <a href="LINK3" title="NOME3" target="_blank" style="text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px"> POR3 </a> </td></tr><tr> <td> <a href="LINK3" title="NOME3" target="_blank" style="text-align: center; color:#838282; text-decoration:none; font-size:12px"> PARCELAMENTO3 </a> </td></tr></table> </td><td> <img src="https://imagens.imgnet.com.br/puket/_2021/ECM/Header_Footer_2021/email-separador.png" border="0" width="20" style="display: block;"> </td><td> <a href="LINK3" title="NOME3" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:none; font-size:12px"> <img src="https://imaginarium.vteximg.com.br/arquivos/MIND_EMAIL_Botoes_EU_QUERO.png" alt="eu quero" border="0" width="75" style="display: block;"> </a> </td></tr></table> </td></tr></table> </td></tr><tr> <td> <table cellpadding="0" cellspacing="0" border="0" align="center" width="730"> <tr> <td height="24"></td></tr></table> </td></tr>',
			banner = '<tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td><a href="BANNERLINK" target="_blank"><img src="BANNERIMAGEM" alt="BANNERALT" title="BANNERALT" width="100%" border="0" style="display:block;" align="center"></a></td></tr></table></td></tr>';
			
			let vitrineTemp = '',
			bannerTempTop = '',
			bannerTempMid = '',
			bannerTempBot = '';

			//banners topo
			$.each($('#banners > .form-group'), function(i){
				let bannerimage = $(this).find('input[name=banner-image-'+ i +']').val(),
				bannerlink = $(this).find('input[name=banner-link-'+ i +']').val(),
				bannertitle = $(this).find('input[name=banner-title-'+ i +']').val(),
				bannerlocal = $(this).find('select[name=banner-local-'+ i +']').val();

				if(bannerlocal == 0){
					bannerTempTop += banner.replaceAll('BANNERLINK', bannerlink).replaceAll('BANNERALT', bannertitle).replaceAll('BANNERIMAGEM', bannerlocal);
				}else if(bannerlocal == 1){
					bannerTempMid += banner.replaceAll('BANNERLINK', bannerlink).replaceAll('BANNERALT', bannertitle).replaceAll('BANNERIMAGEM', bannerlocal);
				}else if(bannerlocal == 2){
					bannerTempBot += banner.replaceAll('BANNERLINK', bannerlink).replaceAll('BANNERALT', bannertitle).replaceAll('BANNERIMAGEM', bannerlocal);
				}
			});
			//vitrines & banner meio
			$.each($('#vitrines > .form-group'), function(i){
				let bannerimage = $(this).find('input[name=banner-image-'+ i +']').val(),
				bannerlink = $(this).find('input[name=banner-link-'+ i +']').val(),
				bannertitle = $(this).find('input[name=banner-title-'+ i +']').val(),
				bannerlocal = $(this).find('select[name=banner-local-'+ i +']').val();

				if(i == $('#vitrines > .form-group').length / 2){
					console.log('meio');
				}

				bannerTempTop += banner.replaceAll('BANNERLINK', bannerlink).replaceAll('BANNERALT', bannertitle).replaceAll('BANNERIMAGEM', bannerlocal);
			});

			//banners baixo

		}
	})
})