// JavaScript Document
/*
function getExternalScript(url, callback) {
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   script.onreadystatechange = callback;
   script.onload = callback;

   document.getElementsByTagName('div')[0].appendChild(script);
}

getExternalScript('ajax.js', function(){
  console.log("Lat:" + latCoor);
});
*/


function initMap() {
        var orlando = {lat: 28.538, lng: -81.379};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: orlando
        });
        var marker = new google.maps.Marker({
          position: orlando,
          map: map
        });

        map.addListener('center_changed', function() {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(function() {
          map.panTo(marker.getPosition());
        }, 3000);
      });

      marker.addListener('click', function() {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
      });
  }

  $("#findrate").click(function(event){

   if(dest && rooms && adults && children && startdate && enddate){
  $.getJSON('https://hotwire.herokuapp.com/v1/search/hotel?apikey=23ckt6r6jbbgd2rc5e4rbb6y&format=JSON&dest==' +dest+ '&rooms=' +rooms+ '&adults=' +adults+ '&children=' +children+ '&sort=distance&startdate=' +startdate+ '&enddate='+enddate,  function(data){
    hoodID = data.Result[0].NeighborhoodId;
    console.log("hoodID = "+data.Result[0].NeighborhoodId);

    metaHoodID = data.MetaData.HotelMetaData.Neighborhoods[0].Id;
    console.log(data.MetaData.HotelMetaData.Neighborhoods[0].Id);

    if (hoodID == metaHoodID){
      centroidCoor = data.MetaData.HotelMetaData.Neighborhoods[0].Centroid;
      console.log(data.MetaData.HotelMetaData.Neighborhoods[0].Centroid);
      centroidArray = centroidCoor.split(",");
      latCoor = parseFloat(centroidArray[0]);
      lngCoor = parseFloat(centroidArray[1]);
      var destArray = dest.split(",");
      destLat = parseFloat(destArray[0]);
      destLng = parseFloat(destArray[1]);
    }

    console.log("global latcoor = "+latCoor+" global lngCoor = " +lngCoor);
    var hotel = {lat: latCoor, lng: lngCoor};
    var convention = {lat: destLat, lng: destLng};
    var marker = new google.maps.Marker({
      position: hotel,

      /*map: map*/
    });
        var labels ='AB';

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: hotel
        });
        var hotelMarker = new google.maps.Marker({
          position: hotel,
          map: map,
          label: labels[0]
        });

        var conMarker = new google.maps.Marker({
          position: convention,
          map: map,
          label: labels[1]
        })

        map.addListener('center_changed', function() {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(function() {
          map.panTo(marker.getPosition());
        }, 3000);
      });

      marker.addListener('click', function() {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
      });

  })
}})
