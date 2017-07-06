$(document).ready(function () {
    select();
});

function select() {
    $("#skillName").select2({
        id: function (skill) {
            return skill
        },
        ajax: {
            url: "/createCV/getSkillList",
            dataType: 'json',
            quietMillis: 100,
            data: function (term, page) {
                return {
                    skill: term,
                    max: 50
                };
            },
            results: function (data, page) {
                return {results: data};
            }
        },
        initSelection: function (element, callback) {
            var id = $(element).val();
            callback(id);
        },
        formatResult: formatResult,
        formatSelection: formatSelection,
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (m) {
            return m;
        }
    });
}

function formatResult(data) {
    return '<div>' + data + '</div>';
}

function formatSelection(data) {
    return data;
}