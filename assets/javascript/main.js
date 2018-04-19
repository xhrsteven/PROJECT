
var idArray1 = localStorage.getItem('id').replace(/[' "]+/g, '');
var idArray = idArray1.replace(/[\[\]']+/g, '');


// var idArray = JSON.parse(localStorage.getItem('idlist'));
console.log(idArray);

// $.ajax({
//   type:"GET",
//   url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword=&apikey=vP8HIpf3zmjHbqSczAEciZsvep9p5Asw",
//   async:true,
//   dataType: "json",
//   success: function(json) {
              
//               console.log(json);
//               for (let i = 0; i < json._embedded.events[i].id.length; i++) { 
               
//               var eventID = json._embedded.events[i].id; };
//               console.log(eventID);
              
//               eventDetails(eventID)
//               // Parse the response.
              
//               // Do other things.
//            }
// });
eventDetails(idArray);

function eventDetails(idArray){

  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events/" + idArray + ".json?apikey=vP8HIpf3zmjHbqSczAEciZsvep9p5Asw",
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                var imgURL = json.images[1].url;
                var imgU = $('<img>');
                imgU.attr('src', imgURL); 
                $('#pic').append(imgU);
              
                var eventName = json.name;
                var eventUrl = json.url;
                var venue = json._embedded.venues[0];

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
                // console.log(lat);
                // console.log(long);

                $("#eventName").append(eventName);
                $("#eventDate").append(json.dates.start.localDate);
                $("#eventTime").append(json.dates.start.localTime);
                $("#eventPrice").append("$" + json.priceRanges[0].min + " - " + "$" + json.priceRanges[0].max)
                $("#eventLocation").append(json._embedded.venues[0].name);
                $("#eventAddress").append(venue.address.line1 + "," + venue.city.name + "," + venue.state.name + "," + venue.state.stateCode);
                $("#eventGenre").append(json.classifications[0].genre.name);
                $('#eventInfo').append(venue.generalInfo.generalRule);
                $("#buy").on("click", function() {
                  window.location = eventUrl;
                });
             }            
  });
};

$(".accordion-panel").animate({
  height: "show",
  paddingTop: "show",
  paddingBottom: "show",
  marginTop: "show",
  marginBottom: "show"
});
$(".accordion").on("click", ".accordion-control", function(e) {
  e.preventDefault();
  $(this)
    .next(".accordion-panel")
    .not(":animated")
    .slideToggle();
});
        
