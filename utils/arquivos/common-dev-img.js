//
// Código por William Di Biasi Bogik
//
//

$(document).ready(function () {
  'use strict'

  // Addons
  if (typeof Array.prototype.first === 'undefined') {
    Object.defineProperty(Array.prototype, 'first', {
      value() {
        return this.find(e => true) // or this.find(Boolean)
      },
    })
  }

  const host = 'https://loja.imaginarium.com.br/';
  const replaceHost = (url, newHost) => { let u = new URL(url); u.host = new URL(newHost).host; return u.toString(); };

  var copyText = (copyText = text => {
    navigator.clipboard.writeText(text)
  })

  $('select[name=emailType]').on('change', function () {
    const type0 = $('.emailType-0')
    const type1 = $('.emailType-1')

    const selectedType = $(this).find('option:selected').val()

    if (selectedType == 0) {
      type0.slideDown()
      type1.slideUp()
    } else if (selectedType == 1) {
      type0.slideUp()
      type1.slideDown()
    }
    // Limpa o HTML renderizado
    $('#viewRenderedHTML').empty()
    $('#viewHTMLCode').empty()
  })

  $(document).on('click', '#vitrines .getDetails', function () {
    const inputN = $(this).data('input')
    const ref = $(`input[name=vitrine-${inputN}]`).val()
    let product = {}

    $.ajax({
      accept: 'application/vnd.vtex.ds.v10+json',
      contentType: 'application/json; charset=utf-8',
      crossDomain: false,
      type: 'GET',
      url: `/api/catalog_system/pub/products/search/?fq=alternateIds_RefId:${ref}`,
    }).done(function (e) {
      // Pega o melhor parcelamento
      let prices = {}
      const currencySymbol = 'R$ '
      $.each(
        e.first().items.first().sellers.first().commertialOffer.Installments,
        function (x) {
          if (
            (this.Value < prices.Value || prices.Value == null) &&
            (this.NumberOfInstallments > prices.NumberOfInstallments ||
              prices.NumberOfInstallments == null)
          ) {
            prices = {
              NumberOfInstallments: this.NumberOfInstallments,
              Value: this.Value,
            }
          }
        }
      )

      // Pega os dados do produto
      product = {
        name:
          $.trim(e.first().productName.slice(0, 40)) +
          (e.first().productName.length > 40 ? '...' : ''),
        priceP:
          currencySymbol +
          e
            .first()
            .items.first()
            .sellers.first()
            .commertialOffer.ListPrice.toFixed(2)
            .replace(/\./, ','),
        priceN:
          currencySymbol +
          e
            .first()
            .items.first()
            .sellers.first()
            .commertialOffer.PriceWithoutDiscount.toFixed(2)
            .replace(/\./, ','),
        installments: `${
          prices.NumberOfInstallments
        }x ${currencySymbol}${prices.Value.toFixed(2).replace(/\./, ',')}`,
        qty: e.first().items.first().sellers.first().commertialOffer
          .AvailableQuantity,
        image: e.first().items.first().images.first().imageUrl,
        link: e.first().link,
      }

      // Remove priceP se os preços forem iguais (não há desconto)
      if (product.priceP === product.priceN) {
        product.priceP = ''
      }

      if ($(`.row.newFields[data-input=${inputN}]`).length >= 1) {
        $('.row.newFields')
          .find(`input[name=vitrine-name-${inputN}]`)
          .val(product.name)
        $('.row.newFields')
          .find(`input[name=vitrine-priceP-${inputN}]`)
          .val(product.priceP)
        $('.row.newFields')
          .find(`input[name=vitrine-priceN-${inputN}]`)
          .val(product.priceN)
        $('.row.newFields')
          .find(`input[name=vitrine-installments-${inputN}]`)
          .val(product.installments)
        $('.row.newFields')
          .find(`input[name=vitrine-link-${inputN}]`)
          .val(`${replaceHost(product.link, host)}?reportEmail=produto_${inputN}`)
        $('.row.newFields')
          .find(`input[name=vitrine-image-${inputN}]`)
          .val(product.image.replace(/\d+/g, '$&-290-435'))
        $('.row.newFields')
          .find(`input[name=vitrine-qty-${inputN}]`)
          .val(product.qty)
      }

      $('#vitrines')
        .find(`a.getDetails[data-input=${inputN}]`)
        .removeClass('change')
      $('#vitrines')
        .find(`a.getDetails[data-input=${inputN}]`)
        .addClass('complete')
    })
  })

  $(document).on('click', '#product .getDetails', function () {
    const inputN = $(this).data('input')
    const ref = $(`input[name=produto-${inputN}]`).val()
    let product = {}

    $.ajax({
      accept: 'application/vnd.vtex.ds.v10+json',
      contentType: 'application/json; charset=utf-8',
      crossDomain: false,
      type: 'GET',
      url: `/api/catalog_system/pub/products/search/?fq=alternateIds_RefId:${ref}`,
    }).done(function (e) {
      // Pega os dados do produto
      product = {
        name:
          $.trim(e.first().productName.slice(0, 40)) +
          (e.first().productName.length > 40 ? '...' : ''),
        qty: 1,
        instock: e.first().items.first().sellers.first().commertialOffer
          .AvailableQuantity,
        sku: e.first().items.first().itemId,
        seller: e.first().items.first().sellers.first().sellerId,
      }

      if ($(`.row.newFields[data-input=${inputN}]`).length >= 1) {
        $('.row.newFields')
          .find(`input[name=product-name-${inputN}]`)
          .val(product.name)
        $('.row.newFields')
          .find(`input[name=product-qty-${inputN}]`)
          .val(product.qty)
        $('.row.newFields')
          .find(`input[name=product-sku-${inputN}]`)
          .val(product.sku)
        $('.row.newFields')
          .find(`input[name=product-qty-instock-${inputN}]`)
          .val(product.instock)
        $('.row.newFields')
          .find(`input[name=product-seller-${inputN}]`)
          .val(product.seller)
      }

      $('#vitrines')
        .find(`a.getDetails[data-input=${inputN}]`)
        .removeClass('change')
      $('#vitrines')
        .find(`a.getDetails[data-input=${inputN}]`)
        .addClass('complete')
    })
  })

  $(document).on('change keyup paste', '#vitrines input', function () {
    $('#vitrines')
      .find(`a.getDetails[data-input=${$(this).data('input')}]`)
      .removeClass('complete')
    $('#vitrines')
      .find(`a.getDetails[data-input=${$(this).data('input')}]`)
      .addClass('change')
  })

  $('.btn-add').on('click', function () {
    const referId = $(this).data('refer')
    const container = $(`#${referId}`)
    const eFields = container.find('.form-group')
    const clone = eFields
    let html = clone[0].outerHTML
    html = html.replaceAll(1, eFields.length + 1).replaceAll(0, eFields.length)

    container.append($(html))
  })

  $(document).on('click', '.btn-remove', function () {
    const referInput = $(this).data('input')
    const referId = $(this).data('refer')

    $(`#${referId} > .form-group`)[referInput].remove()
  })

  $('#generateHTML').on('click', function () {
    const type = $('select[name=emailType]').val()

    if (type == 1) {
      // news/foter - 1
      let html =
        '<!DOCTYPE html><html lang="br"><head><meta http-equiv="content-type" content="text/html; charset=utf-8"><meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><meta http-equiv="cleartype" content="on"/><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/><meta name="robots" content="noindex, nofollow"/><link rel="shortcut icon" href="https://lojapuket.vteximg.com.br/arquivos/favicon.ico"/><title>Imaginarium</title></head><body><table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="font-family: ff-cocon-pro, Lucida Sans Unicode, Arial, sans-serif; font-weight: 100; color:#666666; background-color: #ffffff;" bgcolor="#ffffff"><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730" height="30"><tr><td align="left">SUBSTITUIR-PREHEADER</td><td align="right"><a href="SUBSTITUIR-VERONLINE" target="_blank" style="color:#666666; text-decoration: none;">Ver Online</a></td></tr></table></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730" bgcolor="#FFFFFF" style="background-color: transparent;">SUBSTITUIR-MENU</table></td></tr><tr><td>SUBSTITUIR-BANNER</td></tr><tr><td>SUBSTITUIR-FOOTER</td></tr></table></body></html>'
      const menu =
        '<tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td><a href="https://loja.imaginarium.com.br/mais-vendidos?order=OrderByReleaseDateDESC&?reportEmail=header_novidades" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout1.png" alt="tem novidade aqui" width="100%" border="0" style="display:block;width:100%;" align="center"> </a></td><td><a href="https://www.imaginarium.com.br/?ReportEmail=header_home" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout2.png" alt="Imaginarium" width="100%" border="0" style="display:block;width:100%" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/institucional/nossas-lojas?ReportEmail=header_lojas" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout3.png" alt="encontre uma loja" width="100%" border="0" style="display:block;width:100%;" align="center"> </a></td></tr></table></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td><a href="https://loja.imaginarium.com.br/promocional?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout4.png" alt="descontos imaginarium" width="100%" border="0" style="display:block;" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/decor?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout5.png" alt="casa e decor imaginarium" width="100%" border="0" style="display:block;" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/bar-e-cozinha?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout6.png" alt="imaginarium bar e cozinha" width="100%" border="0" style="display:block;" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/pra-voce/mochilas?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout7.png" alt="mochilas" width="100%" border="0" style="display:block;" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/pra-voce/bolsas?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout8.png" alt="bolsas" width="100%" border="0" style="display:block;" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/harry%20potter?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout9.png" alt="Harry Potter" width="100%" border="0" style="display:block;" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/harry%20potter?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout10.png" alt="Harry Potter" width="100%" border="0" style="display:block;" align="center"> </a></td></tr></table></td></tr>'
      const footer =
        '<tr> <td> <table cellpadding="0" cellspacing="0" border="0" align="center" width="730"> <tr> <td height="32"></td> </tr> </table> </td> </tr> <tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr style="background-image: linear-gradient(#ffffff,#ffffff);"><td><a href="https://loja.imaginarium.com.br/institucional/regulamentos" target="https://loja.imaginarium.com.br/institucional/regulamentos?ReportEmail=footer_beneficios"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout12.png"alt="Entrega" width="100%" border="0" style="display:block;width:100%;" align="center"> </a></td><td><a href="https://linktr.ee/sigaimaginarium" target="https://linktr.ee/imaginarium_email"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout13.png" alt="Entrega" width="100%" border="0" style="display:block;width:100%;" align="center"> </a></td></tr></table></td></tr> <tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr style="background-image: linear-gradient(#ffffff,#ffffff);"><td style="padding: 5px 10px;max-width: 730px;font-size: 12px; font-family: Muli, sans-serif; line-height:12px; text-align: center; color: #888888; max-width: 730px" class="x-gmail-data-detectors"><font class="rfm" style="font-family: Muli, sans-serif; font-size:10px; color:#666666; max-width: 730px"> <a style="text-decoration:none;color:#ff129e" href="[unsubscribe]"></a><br><br>Não fique de fora!! Adicione o endereço <a href="mailto:imgnews@mkt.imaginarium.com.br" style="text-decoration:none; color:#f2008b" target="_blank">contato@mkt.imaginarium.com.br </a> em sua lista de remetentes confiáveis para garantir que as nossas mensagens e ofertas cheguem à sua caixa de e-mails. Você está recebendo este email através da assinatura em nosso site.<br><br>A imaginarium respeita a sua privacidade e opinião. Caso queira deixar de receber os nossos e-mails <a href="[unsubscribe]"text-decoration:none; color:#888888" target="_blank"> <br><a style="text-decoration:none;color:#ff129e" href="[unsubscribe]">descadastre-se aqui.</a> Ao solicitar o cancelamento, pode-se levar até três dias úteis para atualização da solicitação em nosso sistema.<br><br><br><b><a target="_blank">Informações:</a></b> <br><br>*Preços sujeitos à alterações e exclusivos para este canal de comunicação. Para ativação de determinados descontos é necessário a inserção do código promocional enviado no email. Caso haja diferença de preço ou descrição de produto, a condição válida e praticada é a presente no site. *O pagamento pode ser à vista ou parcelado em até 06 vezes sem juros, sujeito à política comercial. <br><br><b><a target="_blank">Nosso endereço:</a></b> <br><br>Av. Doutor Cardoso de Melo, 1855 - Vila Olímpia - São Paulo/SP - CEP 04548-005 - CNPJ: 00.399.603/0001-08<br><br> <br>Consulte nossa <a href="https://ms.imgnet.com.br/privacy/" style="text-decoration:none; color:#f2008b" target="_blank">Política de Privacidade</a> para mais informações. <br>Este e-mail foi mandado por imaginarium </a> </font></td></tr></table></td></td>'
      const banner =
        '<div class="img-container center autowidth big" align="center" style="padding-right: 0px; padding-left: 0px;"><a href="BANNERLINK" title="BANNERALT"><img class="center autowidth" align="center" border="0" src="BANNERIMAGEM" alt="BANNERALT" title="BANNERALT" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 730px; max-width: 100%; display: block;" width="730" /></a><p style="font-family: ff-cocon-pro, sans-serif; font-size:11px;font-weight: 100; color:#787878; text-decoration: none;margin-bottom:16px">BANNERTEXT</p></div>'
      const veronline = $('input[name=veronline]').val()
      const preheader = $('input[name=preheader]').val()
      let bannerTemp = ''

      $.each($('#bannerstopfooter > .form-group'), function (i) {
        const bannerimage = $(this).find(`input[name=banners-image-${i}]`).val()
        const bannerlink = $(this).find(`input[name=banners-link-${i}]`).val()
        const bannertitle = $(this).find(`input[name=banners-title-${i}]`).val()
        const bannertext = $(this).find(`input[name=banners-text-${i}]`).val()

        bannerTemp += banner
          .replaceAll('BANNERLINK', bannerlink)
          .replaceAll('BANNERALT', bannertitle)
          .replaceAll('BANNERIMAGEM', bannerimage)
          .replaceAll('BANNERTEXT', bannertext)
      })

      html = html
        .replaceAll('SUBSTITUIR-PREHEADER', preheader)
        .replaceAll('SUBSTITUIR-VERONLINE', veronline)
        .replaceAll('SUBSTITUIR-BANNER', bannerTemp)
        .replaceAll('SUBSTITUIR-MENU', menu)
        .replaceAll('SUBSTITUIR-FOOTER', footer)
      $('#viewRenderedHTML').html(html)
      $('#viewHTMLCode').text(html)
    } else if (type == 0) {
      // vitrines
      let html =
        '<!DOCTYPE html><html lang="br"><head><meta http-equiv="content-type" content="text/html; charset=utf-8"><meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><meta http-equiv="cleartype" content="on"/><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/><meta name="robots" content="noindex, nofollow"/><link rel="shortcut icon" href="https://lojapuket.vteximg.com.br/arquivos/favicon.ico"/><title>Imaginarium</title></head><body><table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="font-family: ff-cocon-pro, Lucida Sans Unicode, Arial, sans-serif; font-weight: 100; color:#666666; background-color: #ffffff;" bgcolor="#ffffff"><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730" height="30"><tr><td align="left">SUBSTITUIR-PREHEADER</td><td align="right"><a href="SUBSTITUIR-VERONLINE" style="color:#666666; text-decoration: none;">Ver Online</a></td></tr></table></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730" bgcolor="#FFFFFF" style="background-color: transparent;">SUBSTITUIR-MENU</table></td></tr>SUBSTITUIR-BANNER-TOP<tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td height="24"></td></tr></table></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td align="center"><font style="color: CORDOTITULOVITRINE;font-size: 24px;text-decoration: none;font-weight: bold;">SUBSTITUIR-TITLE-VITRINE</font></td></tr></table></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td height="24"></td></tr></table></td></tr>SUBSTITUIR-VITRINES SUBSTITUIR-BANNER-BAIXO<tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td height="24"></td></tr></table></td></tr>SUBSTITUIR-FOOTER</table></body></html>'
      const menu =
        '<tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td><a href="https://loja.imaginarium.com.br/mais-vendidos?order=OrderByReleaseDateDESC?&reportEmail=header_novidades" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout1.png" alt="tem novidade aqui" width="100%" border="0" style="display:block;width:100%;" align="center"> </a></td><td><a href="https://www.imaginarium.com.br/?ReportEmail=header_home"target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout2.png" alt="Imaginarium" width="100%" border="0" style="display:block;width:100%" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/institucional/nossas-lojas?ReportEmail=header_lojas" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout3.png" alt="encontre uma loja" width="100%" border="0" style="display:block;width:100%;" align="center"> </a></td></tr></table></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td><a href="https://loja.imaginarium.com.br/promocional?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout4.png" alt="descontos imaginarium" width="100%" border="0" style="display:block;" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/decor?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout5.png" alt="casa e decor imaginarium" width="100%" border="0" style="display:block;" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/bar-e-cozinha?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout6.png" alt="imaginarium bar e cozinha" width="100%" border="0" style="display:block;" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/pra-voce/mochilas?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout7.png" alt="mochilas" width="100%" border="0" style="display:block;" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/pra-voce/bolsas?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout8.png" alt="bolsas" width="100%" border="0" style="display:block;" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/harry%20potter?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout9.png" alt="Harry Potter" width="100%" border="0" style="display:block;" align="center"> </a></td><td><a href="https://loja.imaginarium.com.br/harry%20potter?ReportEmail=header" target="_blank"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout10.png" alt="Harry Potter" width="100%" border="0" style="display:block;" align="center"> </a></td></tr></table></td></tr>'
      const vitrines =
        '<tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tbody><tr><td style="display:DISPLAY1"> <a href="LINK1" title="NOME1" target="_blank"> <img src="IMAGEM1" alt="NOME1" border="0" style="display: block;margin:0 auto;" width="228"> </a> </td><td width="23"></td><td style="display:DISPLAY2"> <a href="LINK2" title="NOME2" target="_blank"> <img src="IMAGEM2" alt="NOME2" border="0" style="display: block;margin:0 auto;" width="228"> </a> </td><td width="23"></td><td style="display:DISPLAY3"> <a href="LINK3" title="NOME3" target="_blank"> <img src="IMAGEM3" alt="NOME3" border="0" style="display: block;margin:0 auto;" width="228"> </a> </td></tr><tr height="32"><td></td><td width="23"></td><td></td><td width="23"></td><td></td></tr><tr><td height="50" align="center" valign="top" style="display:DISPLAY1"> <a href="LINK1" title="NOME1" target="_blank1" style="text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;"> NOME1 </a> </td><td width="23"></td><td height="50" align="center" valign="top" style="display:DISPLAY2"> <a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;"> NOME2 </a> </td><td width="23"></td><td height="50" align="center" valign="top" style="display:DISPLAY3"> <a href="LINK3" title="NOME3" target="_blank" style="text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;"> NOME3 </a> </td></tr><tr height="16"><td></td><td width="23"></td><td></td><td width="23"></td><td></td></tr><tr><td style="display:DISPLAY1"><table style="margin:0 auto;" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="100%"><tbody><tr><td> <a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px"> DE1 </a> </td></tr><tr><td> <a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px"> POR1 </a> </td></tr><tr><td> <a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:CORINSTALLMENTS; text-decoration:none; font-size:12px"> PARCELAMENTO1 </a> </td></tr></tbody></table></td><td> <img src="https://imagens.imgnet.com.br/puket/_2021/ECM/Header_Footer_2021/email-separador.png" border="0" width="20" style="display: block;"> </td><td> <a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:none; font-size:12px"> <img src="BOTAOCTA" alt="eu quero" border="0" style="display: block;"> </a> </td></tr></tbody></table></td><td width="23"></td><td style="display:DISPLAY2"><table style="margin:0 auto;" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="100%"><tbody><tr><td> <a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px"> DE2 </a> </td></tr><tr><td> <a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px"> POR2 </a> </td></tr><tr><td> <a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:CORINSTALLMENTS; text-decoration:none; font-size:12px"> PARCELAMENTO2 </a> </td></tr></tbody></table></td><td> <img src="https://imagens.imgnet.com.br/puket/_2021/ECM/Header_Footer_2021/email-separador.png" border="0" width="20" style="display: block;"> </td><td> <a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:none; font-size:12px"> <img src="BOTAOCTA" alt="eu quero" border="0" style="display: block;"> </a> </td></tr></tbody></table></td><td width="23"></td><td style="display:DISPLAY3"><table style="margin:0 auto;" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="100%"><tbody><tr><td> <a href="LINK3" title="NOME3" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px"> DE3 </a> </td></tr><tr><td> <a href="LINK3" title="NOME3" target="_blank" style="text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px"> POR3 </a> </td></tr><tr><td> <a href="LINK3" title="NOME3" target="_blank" style="text-align: center; color:CORINSTALLMENTS; text-decoration:none; font-size:12px"> PARCELAMENTO3 </a> </td></tr></tbody></table></td><td> <img src="https://imagens.imgnet.com.br/puket/_2021/ECM/Header_Footer_2021/email-separador.png" border="0" width="20" style="display: block;"> </td><td> <a href="LINK3" title="NOME3" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:none; font-size:12px"> <img src="BOTAOCTA" alt="eu quero" border="0" style="display: block;"> </a> </td></tr></tbody></table></td></tr></tbody></table></td></tr>'
      const vitrines2 =
        '<tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tbody><tr><td width="65"></td><td style="display:DISPLAY1"><a href="LINK1" title="NOME1" target="_blank"><img src="IMAGEM1" alt="NOME1" border="0" style="display: block;margin:0 auto;" width="288"></a></td><td width="24"></td><td style="display:DISPLAY2"><a href="LINK2" title="NOME2" target="_blank"><img src="IMAGEM2" alt="NOME2" border="0" style="display: block;margin:0 auto;" width="288"></a></td><td width="65"></td></tr><tr height="16"><td width="65"></td><td></td><td width="24"></td><td></td><td width="65"></td></tr><tr><td width="65"></td><td height="50" align="center" valign="top" style="display:DISPLAY1"><a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;">NOME1</a></td><td width="24"></td><td height="50" align="center" valign="top" style="display:DISPLAY2"><a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:CORDOPRODUTO; text-decoration:none; font-size: 18px; font-weight: bold;">NOME2</a></td><td width="65"></td></tr><tr height="16"><td width="65"></td><td></td><td width="24"></td><td></td><td width="65"></td></tr><tr><td width="65"></td><td style="display:DISPLAY1"><table style="margin:0 auto;" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="100%"><tbody><tr><td><a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px">DE1</a></td></tr><tr><td><a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px">POR1</a></td></tr><tr><td><a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:CORINSTALLMENTS; text-decoration:none; font-size:12px">PARCELAMENTO1</a></td></tr></tbody></table></td><td><img src="https://imagens.imgnet.com.br/puket/_2021/ECM/Header_Footer_2021/email-separador.png" border="0" width="20" style="display: block;"></td><td><a href="LINK1" title="NOME1" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:none; font-size:12px"><img src="BOTAOCTA" alt="eu quero" border="0" style="display: block;"></a></td></tr></tbody></table></td><td width="24"></td><td style="display:DISPLAY2"><table style="margin:0 auto;" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="100%"><tbody><tr><td><a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:line-through; font-size:12px">DE2</a></td></tr><tr><td><a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:CORDOPRECO; text-decoration:none; font-weight: bold; font-size:24px">POR2</a></td></tr><tr><td><a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:CORINSTALLMENTS; text-decoration:none; font-size:12px">PARCELAMENTO2</a></td></tr></tbody></table></td><td><img src="https://imagens.imgnet.com.br/puket/_2021/ECM/Header_Footer_2021/email-separador.png" border="0" width="20" style="display: block;"></td><td><a href="LINK2" title="NOME2" target="_blank" style="text-align: center; color:#4D4D44; text-decoration:none; font-size:12px"><img src="BOTAOCTA" alt="eu quero" border="0" style="display: block;"></a></td></tr></tbody></table></td><td width="65"></td></tr></tbody></table></td></tr>'
      const espaco =
        ' <tr> <td> <table cellpadding="0" cellspacing="0" border="0" align="center" width="730"> <tr> <td height="24"></td> </tr> </table> </td> </tr> '
      const banner =
        '<tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr><td><a href="BANNERLINK" target="_blank"><img src="BANNERIMAGEM" alt="BANNERALT" title="BANNERALT" width="100%" border="0" style="display:block;width:100%;max-width:100%;" align="center"></a></td></tr></table></td></tr>'
      const footer =
        '<tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr style="background-image: linear-gradient(#ffffff,#ffffff);"><td><a href="https://loja.imaginarium.com.br/institucional/regulamentos" target="https://loja.imaginarium.com.br/institucional/regulamentos?ReportEmail=footer_beneficios"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout12.png"alt="Entrega" width="100%" border="0" style="display:block;width:100%;" align="center"> </a></td><td><a href="https://linktr.ee/sigaimaginarium" target="https://linktr.ee/imaginarium_email"> <img src="https://imaginarium.vteximg.com.br/arquivos/20220128_layout13.png" alt="Entrega" width="100%" border="0" style="display:block;width:100%;" align="center"> </a></td></tr></table></td></tr> <tr><td><table cellpadding="0" cellspacing="0" border="0" align="center" width="730"><tr style="background-image: linear-gradient(#ffffff,#ffffff);"><td style="padding: 5px 10px;max-width: 730px;font-size: 12px; font-family: Muli, sans-serif; line-height:12px; text-align: center; color: #888888; max-width: 730px" class="x-gmail-data-detectors"><font class="rfm" style="font-family: Muli, sans-serif; font-size:10px; color:#666666; max-width: 730px"> <a style="text-decoration:none;color:#ff129e" href="[unsubscribe]"></a><br><br>Não fique de fora!! Adicione o endereço <a href="mailto:imgnews@mkt.imaginarium.com.br" style="text-decoration:none; color:#f2008b" target="_blank">contato@mkt.imaginarium.com.br </a> em sua lista de remetentes confiáveis para garantir que as nossas mensagens e ofertas cheguem à sua caixa de e-mails. Você está recebendo este email através da assinatura em nosso site.<br><br>A imaginarium respeita a sua privacidade e opinião. Caso queira deixar de receber os nossos e-mails <a href="[unsubscribe]"text-decoration:none; color:#888888" target="_blank"> <br><a style="text-decoration:none;color:#ff129e" href="[unsubscribe]">descadastre-se aqui.</a> Ao solicitar o cancelamento, pode-se levar até três dias úteis para atualização da solicitação em nosso sistema.<br><br><br><b><a target="_blank">Informações:</a></b> <br><br>*Preços sujeitos à alterações e exclusivos para este canal de comunicação. Para ativação de determinados descontos é necessário a inserção do código promocional enviado no email. Caso haja diferença de preço ou descrição de produto, a condição válida e praticada é a presente no site. *O pagamento pode ser à vista ou parcelado em até 06 vezes sem juros, sujeito à política comercial. <br><br><b><a target="_blank">Nosso endereço:</a></b> <br><br>Av. Doutor Cardoso de Melo, 1855 - Vila Olímpia - São Paulo/SP - CEP 04548-005 - CNPJ: 00.399.603/0001-08<br><br> <br>Consulte nossa <a href="https://ms.imgnet.com.br/privacy/" style="text-decoration:none; color:#f2008b" target="_blank">Política de Privacidade</a> para mais informações. <br>Este e-mail foi mandado por imaginarium </a> </font></td></tr></table></td></td>'
      const preheader = $('input[name=preheader]').val()
      const veronline = $('input[name=veronline]').val()
      const vitrineTitle = $('input[name=vitrine-title]').val()
      const columns = $('select[name=vitrine-column-number]').val()
      const vitrineColorTitle = $('input[name=vitrine-title-color]').val()
      const color = $('input[name=vitrine-price-color]').val()
      const textColor = $('input[name=vitrine-text-color]').val()
      const installmentsColor = $(
        'input[name=vitrine-installments-color]'
      ).val()
      const botaoCTA = $('select[name=vitrine-botao-cta]').val()

      let vitrineTemp = ''
      let vitrineLinha = ''
      let bannerTempTop = ''
      let bannerTempMid = ''
      let bannerTempBot = ''
      let bannerTempMidInserted = 0

      // banners
      $.each($('#banners > .form-group'), function (i) {
        const bannerimage = $(this).find(`input[name=banner-image-${i}]`).val()
        const bannerlocal = $(this).find(`select[name=banner-local-${i}]`).val()
        const bannerlink = `${$(this)
          .find(`input[name=banner-link-${i}]`)
          .val()}?reportEmail=banner_${bannerlocal}_${i}`
        const bannertitle = $(this).find(`input[name=banner-title-${i}]`).val()

        if (bannerimage) {
          if (bannerlocal === 'top') {
            bannerTempTop +=
              espaco +
              banner
                .replaceAll('BANNERLINK', bannerlink)
                .replaceAll('BANNERALT', bannertitle)
                .replaceAll('BANNERIMAGEM', bannerimage)
          }
          if (bannerlocal === 'mid') {
            bannerTempMid +=
              espaco +
              banner
                .replaceAll('BANNERLINK', bannerlink)
                .replaceAll('BANNERALT', bannertitle)
                .replaceAll('BANNERIMAGEM', bannerimage)
          }
          if (bannerlocal === 'bot') {
            bannerTempBot +=
              espaco +
              banner
                .replaceAll('BANNERLINK', bannerlink)
                .replaceAll('BANNERALT', bannertitle)
                .replaceAll('BANNERIMAGEM', bannerimage)
          }
        }
      })
      // vitrines & banner meio
      $.each($('#vitrines > .form-group'), function (i) {
        const vitrineName = $(this).find(`input[name=vitrine-name-${i}]`).val()
        const vitrineImage = $(this)
          .find(`input[name=vitrine-image-${i}]`)
          .val()
        const vitrineLink = $(this).find(`input[name=vitrine-link-${i}]`).val()
        const vitrinePriceP = $(this)
          .find(`input[name=vitrine-priceP-${i}]`)
          .val()
        const vitrinePriceN = $(this)
          .find(`input[name=vitrine-priceN-${i}]`)
          .val()
        const vitrineInstallments = $(this)
          .find(`input[name=vitrine-installments-${i}]`)
          .val()

        if (vitrineLinha.search('LINK') <= 0) {
          if (columns == 2) {
            vitrineLinha += vitrines2 + espaco
          } else {
            vitrineLinha += vitrines + espaco
          }
        }

        if (vitrineLinha.search('LINK1') > 0 && vitrineName != '') {
          vitrineLinha = vitrineLinha
            .replaceAll('NOME1', vitrineName)
            .replaceAll('IMAGEM1', vitrineImage)
            .replaceAll('LINK1', vitrineLink)
            .replaceAll('DE1', vitrinePriceP)
            .replaceAll('POR1', vitrinePriceN)
            .replaceAll('PARCELAMENTO1', vitrineInstallments)
            .replaceAll('DISPLAY1', 'block')
        } else if (vitrineLinha.search('LINK2') > 0 && vitrineName != '') {
          vitrineLinha = vitrineLinha
            .replaceAll('NOME2', vitrineName)
            .replaceAll('IMAGEM2', vitrineImage)
            .replaceAll('LINK2', vitrineLink)
            .replaceAll('DE2', vitrinePriceP)
            .replaceAll('POR2', vitrinePriceN)
            .replaceAll('PARCELAMENTO2', vitrineInstallments)
            .replaceAll('DISPLAY2', 'block')
        } else if (vitrineLinha.search('LINK3') > 0 && vitrineName != '') {
          vitrineLinha = vitrineLinha
            .replaceAll('NOME3', vitrineName)
            .replaceAll('IMAGEM3', vitrineImage)
            .replaceAll('LINK3', vitrineLink)
            .replaceAll('DE3', vitrinePriceP)
            .replaceAll('POR3', vitrinePriceN)
            .replaceAll('PARCELAMENTO3', vitrineInstallments)
            .replaceAll('DISPLAY3', 'block')
        }

        if (
          (i == Math.floor($('#vitrines > .form-group').length / 2) - 1 ||
            (i == 2 && $('#vitrines > .form-group').length <= 6)) &&
          !bannerTempMidInserted
        ) {
          vitrineLinha += bannerTempMid + espaco
          bannerTempMidInserted = 1
        }
      })

      vitrineTemp = vitrineLinha
        .replaceAll('CORDOPRECO', color)
        .replaceAll('CORDOPRODUTO', textColor)
        .replaceAll('BOTAOCTA', botaoCTA)
        .replaceAll('CORINSTALLMENTS', installmentsColor)

      // Oculta vitrines sem produtos
      if (vitrineTemp.search('DISPLAY1') > 0) {
        vitrineTemp = vitrineTemp.replaceAll('DISPLAY1', 'none')
      }
      if (vitrineTemp.search('DISPLAY2') > 0) {
        vitrineTemp = vitrineTemp.replaceAll('DISPLAY2', 'none')
      }
      if (vitrineTemp.search('DISPLAY3') > 0) {
        vitrineTemp = vitrineTemp.replaceAll('DISPLAY3', 'none')
      }

      // montagem de blocos
      html = html
        .replaceAll('SUBSTITUIR-PREHEADER', preheader)
        .replaceAll('SUBSTITUIR-VERONLINE', veronline)
        .replaceAll('SUBSTITUIR-MENU', menu)
        .replaceAll('SUBSTITUIR-BANNER-TOP', bannerTempTop)
        .replaceAll('SUBSTITUIR-TITLE-VITRINE', vitrineTitle)
        .replaceAll('SUBSTITUIR-VITRINES', vitrineTemp)
        .replaceAll('SUBSTITUIR-BANNER-BAIXO', bannerTempBot)
        .replaceAll('CORDOTITULOVITRINE', vitrineColorTitle)
        .replaceAll('SUBSTITUIR-FOOTER', footer)
      $('#viewRenderedHTML').html(html)
      $('#viewHTMLCode').text(html)
    }
  })
  $('#generateLINK').on('click', function () {
    let cartLink = 'https://loja.imaginarium.com.br/checkout/cart/add?'
    $.each($('#product > .form-group'), function (i) {
      const productQty = $(this).find(`input[name=product-qty-${i}]`).val()
      const productSku = $(this).find(`input[name=product-sku-${i}]`).val()
      const productSeller = $(this)
        .find(`input[name=product-seller-${i}]`)
        .val()

      if (productSku == '' || productQty == '' || productSeller == '') return 0
      cartLink += `${
        i === 0 ? '' : '&'
      }sku=${productSku}&qty=${productQty}&seller=${productSeller}&redirect=true&sc=1`
    })
    $('#viewHTMLCode').val(cartLink)
  })

  $('#copytext > .copy').on('click', function () {
    const code = $('#viewHTMLCode').val()

    copyText(code)
  })
})
