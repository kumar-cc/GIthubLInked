function display_paypro(val) {
    var card_type = document.frmMain.ACCTTYPE.value;
    if (val == 'PaypalStandard') {
        document.getElementById('paypalProDiv').style.display = 'none';
        document.getElementById('cardTypeDiv').style.display = 'none';
    } else {
        document.getElementById('paypalProDiv').style.display = 'block';
        document.getElementById('cardTypeDiv').style.display = 'block';
        document.getElementById('cardTypeMsgDiv').style.display = 'none';
        if (card_type == '3' || card_type == 'Sw' || card_type == 'S')
            document.getElementById('ACCTTYPE').value = '10';
    }
}

function chkCardType(val) {
    if (val == '3' || val == 'Sw' || val == 'S') {
        document.getElementById('paypalProDiv').style.display = 'none';
        document.getElementById('PaypalStandard').checked = true;
        document.getElementById('cardTypeMsgDiv').style.display = 'block';
    } else {
        document.getElementById('paypalProDiv').style.display = 'block';
        document.getElementById('PaypalPro').checked = true;
        document.getElementById('cardTypeMsgDiv').style.display = 'none';
    }
}

function chkForm() {
    var len = document.frmMain.mem_package.length;
    var flag = 0;
    var len2 = document.frmMain.payment_type.length;
    var flag2 = 0;
    for (i = 0; i < len; i++) {
        if (document.frmMain.mem_package[i].checked == true) {
            flag = 1;
        }
    }

    if (flag == 0) {
        alert("Please select a membership package");
        return false;
    }

    for (i = 0; i < len2; i++) {
        if (document.frmMain.payment_type[i].checked == true) {
            flag2 = 1;
        }
    }

//    if (flag2 == 0) {
//        alert("Please select a payment type");
//        return false;
//    }

//    if (document.getElementById('PaypalStandard').checked == true)
//        document.forms['frmMain'].action = "paypalCheckout";
//
//    if (document.getElementById('PaypalPro').checked == true)
    document.forms['frmMain'].action = "cardPayment";

    if (document.getElementById('PaypalPro').checked == true) {
        document.getElementById("subtn").style.display = 'none';
        document.getElementById("midpart").style.display = '';

        var cardNo = document.frmMain.hide_card_no.value;
        var first_name = document.frmMain.first_name;
        var last_name = document.frmMain.last_name;
        var street = document.frmMain.street;
        var city = document.frmMain.city;
        var zip = document.frmMain.zip;
        var country = document.frmMain.country;
        var card_no = document.frmMain.hide_card_no;
        var valid_month = document.frmMain.valid_month;
        var valid_year = document.frmMain.valid_year;
        var exp_month = document.frmMain.exp_month;
        var exp_year = document.frmMain.exp_year;
        var cv2 = document.frmMain.cv2;
        var card_type = document.frmMain.ACCTTYPE;

        if (card_type.value == '10') {
            document.getElementById("subtn").style.display = '';
            document.getElementById("midpart").style.display = 'none';
            alert("Please select your card type");
            card_type.focus();
            return false;
        }

        if (first_name.value == '') {
            document.getElementById("subtn").style.display = '';
            document.getElementById("midpart").style.display = 'none';
            alert("Please enter your first name");
            first_name.focus();
            return false;
        }

        if (last_name.value == '') {
            document.getElementById("subtn").style.display = '';
            document.getElementById("midpart").style.display = 'none';
            alert("Please enter your last name");
            last_name.focus();
            return false;
        }

        if (street.value == '') {
            document.getElementById("subtn").style.display = '';
            document.getElementById("midpart").style.display = 'none';
            alert("Please enter your street");
            street.focus();
            return false;
        }

        if (city.value == '') {
            document.getElementById("subtn").style.display = '';
            document.getElementById("midpart").style.display = 'none';
            alert("Please enter your city");
            city.focus();
            return false;
        }

        if (country.value == '') {
            document.getElementById("subtn").style.display = '';
            document.getElementById("midpart").style.display = 'none';
            alert("Please enter your country");
            country.focus();
            return false;
        }

        if (country.value == 'usa') {
            if (document.frmMain.state_us.value == '') {
                document.getElementById("subtn").style.display = '';
                document.getElementById("midpart").style.display = 'none';
                alert("Please select your state");
                document.frmMain.state_us.focus();
                return false;
            }
        } else {
            if (document.frmMain.state.value == '') {
                document.getElementById("subtn").style.display = '';
                document.getElementById("midpart").style.display = 'none';
                alert("Please enter your state");
                document.frmMain.state.focus();
                return false;
            }
        }

        if (zip.value == '') {
            document.getElementById("subtn").style.display = '';
            document.getElementById("midpart").style.display = 'none';
            alert("Please enter your zip");
            zip.focus();
            return false;
        }

        if (card_no.value == '') {
            document.getElementById("subtn").style.display = '';
            document.getElementById("midpart").style.display = 'none';
            alert("Please enter your card no.");
            card_no.focus();
            return false;
        }

        if (exp_month.value == '') {
            document.getElementById("subtn").style.display = '';
            document.getElementById("midpart").style.display = 'none';
            alert("Please select your expiry month");
            exp_month.focus();
            return false;
        }

        if (exp_year.value == '') {
            document.getElementById("subtn").style.display = '';
            document.getElementById("midpart").style.display = 'none';
            alert("Please select your expiry year");
            exp_year.focus();
            return false;
        }

        if (cv2.value == '') {
            document.getElementById("subtn").style.display = '';
            document.getElementById("midpart").style.display = 'none';
            alert("Please enter your cv2 no.");
            cv2.focus();
            return false;
        }

        document.frmMain.card_no.value = cardNo;
    }
    return true;
}

function changeStateFld(val) {
    if (val == 'usa') {
        document.getElementById('stateDropdown').style.display = 'block';
        document.getElementById('stateTxtField').style.display = 'none';
    } else {
        document.getElementById('stateDropdown').style.display = 'none';
        document.getElementById('stateTxtField').style.display = 'block';
    }
}