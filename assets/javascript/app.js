$('#searchBar').hide();

$('#searchConcerts').on('click', function() {
    $('#searchBar').show('slow');
    $('#searchConcerts').hide();
    var logo = $('#logo');
    logo.attr('style', 'width: 100px');
})

$('.myGenre').on('click', function(event) {
    event.preventDefault();
    $('#carousel').hide('slow');
    $('.eventImage').empty();
    var userInput = $(this).attr('data-genre');
    var priceMin = $('#price-min').val().trim();
    var priceMax = $('#price-max').val().trim();
    var city = $('#city').val().trim();
    

    var newUrl = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=" + userInput + "&limit=5&prices=" +  priceMin + "," + priceMax + "&city=" + city +  "&apikey=6AHBYWAdSZSjLGGMe3pKvtKLiPPGneD9";
    

$.ajax({
    type:"GET",
    url: newUrl,
    async:true,
    dataType: "json",
    success: function(json) {
        console.log(json._embedded);
            

            
            
            for (i = 0; i < json._embedded.events.length; i++) {
                (function(ii){
                    setTimeout(function(){
                        console.log(ii);
                    },1000);
                


                // var longitude = (json._embedded.events[i]._embedded.venues[0].location.longitude);
                // var latitude = (json._embedded.events[i]._embedded.venues[0].location.latitude);
            
                var eventImage = $('.eventImage');
            // a = $('#link');
            // a.attr('href', 'details.html');
            
            var img = $('<img>');
            img.attr('data-id', json._embedded.events[i].id);
            img.attr('src', json._embedded.events[i].images[0].url);
            
            img.attr('style', 'border: 2px solid white; width: 300px; height: 200px; margin-left: 10px; clear: both; margin-top: 10px');
            img.attr('class', 'imageBox');

            
            
            // var imgName = $('<p>' + json._embedded.events[i].name + '</p><p>' + json._embedded.events[i]._embedded.venues[0].name + '</p><p>' + json._embedded.events[i].dates.start.localDate + '</p><p>' + json._embedded.events[i].dates.start.localTime + '</p>');
            // imgName.attr('style', 'line-height: 40%; margin-top: 5px')
            
            eventImage.append(img);
            // eventImage.append(imgName);
            


            
            img.on("click", function() {
            localStorage.clear();
            let idPush = img.attr("data-id");
            window.location='details.html';
            localStorage.setItem("ID", JSON.stringify(idPush));
        })

    })(i);
        }
             },
             
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
            });



        });

