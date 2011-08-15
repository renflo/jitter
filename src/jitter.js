// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    // Asynchronously our PersonTemplate's content.
    $.get('tweet-template.html', function(htmlTemplateAsString) {

        getTwitters('tweets', { 
                    id: 'johncleese', 
                    count: 10, 
                    enableLinks: true, 
                    ignoreReplies: true, 
                    clearContents: true,
                    template:htmlTemplateAsString
        });
    });
} else {
    alert('The File APIs are not fully supported in this browser.');
}