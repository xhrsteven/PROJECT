$('#searchBar').hide();

$('#searchConcerts').on('click', function() {
    $('#searchBar').show('slow');
    $('#searchConcerts').hide();
    var logo = $('#logo');
    logo.attr('style', 'width: 100px');
})

$('#submit').on('click', function(event) {
    event.preventDefault();
    $('#carousel').hide('slow');
    $('.eventImage').empty();
    var userInput = $('#userInput').val().trim();
    var priceMin = $('#price-min').val().trim();
    var priceMax = $('#price-max').val().trim();
    var city = $('#city').val().trim();
    // var date = $('#date').val().trim();

    // var stringDate = date.toString();

    // newDate = moment(date).format("YYYY-MM-DD");
    

    console.log(userInput);
    console.log(priceMin);
    console.log(priceMax);
    console.log(city);
    // console.log(date);
    var newUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + userInput + "&limit=5&prices=" +  priceMin + "," + priceMax + "&city=" + city +  "&apikey=6AHBYWAdSZSjLGGMe3pKvtKLiPPGneD9";
    
    // + "&startDateTime=" + newDate 

$.ajax({
    type:"GET",
    url: newUrl,
    async:true,
    dataType: "json",
    success: function(json) {
        console.log(json._embedded);
            // console.log(json._embedded.events);
            // console.log(json._embedded.events[0].dates.start.localDate);
            // console.log(json._embedded.events[0]._embedded.venues[0].name);
            // console.log('The longitude is: ' + json._embedded.events[0]._embedded.venues[0].location.longitude);
            // console.log('The latitude is: ' + json._embedded.events[0]._embedded.venues[0].location.latitude);
            

            
            
            for (i = 0; i < 5; i++) {

                var longitude = (json._embedded.events[i]._embedded.venues[0].location.longitude);
                var latitude = (json._embedded.events[i]._embedded.venues[0].location.latitude);
            
                var eventImage = $('.eventImage');
                eventImage.attr('style', 'width:fit-content');
            a = $('#link');
            a.attr('href', 'details.html');
            
            var img = $('<img>');
            img.attr('data-id', json._embedded.events[i].id);
            var imgName = $('<p>' + json._embedded.events[i].name + '</p><p>' + json._embedded.events[i]._embedded.venues[0].name + '</p><p>' + json._embedded.events[i].dates.start.localDate + '</p>' + '</p><p>' + json._embedded.events[i].dates.start.localTime + '</p>');
            imgName.attr('style', 'line-height: 40%; margin-top: 5px')
            img.attr('src', json._embedded.events[i].images[0].url);
            img.attr('data-id', json._embedded.events[i].id);
            img.attr('style', 'width: 300px; height: 200px; margin-left: 10px; clear: both;');
            // img.attr('class', 'imageBox');
            eventImage.append(img);
            eventImage.append(imgName);
            
            // json._embedded.events[0].id
            img.on('click', function() {
            localStorage.clear();
            var idPush = img.attr('data-id');
            localStorage.setItem("ID", JSON.stringify(idPush));
        })

        /* <div class="row">
        <div class="col-sm-6 col-md-4">
            <div class="thumbnail">
            <img src="..." alt="...">
            <div class="caption">
                <h3>Thumbnail label</h3>
                <p>...</p>
                <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
            </div>
            </div>
        </div>
        </div> */



        }
             },
             
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
            });



        });



//   function init() {
//     // the mapOptions object contains the information to initialise the map to how we want it
//     var mapOptions = {
//         zoom: 14,
//         center: new google.maps.LatLng(latitude, longitude),
//         mapTypeId: google.maps.MapTypeId.ROADMAP,

//         panControl: false,
//         zoomControl: true,
//         zoomControlOptions: {
//             style: google.maps.ZoomControlStyle.SMALL,
//             position: google.maps.ControlPosition.TOP_RIGHT
//         },
//         mapTypeControl: true,
//         mapTypeControlOptions: {
//             style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
//             position: google.maps.ControlPosition.TOP_LEFT
//         },
//         scaleControl: true,
//         scaleControlOptions: {
//             position: google.maps.ControlPosition.TOP_CENTER
//         },
//         streetViewControl: false,
//         overviewMapControl: false
//     };
//     var venueMap = new google.maps.Map(document.getElementById('map'), mapOptions);
// }

// function loadScript() {
//     var script = document.createElement('script');
//     script.src = 'http://maps.googleapis.com/maps/api/js?AIzaSyDXQdwYkF8VGEH2ngWICRSZIdOd69ARa4E&sensor=false&callback=init';
//     document.body.appendChild(script);
// }

// window.onload = loadScript;

// })