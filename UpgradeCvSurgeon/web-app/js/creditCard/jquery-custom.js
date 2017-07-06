/*
    Description: 	Form Framework Pro
    Author: 		InsideLab
    Version: 		1.0
*/

/*	--------------------------------------------------
	:: Contact Form
	-------------------------------------------------- */
	
	$(document).ready(function(){
		$('#payment').validate({
			errorClass:'error',
			validClass:'success',
			errorElement:'em',			
			rules:{
                cardholderName:{
					required:true
				},
                postalCode:{
					required:true
				},
                cardNumber:{
					required:true
				},
                cvv:{
					required:true,
                    number:true
				},
                expirationMonth:{
					required:true
				},
                expirationYear:{
					required:true
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
			errorPlacement: function (error, element) {
            },
			submitHandler:function(form) {
                $("*").css("cursor","wait");
                $("#payment-button").attr("disabled","disabled");
                $.ajax({
                    type: 'POST',
                    data: {
                        cardholderName: document.getElementsByName('cardholderName')[0].value,
                        postalCode: document.getElementsByName('postalCode')[0].value,
                        cardNumber: document.getElementsByName('cardNumber')[0].value,
                        cvv: document.getElementsByName('cvv')[0].value,
                        expirationMonth:document.getElementsByName('expirationMonth')[0].value,
                        memberShipValue: $("#amountHiddenField").val(),
                        isTrial: $("#isTrialHiddenField").val(),
                        cardType:document.getElementsByName('cardType')[0].value,
                        paymentOptionId: $("#id_paymentOptionIdHiddenField").val(),
                        expirationYear:document.getElementsByName('expirationYear')[0].value,
                    },
                    url: '/userPayment/doCreditCardPaymentPaypal',
                    success: function (result) {
                        $(".overlay").css("z-index","998");
                        if(result.paymentDoneCC=="true") {
                            goog_report_conversion();
                            if(result.updateResume && result.cname=='createCV' && result.aname=='addPersonalDetails'){
                                window.location = "/"+result.cname+"/"+result.aname+"?updateResume=updateResume&paymentDone=true"
                                  }
                                 else{
                                 window.location = "/"+result.cname+"/"+result.aname+"?paymentDone=true"
                                     }
                        }else{
                            $("#Pmodal_error").text("*Please provide valid credentials")
                            document.getElementsByName('cardNumber')[0].value = "";
                            document.getElementsByName('cvv')[0].value = "";
                            document.getElementsByName('expirationMonth')[0].value = "";
                            document.getElementsByName('expirationYear')[0].value = "";
                            $("#payment").submit();
                        }
                        $("*").css("cursor","");
                        $("#payment-button").removeAttr("disabled")
                        return false;
                    },
                    error: function(){
                        $("#Pmodal_error").text("Something went wrong.");
                        $("*").css("cursor","");
                        $("#payment-button").removeAttr("disabled");
                        document.getElementsByName('cardNumber')[0].value = "";
                        document.getElementsByName('cvv')[0].value = "";
                        document.getElementsByName('expirationMonth')[0].value = "";
                        document.getElementsByName('expirationYear')[0].value = "";
                        $("#payment").submit();
                        return false;
                    }
                });
			}
		});
	});
	
/*	--------------------------------------------------
	:: Modal Box
	-------------------------------------------------- */
	
	$(document).ready(function(){
		$(".modal1, .overlay1").hide();
		
		$(".open").click(function(){
			$(".modal1, .overlay1").fadeIn();
		});
	});
