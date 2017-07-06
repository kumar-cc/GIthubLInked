/*************************************************************
 Released under the GNU General Public License

 The following copyright announcement is in compliance
 to section 2c of the GNU General Public License, and
 thus can not be removed, or can only be modified
 appropriately.

 Please leave this comment intact together with the
 following copyright announcement.

 Copyright(c) 2012 Allies Computing Ltd

 The authors provide no warranty.

 World Addresses Web Example Version 2.0
 By Allies Computing Ltd - www.worldaddresses.com
 *************************************************************/

;
(function ($) {
    "use strict";
    /*global com: false, jQuery: false*/
    $.fn.worldaddresses = function (options) {

        /*
         *   getString()
         *
         *   Check for the existence of language string
         *
         */
        var getString = function (s) {

            if (typeof(window.WAi18n) != "undefined") {

                if (typeof(WAi18n.lang) != 'undefined' && WAi18n.lang[s]) {

                    s = WAi18n.lang[s];
                }
            }

            for (var i = 1; i < arguments.length; i++) {
                s = s.replace(/\{\d+?\}/, arguments[i]);
            }

            return s;
        }

        if (typeof console == "undefined") {
            console = {log: function () {
            }, info: function () {
            }, error: function () {
            }};
        }
        var newaddresses = [];          // for containing a single page of results.
        var addresses = [];             // address holder.
        var counts = [];                // count of addresses holder.
        var available_datasets = [];    // datasets as retrieved from server for searchKey.
        var searchValue = '';
        var addressIndex = 0;
        // vars for paging
        var requests = 0;                // request counter
        var currentPage = 1;
        var totalPages = 1;
        var lastIndex = 0;
        var perPage = 100;

        // set sensible defaults where possible.
        var defaults = {
            searchURL: '',
            datasetSelect: "datasetSelect",
            searchField: "searchField",
            searchButton: "searchButton",
            pickerLocation: '',
            paging: false,
            debug: false,
            timeout: 5000,
            searchText: getString('defaultButtonText'),

            datasetsFallback: { "dataset": [
                {"iso_3166_alpha_2": "UK", "un_countryname_en": "United Kingdom"}
            ]},

            preInit: function () {
                if (config.debug) {
                    console.log('WA->nocallback->preInit(x)');
                }
            },
            preSearch: function () {
                if (config.debug) {
                    console.log('WA->nocallback->preSearch(x)');
                }
            },
            preDisplay: function () {
                if (config.debug) {
                    console.log('WA->nocallback->preDisplay(x)');
                }
            },

            postInit: function () {
                if (config.debug) {
                    console.log('WA->nocallback->postInit(x)');
                }
            },
            postSearchSuccess: function () {
                if (config.debug) {
                    console.log('WA->nocallback->postSearchSuccess(x)');
                }
            },
            postSearchFailure: function () {
                if (config.debug) {
                    console.log('WA->nocallback->postSearchFailure(x)');
                }
            },
            postDisplay: function () {
                if (config.debug) {
                    console.log('WA->nocallback->postDisplay(x)');
                }
            },
            postPopulate: function () {
                if (config.debug) {
                    console.log('WA->nocallback->postPopulate(x)');
                }
            },

            onSelect: function () {
                if (config.debug) {
                    console.log('WA->nocallback->onSelect(x)');
                }
            },
            onShowButton: function () {
                if (config.debug) {
                    console.log('WA->nocallback->onShowButton(x)');
                }
            },
            onHideButton: function () {
                if (config.debug) {
                    console.log('WA->nocallback->onHideButton(x)');
                }
            },
            onChangeCountry: function (dataset) {
                if (config.debug) {
                    console.log('WA->nocallback->onChangeCountry(' + dataset + ')');
                }
            },

            customWarning: function (message) {

                // prepend form with error message
                if (!$('#wawarninglog').length > 0) {
                    var warningLog = $(document.createElement("div"))
                        .attr({'id': 'wawarninglog'});

                    $('#' + config.datasetSelect).parent().parent().prepend(warningLog);
                }

                $('#wawarninglog').html('<p class="wawarning">' + message + '</p>');

            },
            customError: function (message) {

                // if debug disabled, show generic error message
                if (!config.debug) {
                    message = getString('errorDefault');
                }

                // prepend form with error message
                if (!$('#waerrorlog').length > 0) {
                    var errorLog = $(document.createElement("div"))
                        .attr({'id': 'waerrorlog'});
                    $('#' + config.datasetSelect).parent().parent().prepend(errorLog);
                }

                $('#waerrorlog').html('<p class="waerror">' + message + '</p>');

            }

        };

        // add user options to default config
        var config = $.extend(defaults, options);

        // execute pre Initialise callback.
        config.preInit();


        /*
         *   validateConfig()
         *
         *   Validates configuration arguments.
         *
         */
        var validateConfig = function () {
            debug('validateConfig()');

            if (typeof(config.searchKey) == "undefined" || config.searchKey === "") {
                displayError(getString('error005'));
                return false;
            }

            if (!/^[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/i.test(config.searchKey)) {
                displayError(getString("error002"));
                return false;
            }

            if (typeof(config.functionName) == "undefined" || config.functionName == "") {
                displayError(getString("error003"));
                return false;
            }

            if (!/^[A-Z0-9-_]+$/i.test(config.functionName)) {
                displayError(getString("error004"));
                return false;
            }

            if (config.datasetField && config.datasetField != "") {
                if (typeof(config.datasetField) != "string") {
                    displayError(getString("error007"));
                    return false;
                }

                if (!$(config.datasetField)) {
                    displayError(getString("error008", "\"" + config.datasetField + "\""));
                    return false;
                }

                config.dataset = $('#' + config.datasetField).val();
            }

            if (typeof(config.searchField) == "undefined" || config.searchField == "") {
                displayError(getString("error009"));
                return false;
            }

            if (typeof(config.searchField) != "string") {
                displayError(getString("error010"));
                return false;
            }

            if (!$('#' + config.searchField)) {
                displayError(getString("error011", "\"" + config.searchField + "\""));
                return false;
            }

            if (typeof(config.searchButton) == "undefined" || config.searchButton == "") {
                displayError(getString("error012"));
                return false;
            }

            if (typeof(config.searchButton) != "string") {
                displayError(getString("error013"));
                return false;
            }

            if ((config.inlinePickerLocation) && typeof(config.inlinePickerLocation) != "string") {
                displayError(getString("error026"));
                return false;
            }

            if (!$('#' + config.searchButton)) {
                displayError(getString("error014", "\"" + config.searchButton + "\""));
                return false;
            }

            if (config.paging) {
                if (typeof(config.paging) != "boolean") {
                    displayError(getString("error015"));
                    return false;
                }
            }

            if (typeof(config.outputMap) == "undefined") {
                displayError(getString("error016"));
                return false;
            }

            if (typeof(config.outputMap.fields) == "undefined") {
                displayError(getString("error017"));
                return false;
            }

            if (typeof(config.outputMap.fields) != "object" || typeof(config.outputMap.fields.length) == "undefined") {
                displayError(getString("error018"));
                return false;
            }

            if (config.outputMap.fields.length == 0) {
                displayError(getString("error019"));
                return false;
            }

            var length = config.outputMap.fields.length;

            for (var i = 0; i < length; i++) {
                var objFieldMap = config.outputMap.fields[i];

                if (typeof(objFieldMap.id) == "undefined" || objFieldMap.id == "") {
                    displayError(getString("error020", i));
                    return false;
                }

                if (typeof(objFieldMap.id) != "string") {
                    displayError(getString("error021", i));
                    return false;
                }

                if (!$(objFieldMap.id)) {
                    displayError(getString("error022", i, "\"" + objFieldMap.id + "\""));
                    return false;
                }

                if (typeof(objFieldMap.dataIndex) == "undefined") {
                    displayError(getString("error023", i));
                    return false;
                }

                if (typeof(objFieldMap.dataIndex) != "number" && (typeof(objFieldMap.dataIndex) != "object" || typeof(objFieldMap.dataIndex.length) == "undefined")) {
                    displayError(getString("error024"));
                    return false;
                }
            }

            // passed all those? Let's go!
            return true;
        }

        /*
         *   init()
         *
         *   Initialise our lookup functionality.
         *   retrieve datasets, add button, add events etc.
         */
        var init = function () {
            debug("init();", 3);
            debug(config.searchButton);

            if (validateConfig(config)) {

                $.ajaxSetup({
                    cache: true
                });

                // Get the country list 
                $.ajax({
                    url: ('https:' === document.location.protocol ? 'https://' : 'http://') + 'md.worldaddresses.com/searchkey/datasets/' + config.searchKey + '/js',
                    type: 'GET',
                    dataType: 'script',
                    success: function (script, textStatus) {
                        debug('Script downloaded: ../' + config.searchKey + '.js');
                        available_datasets = com.worldaddresses.md.available_datasets;
                        debug(available_datasets, 2);
                    },
                    error: function () {
                        debug('Failed to download script: ../' + config.searchKey + '.js');
                        debug('Using fall-back country list from config:');
                        available_datasets = config.datasetsFallback;
                        debug(available_datasets, 2);
                    },
                    complete: function () {
                        // show our controls if required.
                        showDataset();
                        showButton();

                        // execture post initialise callback
                        config.postInit();
                    },
                    timeout: 1000
                });


                // attach enter event to searchField
                $('#' + config.searchField).keypress(function (e) {
                    if (e.keyCode === 13) { // if button pressed is Enter
                        $('#' + config.searchButton).click();
                        e.preventDefault();
                    }
                });
            }
        };

        /*
         *   changeDataset()
         *
         *   Updates current config object with new user dataset selection.
         */
        var changeDataset = function () {
            debug('changeDataset()');

            // get value of dataset select.
            var dataset = $('#' + config.datasetSelect).val();

            // execute our onChangeCountry callback
            config.onChangeCountry(dataset);

            debug("Changing dataset to " + dataset);

            // set new value in config object.
            config.dataset = dataset;

            // every time we change the datasetSelect, run a button check.
            checkButton(dataset);
        };

        /*
         *   showDataset()
         *
         *   Checks whether a dataset field is in the HTML
         *   - if not, it creates, displays and adds event for select field based on data available to the search key
         *   - if so, it adds our event listener to our existing select box.
         */
        var showDataset = function () {
            debug('showDataset()');

            var datasetSelect = $('#' + config.datasetSelect);

            if (datasetSelect.length > 0) {
                debug('#' + config.datasetSelect + ' exists. Attaching event.');

            } else {
                debug('No #' + config.datasetSelect + '. Creating...');

                // create a select element, give it an ID & name
                var datasetSelect = $(document.createElement("select"))
                    .attr({'id': config.datasetSelect, 'name': config.datasetSelect});

                // generate selectbox of available datasets, set selected to default option
                for (var z = 0; z < available_datasets.dataset.length; z++) {
                    if (config.defaultDataset === available_datasets.dataset[z].iso_3166_alpha_2) {
                        $(datasetSelect).append($("<option></option>").attr('value', available_datasets.dataset[z].iso_3166_alpha_2).attr('selected', 'selected').text(available_datasets.dataset[z].un_countryname_en));
                    } else {
                        $(datasetSelect).append($("<option></option>").attr('value', available_datasets.dataset[z].iso_3166_alpha_2).text(available_datasets.dataset[z].un_countryname_en));
                    }
                }

                // insert select before the searchField
                $('#' + config.searchField).parent().prepend(datasetSelect);
            }

            // remove on change events to ensure no duplicates.
            $('#' + config.datasetSelect).unbind('change');

            // add event listener for selecting an item            
            $('#' + config.datasetSelect).change(changeDataset);

            // ensure we record our dataset on init
            var dataset = $('#' + config.datasetSelect).val();
            debug("Dataset on load: " + dataset);

            // set new value in config object.
            config.dataset = dataset;
        };

        /*
         *   checkButton()
         *
         *   Check whether our currently selected country is supported by a dataset for this searchkey. Display/hide button accordingly.
         */
        var checkButton = function (code) {
            debug('checkButton()');

            var show = false;
            // loop through to see if our selected set is in available sets
            for (var x = 0; x < available_datasets.dataset.length; x++) {
                if (code === available_datasets.dataset[x].iso_3166_alpha_2) {
                    show = true;
                }
            }

            if (show === true) {
                showButton();
                // execute our onShowButton callback
                config.onShowButton();
            }
            else {
                hideButton();
                // execute our onHideButton callback
                config.onHideButton();
            }
        };

        /*
         *   showButton()
         *
         *   Checks if we have a button already.
         *   - if not, create a button and add our click event listener
         *   - if so, leave button in place and add click event.
         */
        var showButton = function () {
            debug('showButton()');

            var button = $('#' + config.searchButton);
            // does it exist?
            if (button.length > 0) {
                debug('Already a button. Showing...');
                // show it, enable it.
                $('#' + config.searchButton).show(500).attr('disabled', false);
                // get and store the text of the supplied button
                if ($('#' + config.searchButton).is("input")) {
                    config.searchText = $('#' + config.searchButton).attr('value');
                }
                else {
                    config.searchText = $('#' + config.searchButton).html();
                }
            } else {
                // create it!
                debug('No button. Creating...');

                // create our button element
                button = $(document.createElement("input")).attr({ id: config.searchButton, name: config.searchButton, type: "button", value: config.searchText, disabled: false, class: "btn btn-primary"});

                // insert button after searchfield
                $('#' + config.searchField).after(button);
            }

            // remove click events, to prevent duplicates
            $('#' + config.searchButton).unbind('click');

            // attach click event to our new or old button            
            $('#' + config.searchButton).click(function (e) {
                e.preventDefault();
                searchInit();
            });
        };

        /*
         *   hideButton()
         *
         *   Hides the button from view (for example when dataset not supported by searchKey)
         */
        var hideButton = function () {
            debug('hideButton()');
            $('#' + config.searchButton).attr('disabled', true).hide(500);
        };

        /*
         *   searchInit();
         *
         *   Prepare for making our API call.
         */
        var searchInit = function () {
            debug('searchInit()');

            // reset requests, we're searching from scratch
            requests = 0;
            addressIndex = 0;
            currentPage = 1;
            totalPages = 1;

            $('#selectAddress').remove();

            // clear error and warning logs
            $('#waerrorlog, #wawarninglog').empty();

            // get the searchValue from searchField
            searchValue = $('#' + config.searchField).val();

            debug(config.searchKey + ' - ' + config.functionName + ' - ' + config.dataset + ' - ' + searchValue);

            // set up our parameters to pass or from which we'll build our URL string.
            var searchsettings = {
                params: {
                    searchKey: config.searchKey,
                    functionName: config.functionName,
                    dataset: config.dataset,
                    searchValue: searchValue,
                    page: 0
                },
                callback: {
                    success: success,
                    failure: failure
                }
            };

            // about to initiate search, so set button to searching...
            $('#' + config.searchButton).val(getString('searchButtonSearchingText'))
                .attr('disabled', true);

            // execute preSearch callback
            config.preSearch();

            // send the search request.
            serverRequest(searchsettings);
        };

        /*
         *   serverRequest()
         *
         *   Pass the request to the web service.
         */
        var serverRequest = function (searchsettings) {
            debug('serverRequest()');
            debug(searchsettings, 2);

            if (isRemoteURL(config.searchURL)) {
                // get data via jsonp
                var url = config.searchURL;
                url += "/" + searchsettings.params.searchKey;
                url += "/" + searchsettings.params.functionName;
                url += "/" + searchsettings.params.dataset;
                url += "/" + searchsettings.params.searchValue;
                url += "/page/" + searchsettings.params.page;
                url += "/json";

                var dataType = 'jsonp';

            } else {
                var url = config.searchURL;
                var dataType = 'json';
            }

            $.ajax({
                url: url,
                type: 'POST',
                jsonp: 'method',
                data: searchsettings.params,
                dataType: dataType,
                success: searchsettings.callback.success,
                error: searchsettings.callback.failure,
                timeout: config.timeout
            });
        };

        /*
         *   success()
         *
         *   On receipt of success response from web service.
         */
        var success = function (response) {
            newaddresses = [];
            // execute postSearchSuccess callback
            config.postSearchSuccess();

            debug(response, 2);

            // check response object for expected data.
            if (typeof(response) == "object") { // we have data! Let's see what it is.
                if (response.Status) {
                    if (response.Status === "Ok") {
                        if (response.Addresses) {
                            if (response.Addresses.length > 0) {
                                // save our addresses to local address object
                                newaddresses = response.Addresses;
                                counts = response.Counts;

                                // set the last index for our lookup
                                //lastIndex = addresses.length;

                                // execute preDisplay callback before displaying
                                config.preDisplay();

                                // show the address picker
                                if (newaddresses.length === 1) {
                                    addresses = newaddresses;
                                    debug('1 address only');

                                    populateFields();

                                } else {
                                    showAddressPicker(newaddresses, counts);
                                }

                            } else {
                                displayWarning(getString('warning002'));
                            }
                        } else {
                            displayWarning(getString('warning002'));
                        }
                    } else if (typeof(response.Status) == "string") {
                        displayError(response.Status); //error from service
                    }
                } else {
                    displayError(getString('error105')); // unknown problem
                }
            } else {
                displayError(getString('error105')); // unknown problem
            }

            resetForm();
        };

        /*
         *   failure()
         *
         *   On receipt of failure response from web service.
         */
        var failure = function (response, status) {
            debug('failure()');

            // execute postSearchFailure callback
            config.postSearchFailure();

            // if we have a response object, see what it says. Otherwise generic error.
            if (response) {
                debug(response);
            }

            error(getString('error105'));

            resetForm();
        };

        /*
         *   resetForm()
         *
         *   Set form back to default configuration.
         */
        var resetForm = function () {
            debug('resetForm()');
            $('#' + config.searchButton).val(config.searchText)
                .attr('disabled', false);
        };

        /*
         *   showAddressPicker()
         *
         *   Display addresses returned to the user for selection.
         */
        var showAddressPicker = function (newaddresses, counts) {
            var newlabel = document.createElement("Label");
            var word = document.createTextNode('Please select one address:');
            newlabel.appendChild(word);
//            parentDiv.appendChild(newlabel);

            debug('showAddressPicker()');

            // if this is the first request
            if (requests === 0) {
                // if selectbox exists from a previous search, remove it.
                if ($('#selectAddress').length > 0) {
                    $('#selectAddress').remove();
                }

                addresses = newaddresses;

                // create a select element, give it an ID & name
                var select = $(document.createElement("select"))
                    .attr({'id': 'selectAddress', 'name': 'selectAddress'});
            } else {
                // otherrwise select is our existing element to append to
                var select = $('#selectAddress');
                addresses = addresses.concat(newaddresses);


            }

            // populate select element with addresses
            for (var j = 0; j < newaddresses.length; j++) {
                // concatenate each address, adding commas to start of each not-null string except index 0
                var joinedaddress = '';
                var addressLine = [];

                if (config.addressPickerMap && typeof (config.addressPickerMap) === "object") {
                    $.each(config.addressPickerMap, function (index, value) {
                        if (newaddresses[j][value] && newaddresses[j][value].length > 0) {
                            addressLine.push(newaddresses[j][value]);
                        }
                    });
                }
                else {
                    $.each(newaddresses[j], function (index, value) {
                        if (value.length > 0) {
                            addressLine.push(value);
                        }
                    });
                }

                joinedaddress = addressLine.join(', ');
                $(select).append($("<option></option>").attr('value', (j + (100 * requests))).text(joinedaddress));
            }

            if (requests === 0) {
                // add non-address first option: -- select address -- and set to 'selected'
                $(select).prepend($("<option></option>").attr('value', '---').attr('selected', 'selected').text(getString('selectionTitle')));
            }

            //If paging is on, set initial values and display a "Show more results" button
            if (config.paging === true) {
                var highestTotal = 0;
                var numPages = 0;
                debug('counts');
                debug(counts, 2);

                for (var key in counts) {
                    debug(key);
                    debug(counts[key].OnPage);
                    debug(counts[key].TotalCount);

                    var country = key;
                    var onPage = counts[key].OnPage;
                    var totalCount = counts[key].TotalCount;

                    // if our total results is the same as this page, no additional results.
                    if (totalCount === onPage) {
                        currentPage = 0;
                    }
                    // if more available, figure out how many pages worth.
                    if (totalCount > onPage) {
                        numPages = Math.ceil(totalCount / onPage) - 1;
                        //debug('totalCount > onPage: '+numPages);
                    }
                    if (numPages >= Math.ceil(totalCount / onPage) - 1) {
                        //debug('numPages >= preCeil ' + numPages);
                        numPages = Math.ceil(totalCount / perPage) - 1;
                        //debug('numPages >= Math.ceil ' + numPages);
                    }
                    debug('current page ' + currentPage);
                    debug('num page ' + numPages)
                }

                // disable 'more' options after first use.                
                $('#' + $(select).attr('id') + ' option[value|="MORE"]').each(function () {
                    var resultpage = $(this).val();
                    $(this).attr('disabled', 'disabled').text(getString('resultsPage01') + (resultpage.substring(5, resultpage.length)) + getString('resultsPage02') + numPages + getString('resultsPage03'));
                });

                if (numPages > 0 && numPages !== currentPage) {
                    $(select).append($("<option></option>").attr('value', 'MORE-' + (currentPage + 1)).text(getString('showMoreResultsText')));

                } else if (config.paging === true && requests > 0) {
                    $(select).append($("<option></option>").attr('value', 'END').text(getString('endResultsText')));
                    $('#' + $(select).attr('id') + ' option[value="END"]').attr('disabled', 'disabled');
                }
            }

            // only insert selectbox if this is the first request
            if (requests === 0) {
                // insert the address picker select 
                if (config.pickerLocation && config.pickerLocation != '' && $('#' + config.pickerLocation)) {
                    // insert it at configured location
                    $('#' + config.pickerLocation).html(select);
                }
                else {
                    // insert select after the searchButton
                    $('#' + config.searchButton).after(select).after(newlabel);
                }
            }

            // unbind our change event so we don't end up duplicating it.
            $('#selectAddress').unbind('change');
            // add our change event
            $('#selectAddress').change(changeCheck);

            // execute postDisplay callback
            config.postDisplay();
        };

        /*
         *   changeCheck()
         *   when selecting an option from addresss picker dropdown selectbox
         *   checks if we should populate the form or request a new page of data
         *
         */
        var changeCheck = function () {
            debug('changeCheck()');
            // did we choose an address or did we choose to look at the next page?
            var selval = $('#selectAddress').val();
            if (selval.indexOf('MORE', 0) !== -1) {
                debug('Show more results...');
                // show next page
                showMore();
            } else {
                populateFields();
            }
        }

        /* 
         *   showMore()
         *
         *
         *
         */
        var showMore = function () {
            debug('showMore()');

            debug('Current page: ' + currentPage + ' - Next page: ' + (currentPage + 1));
            // increase page number and request count
            currentPage += 1;
            requests += 1;
            debug('Requests incremented to > ' + requests + ' Page incremented to: ' + currentPage);

            // set up our parameters to pass or from which we'll build our URL string.
            var searchsettings = {
                params: {
                    searchKey: config.searchKey,
                    functionName: config.functionName,
                    dataset: config.dataset,
                    searchValue: searchValue,
                    page: currentPage
                },
                callback: {
                    success: success,
                    failure: failure
                }
            };

            serverRequest(searchsettings);
        }

        /*
         *   populateFields()
         *
         *   Place selected address in form according to outputMap.
         */
        var populateFields = function (e) {
            debug('populateFields()');

            // execute our onSelect callback
            config.onSelect();

            // get the index of the address we selected.
            addressIndex = $('#selectAddress').val();
            debug('addressIndex: ' + addressIndex);

            if (addressIndex == 'undefined') {
                addressIndex = 0;
                debug('undefinedx');
            }

            debug(addresses.length);

            if (addresses.length === 1) {
                debug('length 1');

                var selectedAddress = addresses[0];
                debug('length ' + addresses.length);
            } else {
                // get it from the array of addresses using index   
                debug('lengthmore than 1');
                debug('length ' + addresses.length);
                var selectedAddress = addresses[addressIndex];
            }


            debug('Selected:');
            debug(selectedAddress);
            debug(addresses, 2);
            debug('addressIndex: ' + addressIndex);

            debug('MAP');
            debug(config.outputMap.fields, 2);

            // map selected address to outputMap
            for (var i in config.outputMap.fields) {
                var field = config.outputMap.fields[i];


                if (typeof (field.dataIndex) === "number") {
                    debug('Field: ' + field.id + ' dataIndex ' + field.dataIndex);
                    debug('NUMER BRANCH');
                    debug(selectedAddress, 2);

                    $('#' + field.id).val(selectedAddress[(field.dataIndex)]);
                }
                else if (typeof (field.dataIndex) === "object") {
                    var addressLine = [];
                    debug('OBJECT BRANCH');
                    $.each(field.dataIndex, function (index, value) {
                        if (selectedAddress[value] && selectedAddress[value] !== "") {
                            addressLine.push(selectedAddress[value]);
                        }
                    });
                    $('#' + field.id).val(addressLine.join(config.outputMap.appendText));
                }
            }

            // execute postPopulate callback
            config.postPopulate();
        };


        var isRemoteURL = function (url) {
            debug('isRemoteURL(' + url + ')');

            if (url.indexOf("http://") == -1) {
                return false;
            }

            url = parseURL(url, 'PHP_URL_HOST');

            return !(url == window.location.host);
        }

        /**
         *   Function: parseURL
         *
         *   Parse a URL and return it's components
         *
         *   Parameters:
         *
         *       str - the url
         *       component - determines which part of the URL you want to be returned
         *
         *   Returns:
         *
         *       The part of the url requested
         *
         *   Source:
         *
         *       <http://phpjs.org>
         */
        var parseURL = function (str, component) {
            var o = {
                strictMode: false,
                key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                q: {
                    name: "queryKey",
                    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                },
                parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-protocol to catch file:/// (should restrict this)
                }
            };

            var m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
                uri = {},
                i = 14;
            while (i--) {
                uri[o.key[i]] = m[i] || "";
            }

            switch (component) {
                case 'PHP_URL_SCHEME':
                    return uri.protocol;
                case 'PHP_URL_HOST':
                    return uri.host;
                case 'PHP_URL_PORT':
                    return uri.port;
                case 'PHP_URL_USER':
                    return uri.user;
                case 'PHP_URL_PASS':
                    return uri.password;
                case 'PHP_URL_PATH':
                    return uri.path;
                case 'PHP_URL_QUERY':
                    return uri.query;
                case 'PHP_URL_FRAGMENT':
                    return uri.anchor;
                default:
                    var retArr = {};
                    if (uri.protocol !== '') {
                        retArr.scheme = uri.protocol;
                    }
                    if (uri.host !== '') {
                        retArr.host = uri.host;
                    }
                    if (uri.port !== '') {
                        retArr.port = uri.port;
                    }
                    if (uri.user !== '') {
                        retArr.user = uri.user;
                    }
                    if (uri.password !== '') {
                        retArr.pass = uri.password;
                    }
                    if (uri.path !== '') {
                        retArr.path = uri.path;
                    }
                    if (uri.query !== '') {
                        retArr.query = uri.query;
                    }
                    if (uri.anchor !== '') {
                        retArr.fragment = uri.anchor;
                    }
                    return retArr;
            }
        }


        /*
         *   displayWarning()
         *
         *   Shows warnings to user.
         */
        var displayWarning = function (message) {
            debug(message);
            if (typeof config.customWarning === 'function') {
                config.customWarning(message);
            }
        }

        /*
         *
         *   displayError()
         *
         *   Shows errors to user. If debug mode is false, generic error used.
         */
        var displayError = function (message) {
            debug(message);
            if (typeof config.customError === 'function') {
                config.customError(message);
            }
        }

        /*
         *   error(message);
         *
         *   Shows an error, one way or another.
         */
        var error = function (message) {
            debug(message);
            if (typeof config.customError === 'function') {
                config.customError(message);
            }
        };

        /*
         *   debug(message, output type <optional>)
         *
         *   Display debug messages
         */
        var debug = function (msg, code) {
            if (config.debug) {
                switch (code) {
                    case 1: // proper error
                        console.error("WA->" + msg);
                        break;
                    case 2: // information (writes out objects as strings)
                        console.log("WA->OBJECT:");
                        console.info(msg);
                        break;
                    case 3: // standard log message
                        console.log("WA->" + msg);
                        break;
                    default:
                        console.info("WA->" + msg);
                }
            }
        };

        //return init.call(self);
        return this.each(function () {
            init();
        });
    };
}(jQuery));