// Chrome will have to be started with --allow-file-access-from-files
// This fixes the SOP for firefox
if (navigator.userAgent.indexOf("Firefox") != -1) {
    try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
    } 
    catch (e) {
        alert("Permission UniversalBrowserRead denied -- not running Mozilla?");
    }
}


// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    // Asynchronously our PersonTemplate's content.
    $.get('tweet-template-jquery-mobile.html', function(htmlTemplateAsString) {

        getPublicTimeLine({
            target: '#tweets',
            queryUrl: 'http://api.twitter.com/1/statuses/public_timeline.json?callback=?',
            template: htmlTemplateAsString
        });
    }, "html");
}
else {
    alert('The File APIs are not fully supported in this browser.');
}

function getPublicTimeLine(options) {
    // Creating the template object
    $.template( "publicTimelineTemplate", options.template );    
    

    // get the json file
    $.getJSON(options.queryUrl, function(json) {
        // this is where we can loop through the results in the json object
        // Convert the markup string into a named template
        var list = $(options.target).html('<ul id="generated_list" data-role="listview" data-theme="g"></ul>').find('ul');;
        var toAppend = $.tmpl("publicTimelineTemplate", json);
        list.append(toAppend);
    })
    .complete(function() {
        $('#generated_list').listview();
    });
}