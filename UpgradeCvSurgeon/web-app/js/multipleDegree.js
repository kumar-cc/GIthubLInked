/**
 * Created by root on 7/24/14.
 */


function addMultipleDegree() {
    var fieldsOfStudy=$('[name=fieldsOfStudy]').serializeArray();
    var fieldsOfStudyString="";
    jQuery.each( fieldsOfStudy, function( i, field ) {
        fieldsOfStudyString = fieldsOfStudyString+field.value+"/"
    });

    var grades=$('[name=grade]').serializeArray();
    var gradesString="";
    jQuery.each( grades, function( i, field ) {
        if(field.value){
            gradesString = gradesString+field.value+"/"
        }else{
            gradesString= gradesString+" "+"/"
        }
    });
    $.ajax({
        url: "/createCV/addEducationLevel",
        data: {degreeId: $("#degree").val(), instituteName: $('[name=institutionName]').val(), institutionLocation: $('[name=institutionLocation]').val(), fieldsOfStudy: fieldsOfStudyString, grades: gradesString, counter: $('#counterDive').text(), customDegreeName:$("[name='customDegree']").val()},
        contentType:'text/html;charset=UTF-8',
        success: function (data) {
            var degreeId = data.degreeId;
            var educationHistoryId = data.educationHistory;
            var degreeTitle = data.degreeTitle;
            $('#savedEducationLevel').show();
            $('#switchBackToDatabaseId').trigger('click');
            $('#savedEducationLevel').append("<div id=" + educationHistoryId + ">");
            var $link = $("<a href='javascript:void(0)' style='color:red'>Delete</a>");
            var $editLink = $("<a href='javascript:void(0)'>Edit</a>");

            $link.on("click", function () {
                deleteEducationLevel(educationHistoryId);
            });
            $editLink.on("click", function () {
                editEducationLevel(educationHistoryId, degreeId);
            });
            $('#' + educationHistoryId).append("<span id=" + educationHistoryId + ">" + degreeTitle + "</span>" + " ").append("( ").append($editLink).append(", ").append($link).append(")");
            $('#degree').select2("val", "-Select Education Level-");
            $('[name="fieldsOfStudy"]').select2("val", "");
            $('.addEducationLevelWhichDoesNotExistInDatabase').val('');
            $('[name="grade"]').select2("val", "");
            $.ajax({

                url:"/createCV/updateEducationDegreeList",
                success:function(data){
                 $('#updateEducationDegreeList').replaceWith(data);
                    $('#degree').select2();
                }

            });
        }
    })
}


function editMultipleDegree() {
    var fieldsOfStudy=$('[name=fieldsOfStudy]').serializeArray();
    var fieldsOfStudyString="";
    jQuery.each( fieldsOfStudy, function( i, field ) {
        fieldsOfStudyString = fieldsOfStudyString+field.value+"/"
    });

    var grades=$('[name=grade]').serializeArray();
    var gradesString="";
    jQuery.each( grades, function( i, field ) {
        gradesString = gradesString+field.value+"/"
    });
    $.ajax({
        url: "/createCV/addEducationLevel",
        data: {degreeId: $("#degree").val(), instituteName: $('[name=institutionName]').val(), institutionLocation: $('[name=institutionLocation]').val(), fieldsOfStudy: fieldsOfStudyString, grades: gradesString},
        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (data) {
            var degreeId = data.degreeId;
            var educationHistoryId = data.educationHistory;
            var degreeTitle = data.degreeTitle;
            $('#addedEducationLevel').show();
            $('#addedEducationLevel').append("<div id=" + educationHistoryId + ">");
            var $link = $("<a href='javascript:void(0)' style='color:red'>Delete</a>");
            var $editLink = $("<a href='javascript:void(0)'>Edit</a>");

            $link.on("click", function () {
                deleteEducationLevelInEdit(educationHistoryId);
            });
            $editLink.on("click", function() {
                editEducationLevelInEdit(educationHistoryId,degreeId);
            });
            $('#' + educationHistoryId).append("<span id=" + educationHistoryId + ">" + degreeTitle + "</span>" + " ").append("( ").append($editLink).append(", ").append($link).append(")");
            $('#degree').select2("val", "");
            $('[name="fieldsOfStudy"]').select2("val", "");
            $('[name="grade"]').select2("val", "");
        }
    })
}


