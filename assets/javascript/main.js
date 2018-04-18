
// localStorage.getItem('id',JSON.stringify(idArray));

$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword=&apikey=vP8HIpf3zmjHbqSczAEciZsvep9p5Asw",
  async:true,
  dataType: "json",
  success: function(json) {
              
              console.log(json);
              for (let i = 0; i < json._embedded.events[i].id.length; i++) { 
               
              var eventID = json._embedded.events[i].id; };
              console.log(eventID);
              
              eventDetails(eventID)
              // Parse the response.
              
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});

function eventDetails(idArray){
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events/" + idArray + ".json?apikey=vP8HIpf3zmjHbqSczAEciZsvep9p5Asw",
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                var imgURL = json.images[1].url;
                console.log(imgURL);
                var imgU = $('<img>');
                imgU.attr('src', imgURL);
                // imgU.attr('href', eventUrl);
                $('#pic').append(imgU);
              
                var eventName = json.name;
                var eventUrl = json.url;
                var lat = json._embedded.venues[0].location.latitude;
                var long = json._embedded.venues[0].location.longitude;

                var location = new google.maps.LatLng(lat, long);
                // var location ={lat: parseFloat(lat), lng: parseFloat(long) };

                var map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 4,
                  center: location
                });
                var marker = new google.maps.Marker({
                  position: location,
                  map: map
                });
                console.log(lat);
                console.log(long);

                $(".name").append(eventName);
                $(".dates").append(json.dates.start.localDate);
                $(".time").append(json.dates.start.localTime);
                $(".price").append("$" + json.priceRanges[0].min + " - " + "$" + json.priceRanges[0].max)
                $(".location").append(json._embedded.venues[0].name);
                $(".genre").append(json.classifications[0].genre.name);

             }            
  });
};


        
