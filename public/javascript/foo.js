$(document).ready(function() {
    $("#searchbutton").click(searchMovie);
    var movieTitle = $("#movietitle");
    function searchMovie()
    {
        var title = movieTitle.val();
        $.get('/searchmovie?title=' + escape(title), function (movies) {
            console.log('success,movies');
            $('#myTable').html(movies);
        });
    };
});
