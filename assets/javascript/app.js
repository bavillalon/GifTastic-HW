var topics=["golf", "bowling", "the office", "bob's burgers"];







var queryBase = "https://api.giphy.com/v1/gifs/search?api_key=VPc70e2jCohJsFF2F1ar0D1I77GUiNPO";

//$.ajax({
//  url: queryURL,
//  method: "GET"
//}).then(function(response) {
//  console.log(response);
//});
var whichCol=0;
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
            gifImg.attr({
                "src": response.data[i].images.original_still.url,
                "data-status": "still",
                "data-still":response.data[i].images.original_still.url,
                "data-animate":response.data[i].images.original.url,
                "class":"gif img-fluid w-100",
                "data-hover":"none"
            });
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




$(document).ready(function(){
    displayButtons();

    $("#addTopic").on("click", function(event) {

        event.preventDefault();
        topics.push($("#topicInput").val());

        displayButtons();
      });

$("#buttonRow").on("click", "button", function(){
    queryGiphy($(this).attr("data-name"));
});

$("#gifWall").on("click",".gif",function(){
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

$("#gifWall").on("mouseenter mouseleave","div",function(){
    if($(this).children("img").attr("data-hover")==="none"){
        $(this).children("img").attr("data-hover","download");
        $(this).append("<a href=" + $(this).children("img").attr("data-animate") + " download=giphy>Download</a>");
    }
    else{
        $(this).children("img").attr("data-hover","none");
        $(this).children("a").remove();
    };
});

});

