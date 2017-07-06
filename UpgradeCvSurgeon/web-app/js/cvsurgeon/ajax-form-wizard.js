// Wizard
if($(".form-wizard").length > 0){
    $(".form-wizard").formwizard({
        formPluginEnabled: true,
        validationEnabled: true,
        focusFirstInput : false,
        disableUIStyles:true,
        validationOptions: {
            errorElement:'span',
            errorClass: 'help-block error',
            errorPlacement:function(error, element){
                element.parents('.controls').append(error);
            },
            highlight: function(label) {
                $(label).closest('.control-group').removeClass('error success').addClass('error');
            },
            success: function(label) {
                label.addClass('valid').closest('.control-group').removeClass('error success').addClass('success');
            }
        },
        formOptions :{
            success: function(data){
                alert("Response: \n\n"+data.say);
            },
            dataType: 'json',
            resetForm: true
        }
    });
}


var remoteAjax = {}; // empty options object

$(".form-wizard .step").each(function(){ // for each step in the wizard, add an option to the remoteAjax object...
    remoteAjax[$(this).attr("id")] = {
        url : "savePersonalDetails", // the url which stores the stuff in db for each step
        dataType : 'json',
        beforeSubmit: function(data){$("#data").html("data sent to the server: " + $.param(data))},
        success : function(data){
            window.scrollTo(0, 0);
            if(data.status==false){
               $('#invalidEmailId').html("<div class='error alert alert-danger alert-dismissable' style='display: block'><button data-dismiss='alert' class='close' type='button'>×</button>"+data.content+"</div>");
               return
            }
            jQuery(".alert-error").html('').hide();
            if(data.status==true){ //data is either true or false (returned from store_in_database.html) simulating successful / failing store
                if(data.message){
                    $( "#messageData" ).empty();
                    $('#messageInfo').show();
                    $( "#messageData" ).append(data.message);
//                    notificationAlert("Alert", data.message);
                    if(data.step){
                        window.location="addWorkHistory";
                        return false
                    }
                }
            }else{
                jQuery(".alert-error").html(data.content).show();
            }

            return data.status; //return true to make the wizard move to the next step, false will cause the wizard to stay on the resume step (change this in store_in_database.html)
        }
    };
});

$(".form-wizard").formwizard("option", "remoteAjax", remoteAjax); // set the remoteAjax option for the wizard