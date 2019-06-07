//Initial array for artists
var artists = ["Adele", "Michael Jackson"];

//capture artist name function
function alertartistName(){
}

//function for displaying artists input
//Deleting previous input prior to new input. No repeats
function renderButtons() {
    $("#buttons-view").empty();

    //loop through the array of artists
for (var i = 0; i < artists.length; i++) {
    var a = $("<button>");
    // Adding a class
    a.addClass("artist");
    // Added a data-attribute
    a.attr("data-name", artists[i]);
    // Provided the initial button text
    a.text(artists[i]);
    // Added the button to the HTML
    $("#buttons-view").append(a); 
}
}

//click button function
$("#add-artist").on("click", function(event){
    event.preventDefault();
//grabs the input from the textbox; adding button array
    var artist = $("#artists-input").val().trim();
    artists.push(artist);
    renderButtons();
})
$(document).on("click", ".artist", alertartistName);
renderButtons();

$("button").on("click", function() {
    var person = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=LD6nX1GHMQlF3fLtWdA3FN22QWSLem8n&limit=3";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

           var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var artistImage = $("<img>");
          artistImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(artistImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  

})
