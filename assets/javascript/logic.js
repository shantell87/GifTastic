//variables array
var artists = ["adele", "michael jackson"];

//giphy api pull
function displayArtistGif(){
    
    var search = $(this).attr("data-name");
    search.toLowerCase();
    var queryURL = `https://api.giphy.com/v1/gifs/search?q="${search}"&api_key=LD6nX1GHMQlF3fLtWdA3FN22QWSLem8n&limit=3`;
    
$.ajax({
    url: queryURL,
    method: "GET"
  })
//select buttons in array to produce giphys
.then (function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var image = $('<img>');
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        
        image.attr("src", still);
        image.attr("data-still", still);
        image.attr("src", animated);
        image.attr("data-animate", animated);
        image.addClass('searchImage');
        gifDiv.append(p);
        gifDiv.append(image);
        
        //dump the giphy in #gifs area
        $('.giphyView').prepend(gifDiv);
      }
})
}


//create buttons for the array

function renderButtons() {
    $('#buttonArea').empty();

//function for appending search items to the array
//create new buttons in buttonsArea

   //loops through array of artists
    for (var i = 0; i < artists.length; i++) {
        
        var a = $('<button>');
        // Adds a class of artist to our button
        a.addClass("artist");
        // Added a data-attribute
        a.attr('data-name', artists[i]);
        //a.attr("type", "button");
        // Provided the initial button text
        a.text(artists[i]);
        // Added the button to the buttons-view div
        $("#buttonArea").append(a);
    }
}


//when artist button is pushed
$('#add-artist').on("click", function(event){
    event.preventDefault();
    var action = $('#artist-input').val().trim();
    artists.push(action);

    renderButtons();
});

$(document).on('click', '.artist', displayArtistGif);
renderButtons();

//animate/still giphy actions
$('.giphyView').on('click', 'img',function(){
    var state =$(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state','animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state','still'); 
    }
})



