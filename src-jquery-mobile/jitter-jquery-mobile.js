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
    });
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
        $(options.target).html('<ul>');
        var toAppend = $.tmpl("publicTimelineTemplate", json);
        $(options.target).append(toAppend);
        $('</ul>').appendTo(options.target);
    });
}