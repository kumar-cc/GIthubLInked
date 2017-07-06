$(document).ready(function () {
    select();
});

function select() {
    $("#candidates").select2({
        id: function (name) {
            return name
        },
        multiple: true,
        ajax: {
            url: "/contact/getCandidateList",
            dataType: 'json',
            quietMillis: 100,
            data: function (name, page) {
                return {
                    name: name,
                    max: 50
                };
            },
            results: function (data, page) {
                return {results: data};
            }
        },
        initSelection: function (el, callback) {
            var data = [];
            $(el.val().split(',')).each(function () {
                data.push(this);
                console.debug("el" + this);

            });
            callback(data);
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

function showHideAddressBox() {
    if ($("#selectAll").is(':checked')) {
        $('#emailAddressDiv').hide();
    } else {
        $('#emailAddressDiv').show();
    }
}

$(document).ready(function () {
    $('#sendMessageButton').click(function () {
        $.blockUI({
            message: '<h1>Sending<img src="/images/dotedSpinner.gif"></h1>',
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });
    });
});