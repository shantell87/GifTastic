// $(function(){
//     renderButtons(artists, '.person-btn', '#buttonsView')

var artists = ["Adele", "Michael Jackson"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
$("button").on("click", function() {

    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=LD6nX1GHMQlF3fLtWdA3FN22QWSLem8n&limit=3";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $('#gifsView').prepend(gifDiv);
        }
    });
});

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
        a.addClass("person-btn");
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
$(document).on("click", ".person-btn", displayArtistInfo);


// Calling the renderButtons function to display the intial buttons
renderButtons();
