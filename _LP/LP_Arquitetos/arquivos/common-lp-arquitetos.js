/*
 *  Código por William Di Biasi Bogik
 *
 */
 $(document).ready(function(){
	'use strict';

	var navForm = $('.nextForm, .prevForm, .sendForm').on('click', function(){
		let current = parseInt($(this).data('current')),
		invalid = false;

		if($(this).hasClass('nextForm') || $(this).hasClass('sendForm')){
			$.each($('fieldset.field' + current).find('input'), function(){
				if($(this).val() === ''){
					$(this).addClass('invalid');
					if($(this).next('span.invalid-input').length === 0){
						$(this).after('<span class="invalid-input">&#33;</span>')
					}
					invalid = true;
				}else{
					$(this).removeClass('invalid');
				}
			});
		}
		
		if($(this).hasClass('nextForm') && invalid === false){
			$('fieldset.field' + current).slideUp()
			$('fieldset.field' + (++current)).slideDown();
		}else if($(this).hasClass('prevForm') && invalid === false){
			$('fieldset.field' + current).slideUp()
			$('fieldset.field' + (--current)).slideDown();
		}else if($(this).hasClass('sendForm') && invalid === false){
			$('#arquitetosForm').submit();
		}
	})

	var getFormData = $('#arquitetosForm').on('submit', function(e){
		e.preventDefault();

		let formData = {
			name : $('#name').val(),
			birthDate : $('#birthDate').val(),
			email : $('#email').val(),
			address : $('#address').val(),
			telephone : $('#telephone').val(),
			academic : $('#academic').val(),
			cnpj : $('#cnpj').val(),
			social : $('#social').val(),
			projectsN : $('#projectsN').val()
		}
		console.log(formData)
		$.ajax({
			contentType: "application/json; charset=utf-8",
			crossDomain: false,
			data: JSON.stringify(formData),
			type: 'POST',
			url: 'https://lojamindesigns.vteximg.com.br/api/dataentities/WI/documents',
			success: function(e){
				$('#formMessageS').slideDown();
				sessionStorage.setItem("mindProjetoArq", true);
			},
			error: function(e){
				$('#formMessageE').slideDown();
				$('#formMessageE').find('span').text(e);
			}
		})
	})

	var verifyNewsletterOnSession = (verifyNewsletterOnSession = () =>{
		if(sessionStorage.getItem("mindProjetoArq") === true){
			$("#formMessageS").slideDown();
		}
	})();
 })