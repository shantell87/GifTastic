//variables array
var artists = ["Adele", "Michael Jackson"];

//create buttons for the array

function renderButtons() {
    $('#buttonArea').empty();

//function for appending search items to the array
//create new buttons in buttonsArea

   //loops through array of artists
    for (var i = 0; i < artists.length; i++) {
        
        var a = $('<button>');
        // Adds a class of artist to our button
        //a.addClass(artist);
        // Added a data-attribute
        //a.attr('data-name', artists[i]);
        a.attr("type", "button");
        // Provided the initial button text
        a.text(artists[i]);
        // Added the button to the buttons-view div
        $("#buttonArea").append(a);
    }
}
renderButtons();

//when artist button is pushed
$('#add-artist').on("click", function(event){
    event.preventDefault();
    var action = $('#artist-input').val().trim();
    artists.push(action);

    renderButtons();
});

$(document).on('click', '.artist', displayArtistGif);

//giphy api pull
function displayArtistGif(){
    var search = $(this).text();
    var queryURL = `https://api.giphy.com/v1/gifs/search?q="${search}"&api_key=LD6nX1GHMQlF3fLtWdA3FN22QWSLem8n&limit=3`;
    //`https://rest.bandsintown.com/artists/${artist}?app_id=codingbootcamp`
$.ajax({
    url: queryURL,
    method: "GET"
  })
//select buttons in array to produce giphys
.then (function(response) {
    for (var i = 0; i < response.data.length; i++) {
        var gifDiv = $("<div>").addClass('artist');
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animated = response.data[i].images.fixed_height.url;
        var still = response.data[i].images.fixed_height_still.url;
        var image = $('<img>');
        image.attr("src", still);
        image.attr("data-still", still);
        image.attr("src", animated);
        image.attr("data-animate", animated);
        image.addClass('searchImage');
        gifDiv.append(p);
        gifDiv.append(image);
        
        //dump the giphy in #gifs area
        $('.giphyView').append(gifDiv);
      }
})
}

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



