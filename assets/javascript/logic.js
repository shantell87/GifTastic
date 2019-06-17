// $(function () {
//     renderButtons(artists, 'searchButton','#buttonsView');
// })

var artists = ["Adele", "Michael Jackson"];

//capture artist name function
//function alertArtistName() {
function displayArtistInfo(){
    
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=LD6nX1GHMQlF3fLtWdA3FN22QWSLem8n&limit=3";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var results = response.data;

            // for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>").addClass('artist');
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var image = $('<img>');
                image.attr("src", results[i].images.fixed_height.url);
                image.attr("data-animate", results[i].images.fixed_height.url);
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-state", 'still');
                gifDiv.append(p);
                gifDiv.append(image);
                $('#gifs').append(gifDiv);
              
            // }
        })
}

//buttons for displaying artists
function renderButtons() {
    $("#buttonsView").empty();

    //loops through array of artists
    for (var i = 0; i < artists.length; i++) {
        var a = $('<button>');
        // Adds a class of artist to our button
        a.addClass('artist');
        // Added a data-attribute
        a.attr('data-name', artists[i]);
        // Provided the initial button text
        a.text(artists[i]);
        // Added the button to the buttons-view div
        $("#buttonsView").append(a);
    }
}

//add new buttons when an artist is searched and submitted from the form
$('#add-artist').on('click', function (event) {
    event.prependDefault();
    var artist = $("#artist-input").val().trim();
    artists.push(artist);
    renderButtons();
});
 // Adding click event listeners to all elements with a class of "artist"
 $(document).on("click", ".artist", displayArtistInfo);


 // Calling the renderButtons function to display the intial buttons
 renderButtons();


//image animation on click and still when unclicked
$(document).on('click', '.searchImage', function () {
    var state = $(this).attr('data-state');
    //switching from an animated state to a still state
    if (state == 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})
