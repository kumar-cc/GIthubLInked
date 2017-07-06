/*
    Description: 	Form Framework Pro
    Author: 		InsideLab
    Version: 		1.0
*/

/*	--------------------------------------------------
	:: Order Form
	-------------------------------------------------- */
	
	$(document).ready(function(){
		$('#order').validate({
			errorClass:'error',
			validClass:'success',
			errorElement:'em',			
			rules:{
				firstName:{
					required:true,
				},
				lastName:{
					required:true,
				},
				email:{
					required:true,
					email:true
				},
				phone:{
					required:true,
					digits:true
				},
				streetAddress:{
					required:true,
					minlength:20,
					maxlength:100
				},
				extendedAddress:{
					required:true,
					minlength:5,
					maxlength:50
				},
				locality:{
					required:true,
					minlength:5,
					maxlength:50
				},
				region:{
					required:true,
					minlength:5,
					maxlength:40
				},
				postalCode:{
					required:true,
					minlength:2,
					maxlength:10
				},
				countryName:{
					required:true,
				},
				sponsorship:{
					required:true,
				},
				usermessage:{
					required:true,
					minlength:20
				},
				cardholderName:{
					required:true,
					minlength:5,
					maxlength:100
				},
				number:{
					required:true,
					minlength:19,
					creditcard:true				
				},
				cvv:{
					required:true,
					digits:true,
					minlength:3,
					maxlength:4
				},
				expirationMonth:{
					required:true,
				},
				expirationYear:{
					required:true,
				},
				captcha:{
					required:true,
					remote:'php/captcha/captcha/processor-captcha.php'
				}
			},	
			highlight: function(element, errorClass, validClass) {
				var elements = $(element);
				elements.closest('.group').addClass(errorClass).removeClass(validClass);
			},
			unhighlight: function(element, errorClass, validClass) {
				var elements = $(element);
				elements.closest('.group').removeClass(errorClass).addClass(validClass);
			},
			errorPlacement: function (error, element) {},
			submitHandler:function(form) {
				jQuery(form).ajaxSubmit({
					target:'#order-message',
					beforeSubmit:function(){ 
						$('#order-button').attr('disabled', 'disabled');
						$('#reset-button').attr('disabled', 'disabled');
					},
					success:function(){  
						$('#order-button').removeAttr('disabled'); 
						$('#reset-button').removeAttr('disabled');
						$('#order-message').fadeIn(500).delay(10000).fadeOut();
						$('#order').each(function(){
							this.reset();
						});
						setTimeout(function(){ 
						    location.reload(); 
						}, 11000);
					},
				});
			}
		});
	});

/*	--------------------------------------------------
	:: 	Placeholder Form
	-------------------------------------------------- */
	
	$(document).ready(function(){
		$('input, textarea').placeholder();
	});
	
/*	--------------------------------------------------
	:: Masking
	-------------------------------------------------- */
	
	$(document).ready(function(){
		$('#number').mask('9999-9999-9999-9999');
	});
	
/*	--------------------------------------------------
	:: Loader
	-------------------------------------------------- */
	
	$(document).ready(function(){
		paceOptions = {
			elements:true,
			restartOnRequestAfter:false
		}
	});