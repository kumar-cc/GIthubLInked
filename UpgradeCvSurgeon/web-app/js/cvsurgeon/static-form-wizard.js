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