function addAnotherCustomEducationLevel() {

    $('#updateEducationDegreeList').hide();
    $('.addEducationLevelWhichDoesNotExistInDatabase').show();
    $('#customEducationLevelId').replaceWith('<div style="display: block"><a href="javascript:void(0)" id="switchBackToDatabaseId">Switch Back to Database</a></div>')


    $.ajax({

        url:"/createCV/customEducationLevel",
        success:function(data){
            $('#studyGradeTr').html(data);
        }
    });

    $('#selectEducationLevelLabel').hide();
    $('#addMultipleEducationLevel').show();
    $('#questionMarkForMultipleEL').show();

}

function switchBackToDatabase(){

    $('.addEducationLevelWhichDoesNotExistInDatabase').hide();
    $('#updateEducationDegreeList').show();
    $('#switchBackToDatabaseId').replaceWith('<a href="javascript:void(0)" id="customEducationLevelId">Add Custom Education Level</a>');
    $('#studyGradeTr').show();

}




function hideCustomEducationLevel() {
    $('.addEducationLevelWhichDoesNotExistInDatabase').hide();
}


function populateEducationLevel(educationHistoryId, degreeId) {
     //set the value
    $.ajax({
        url: "/createCV/editEducationLevel",
        data: {educationHistoryId: educationHistoryId, degreeId: degreeId},
        success: function (data) {
            $('#tableFieldOfStudy').html(data);
            $("#degree").select2("val", degreeId);
//            console.debug('educationHistoryId'+educationHistoryId);

            $('#editMultipleEducationLevel').css('display','none');
            $('#updateMultipleEducationLevel').css('display','block');
        }
    });

}

function updateEducationLevel(educationHistoryId, updateFromEdit) {
    var fieldsOfStudy=$('[name=fieldsOfStudy]').serializeArray();
    var fieldsOfStudyString="";
    jQuery.each( fieldsOfStudy, function( i, field ) {
        fieldsOfStudyString = fieldsOfStudyString+field.value+"/"
    });
    var grades=$('[name=grade]').serializeArray();
    var gradesString="";
    jQuery.each( grades, function( i, field ) {
        gradesString = gradesString+field.value+"/"
    });
    $.ajax({
        url: "/createCV/updateEducationLevel",
        data: {educationHistoryId: educationHistoryId, degreeId: $("#degree").val(), instituteName: $('[name=institutionName]').val(), institutionLocation: $('[name=institutionLocation]').val(), fieldsOfStudy: fieldsOfStudyString, grades: gradesString,customDegreeName:$("[name='customDegree']").val()},
        success: function (data) {
            $("#degree").select2("val", "");
            $('[name="fieldsOfStudy"]').select2("val", "");
            $('[name="fieldsOfStudy"]').val('');
            $('[name="grade"]').val('');
            $('#gradeSelect').val('');
            $('[name="grade"]').select2("val", "");
            var $link = $("<a href='javascript:void(0)' style='color:red'>Delete</a>");
            var $editLink = $("<a href='javascript:void(0)'>Edit</a>");
            if(!updateFromEdit){
                $link.on("click", function () {
                    deleteEducationLevel(data.educationHistoryInstance.id);
                });
                $editLink.on("click", function () {
                    editEducationLevel(data.educationHistoryInstance.id, data.educationHistoryInstance.degree.id);
                });
            }else{
                $link.on("click", function () {
                    deleteEducationLevelInEdit(data.educationHistoryInstance.id);
                });
                $editLink.on("click", function() {
                    editEducationLevelInEdit(data.educationHistoryInstance.id,data.educationHistoryInstance.degree.id);
                });
            }
            $('div#' + data.educationHistoryInstance.id).html("<span id=" + data.educationHistoryInstance.id + ">" + data.degreeId.title + "</span>" + " ").append("( ").append($editLink).append(", ").append($link).append(")");

            $('button#updateEducationLevelId').css('display','none');
            $('button#addMultipleEducationLevel').css('display','block');
            $('#questionMarkForMultipleEL').css('display','block');
            $('button#updateMultipleEducationLevel').css('display','none');
            $('button#editMultipleEducationLevel').css('display','block');

        }
    });


}

function addCustomFieldOfStudy() {
    $('.appendClonedDiv').append($('#cloneMe').clone());
//             jQuery('.grade').select2();
}