function PostcodeAnywhere_Interactive_Find_v1_10Begin(Key, SearchTerm, PreferredLanguage, Filter, UserName) {
    var script = document.createElement("script"),
        head = document.getElementsByTagName("head")[0],
        url = "https://services.postcodeanywhere.co.uk/PostcodeAnywhere/Interactive/Find/v1.10/json2.ws?";

    // Build the query string
    url += "&Key=" + encodeURIComponent(Key);
    url += "&SearchTerm=" + encodeURIComponent(SearchTerm);
    url += "&PreferredLanguage=" + encodeURIComponent(PreferredLanguage);
    url += "&Filter=" + encodeURIComponent(Filter);
    url += "&UserName=" + encodeURIComponent(UserName);
    url += "&CallbackFunction=PostcodeAnywhere_Interactive_Find_v1_10End";

    script.src = url;

    // Make the request
    script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            script.onload = script.onreadystatechange = null;
            if (head && script.parentNode)
                head.removeChild(script);
        }
    }

    head.insertBefore(script, head.firstChild);
}

function PostcodeAnywhere_Interactive_Find_v1_10End(response) {
    // Test for an error
    if (response.length == 1 && typeof(response[0].Error) != "undefined") {
        // Show the error message
        alert(response[0].Description);
    }
    else {
        // Check if there were any items found
        if (response.length == 0)
            alert("Sorry, there were no results");
        else {
            document.getElementById("building").style.display = '';
            jQuery("#building").find('option').remove();

            for (var i = 0; i <= response.length - 1; i++) {
                var opt = document.createElement("option");

                document.getElementById("building").options.add(opt);
                opt.text = response[i].StreetAddress + ", " + response[i].Place;
                opt.value = response[i].Id;
            }
        }
    }
}

function PostcodeAnywhere_Interactive_RetrieveById_v1_30Begin(Key, Id, PreferredLanguage, UserName) {
    var script = document.createElement("script"),
        head = document.getElementsByTagName("head")[0],
        url = "https://services.postcodeanywhere.co.uk/PostcodeAnywhere/Interactive/RetrieveById/v1.30/json2.ws?";

    // Build the query string
    url += "&Key=" + encodeURIComponent(Key);
    url += "&Id=" + encodeURIComponent(Id);
    url += "&PreferredLanguage=" + encodeURIComponent(PreferredLanguage);
    url += "&UserName=" + encodeURIComponent(UserName);
    url += "&CallbackFunction=PostcodeAnywhere_Interactive_RetrieveById_v1_30End";

    script.src = url;

    // Make the request
    script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            script.onload = script.onreadystatechange = null;
            if (head && script.parentNode)
                head.removeChild(script);
        }
    }

    head.insertBefore(script, head.firstChild);
}

function PostcodeAnywhere_Interactive_RetrieveById_v1_30End(response) {
    // Test for an error
    if (response.length == 1 && typeof(response[0].Error) != "undefined") {
        // Show the error message
        alert(response[0].Description);
    }
    else {
        // Check if there were any items found
        if (response.length == 0)
            alert("Sorry, there were no results");
        else {
            document.getElementById("line1").value = response[0].Line1;
            document.getElementById("line2").value = response[0].Line2;
            document.getElementById("town").value = response[0].PostTown;
            document.getElementById("county").value = response[0].County;
            document.getElementById("userPostcode").value = response[0].Postcode;
            document.getElementById("countryName").value = '225';   //225 for UNITED KINGDOM
        }
    }
}