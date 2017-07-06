/*
 Description: 	Form Framework Pro
 Author: 		InsideLab
 Version: 		1.0
 */

/*	--------------------------------------------------
 :: Contact Form
 -------------------------------------------------- */

$(document).ready(function(){
    var hideAnimator=function(){
        $('.send-success').css({
            opacity: 0,
            display: 'none'
        });
        $(".Cmodal, .overlay").fadeOut();
    }
    var onSuccess = function () {
        /*
         On success display .send-success block with fade-in animation
         */
        var $sendSuccess = $('.send-success');
        $sendSuccess.css('display', 'block');
        $sendSuccess.animate({
            opacity: 1
        }, 250, function () {
            window.setTimeout(function () {
//                        toggleContact();
                hideAnimator();
            }, 1250)
        });
    }
    $('#contact').validate({
        errorClass:'error',
        validClass:'success',
        errorElement:'em',
        rules:{
            firstname:{
                required:true
            },
            lastname:{
                required:true
            },
            useremail:{
                required:true,
                email:true
            },
            usersubject:{
                required:true
            },
            usermessage:{
                required:true,
                minlength:20
            },
            department:{
                required:true
            },
            captcha:{
                required:false,
                equal:77
            }
        },
        highlight: function(element, errorClass, validClass) {
            var elements = $(element);
            elements.closest('.group').addClass(errorClass).removeClass(validClass);
            if(elements.attr('class')=='textarea resisable'){
                $('#id_errorNot20').show();
            }
        },
        unhighlight: function(element, errorClass, validClass) {
            var elements = $(element);
            elements.closest('.group').removeClass(errorClass).addClass(validClass);
            if(elements.attr('class')=='textarea resisable'){
                $('#id_errorNot20').hide();
            }
        },
        errorPlacement: function (error, element) {},
        submitHandler:function(form) {
            //if every content is validated then the ajax to send mail is called.
            //loader
            $(".overlay").css("z-index","1998");
            $(".overlay .imageOverlay").css("display","block");
            $.ajax({
               type: 'POST',
               data: {
                    firstname: document.getElementsByName('firstname')[0].value,
                    lastname: document.getElementsByName('lastname')[0].value,
                    useremail: document.getElementsByName('useremail')[0].value,
                    usermessage: document.getElementsByName('usermessage')[0].value,
                    usersubject:document.getElementsByName('usersubject')[0].value
                },
                url: '/contactUs/sendQueries',
                success: function (result) {
                    $(".overlay").css("z-index","998");
                    $(".overlay .imageOverlay").css("display","none");
                    onSuccess();
                    return false;
                },
                error: function(){
                   $("#Cmodal_error").text("Something went wrong.");
                    $(".overlay").css("z-index","998");
                    $(".overlay .imageOverlay").css("display","none");
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
    $(".Cmodal, .overlay").hide();

    $(document).on('click','.Copen',function(){
        $(".Cmodal, .overlay").fadeIn();
        $("#firstname").focus();
    });

    $(".Cclose").click(function(){
        $(".Cmodal, .overlay").fadeOut();
    });
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