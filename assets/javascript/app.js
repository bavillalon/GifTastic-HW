//initial topics for display
var topics=["golf", "bowling", "the office", "bob's burgers"];





//base url with my api key

var queryBase = "https://api.giphy.com/v1/gifs/search?api_key=VPc70e2jCohJsFF2F1ar0D1I77GUiNPO";

// variable whichCol to keep track of which column I'm using for my faux masonry layout
var whichCol=0;
//this queryGiphy functuon takes the tipic it's given and displays the associated gifs on the html. it's a faux masonry setup and looks great on
// regular screens. pn mobile screens it will display the first column and then the next and then the next which means it'll have as many of 4 in a row of the wrong topic.
// which probably isn't a big deal since it's basically just dumping stuff to the page.
function queryGiphy(inputTopic){
    var queryURL=queryBase+"&limit=10&q="+inputTopic;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        for (var i=0;i<10;i++){
            var gifDiv=$("<div>");
            var gifImg=$("<img>");
            var gifRating=$("<p>");
            //setting up the image wiht the proper attributes using object format. original still will be displayed first and then on hover it'll sisplay the animated one.
            gifImg.attr({
                "src": response.data[i].images.original_still.url,
                "data-status": "still",
                "data-still":response.data[i].images.original_still.url,
                "data-animate":response.data[i].images.original.url,
                "class":"gif img-fluid w-100",
                "data-hover":"none"
            });
            //add rating and then append the rating and image to the div. then add to the proper column for the faux masonry layout
            gifRating.text(response.data[i].rating.toUpperCase());
            gifDiv.append([gifImg,gifRating]);
            gifDiv.attr("class","gifDiv mb-3 p-2")
            switch(whichCol){
                case 0:
                    $("#gifCol-1").prepend(gifDiv);
                    whichCol++;
                    break;
                case 1:
                    $("#gifCol-2").prepend(gifDiv);
                    whichCol++;
                    break;
                case 2:
                    $("#gifCol-3").prepend(gifDiv);
                    whichCol=0;
                    break;
            };
        };
      });

};

//display all the buttons in an array of buttons
function displayButtons() {

    $("#buttonRow").empty();

    for (var i = 0; i < topics.length; i++) {

      var newButton = $("<button>");
      newButton.addClass("topic");
      newButton.attr("data-name", topics[i]);
      newButton.text(topics[i]);
      $("#buttonRow").append(newButton);
    };
  };


//on ready then we display the buttons all the page functions exist here.

$(document).ready(function(){
    displayButtons();
//on click of a add the button we add the topic asociated.
    $("#addTopic").on("click", function(event) {

        event.preventDefault();
        topics.push($("#topicInput").val());

        displayButtons();
      });
//on click of a button, we query giphy and display.
$("#buttonRow").on("click", "button", function(){
    queryGiphy($(this).attr("data-name"));
});
//on hover, we animate the gif. I'm having to use mouse enter and leave since I can't delegate with .hover. I need to delegate since it's a dynamially generated div.
$("#gifWall").on("mouseenter mouseleave",".gif",function(){
    switch ($(this).attr("data-status")){
        case "still":
            $(this).attr({
                "data-status":"animate",
                "src":$(this).attr("data-animate")
            });
            break;
        case "animate":
            $(this).attr({
                "data-status":"still",
                "src":$(this).attr("data-still")
            });
            break;
            
    };
    

});


});

