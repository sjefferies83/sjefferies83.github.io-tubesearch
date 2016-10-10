
// Set Variables
    $(function() {
        var searchField = $('.search-field');
        var icon = $('#search-btn');

        //Focus Event Handler
        $(searchField).on('focus', function () {
            $(this).animate({
                width: '100%'
            }, 400);
            $(icon).animate({
                right: '10px'
            }, 400);

        });
        // Blur Event Handler
        $(searchField).on('blur', function () {
          if(searchField.val() == ''){
              $(searchField).animate({
                  width:'45%'
              }, 400, function(){});
              $(icon).animate({
                  right:'360px'
              }, 400, function(){});
          };

        });
        // Prevents Form From Submitting
        $('#search-form').submit(function(e){
            e.preventDefault();
        });
    });

    function search(){
        // Clear Results
        $('#results').html('');
        $('#buttons').html('');

        // Get Form Input
        q = $('.search-field').val();

        // Run GET Request on API
        $.get(
            "https://www.googleapis.com/youtube/v3/search",{
                part: 'snippet, id',
                q: q,
                type: 'video',
                key: 'AIzaSyDC9cLj9jvGnQGrlW0FFgiiRVUFddLKtQg'},
                function(data){
                    var nextPageToken = data.nextPageToken;
                    var prevPageToken = data.prevPageToken;

                    console.log(data);

                    $.each(data.items, function(i, item){
                        // Get Output
                        var output = getOutput(item);

                        // Display Results
                        $('#results').append(output);
                    });
                    var buttons = getButtons(prevPageToken, nextPageToken);
                    // Display Buttons
                    $('#buttons').append(buttons);
                }
        )

    }

// Next Page Function
function nextPage(){

    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');
    // Clear Results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form Input
    q = $('#Query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyDC9cLj9jvGnQGrlW0FFgiiRVUFddLKtQg'},
        function(data){
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            console.log(data);

            $.each(data.items, function(i, item){
                // Get Output
                var output = getOutput(item);

                // Display Results
                $('#results').append(output);
            });
            var buttons = getButtons(prevPageToken, nextPageToken);
            // Display Buttons
            $('#buttons').append(buttons);
        }
    )
}

// Prev Page Function
function prevPage(){

    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
    // Clear Results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form Input
    q = $('#Query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyDC9cLj9jvGnQGrlW0FFgiiRVUFddLKtQg'},
        function(data){
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            console.log(data);

            $.each(data.items, function(i, item){
                // Get Output
                var output = getOutput(item);

                // Display Results
                $('#results').append(output);
            });
            var buttons = getButtons(prevPageToken, nextPageToken);
            // Display Buttons
            $('#buttons').append(buttons);
        }
    )
}

function getOutput(item){
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    // Build Output String
    var output = '<li>' +
                 '<div class="list-left">' +
                 '<img src="' + thumb + '">' +
                 '</div>' +
                 '<div class="list-right">' +
                 '<a href="http://www.youtube.com/embed/' + videoId + '"><h3>' + title + '</h3></a>' +
                 '<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
                 '<p>' + description + '</p>' +
                 '</div>' +
                 '</li>' +
                 '<div class="clearfix"></div>' +
                 '';
                 return output;


}

// Build The Buttons
function getButtons(prevPageToken, nextPageToken){
    if(!prevPageToken){
        var btnoutput = '<div class="button-container">' +
                        '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q +'"onclick="nextPage();">Next Page</button></div>';
    }else{
        var btnoutput = '<div class="button-container">' +
            '<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + q + '" onclick="prevPage();">Prev Page</button>' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '" onclick="nextPage();">Next Page</button></div>';
    }
    return btnoutput;
}
