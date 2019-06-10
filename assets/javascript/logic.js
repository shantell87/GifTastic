$(function(){
    renderButtons(artists, '.artist-btn', '#buttonsView')
})
var artists = ["Adele", "Michael Jackson"];


// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayArtistInfo() {

    var artist = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    artists + "&api_key=LD6nX1GHMQlF3fLtWdA3FN22QWSLem8n&limit=3";;

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        const $div = $('<div>').addClass('artist');
        const $p1 = $('<p>').text(`Rating: ${response.Rated}`);
       
        $div.append($p1);
        $('#gifsview').prepend($div);
    });

}

// Function for displaying movie data
function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttonsView").empty();

    // Loops through the array of movies
    for (var i = 0; i < artists.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("artist-btn");
        // Added a data-attribute
        a.attr("data-name", artists[i]);
        // Provided the initial button text
        a.text(artists[i]);
        // Added the button to the buttons-view div
        $("#buttonsView").append(a);
    }
}

// This function handles events where the add movie button is clicked
$("#add-artist").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var artist = $("#artists-input").val().trim();

    // The movie from the textbox is then added to our array
    artists.push(artist);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".artist-btn", displayArtistInfo);


// Calling the renderButtons function to display the intial buttons
renderButtons();
