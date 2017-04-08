var latCoor;
var lngCoor;
var apiurl = "http://api.hotwire.com/v1/search/hotel";
var apikey = "23ckt6r6jbbgd2rc5e4rbb6y";
var format = "JSON";
var dest ;
var distance = "*~2" ;
var rooms ;
var adults ;
var children ;
var startdate ;
var enddate ;
var conselected;
var adultsselected;
var hoodID;
var metaHoodID;
var centroid;
var centroidArray;
var name;
var stars;
var rate;
var total;
var savings;
var recommendation;
$(document).ready(function(){

$('#map').hide();

				$('input:radio[name=convention]').click(
					function(){
						conselected = $(this).val();

						if (conselected == "megacon") {
							startdate = "05/25/2017";
							enddate = "05/28/2017";
							dest = "28.4247,-81.4695";
							console.log(conselected,startdate,enddate,dest,adults,children,rooms);

						}

						else if (conselected == "supercon"){
							startdate = "07/27/2017";
							enddate = "07/30/2017";
							dest = "26.0988,-80.1229";
							console.log(conselected,startdate,enddate,dest,adults,children,rooms);
						}

						else if (conselected == "metrocon"){
							startdate = "08/03/2017";
							enddate = "08/06/2017";
							dest = "27.9420,-82.4556";
							console.log(conselected,startdate,enddate,dest,adults,children,rooms);
						}

			});

					$('input:radio[name=adults]').click(
						function(){
						adults = $(this).val();
						console.log(conselected,startdate,enddate,dest,adults,children,rooms);
					});


			$('input:radio[name=children]').click(
				function(){
				children = $(this).val();
				console.log(conselected,startdate,enddate,dest,adults,children,rooms);
			});

			$('input:radio[name=rooms]').click(
				function(){
				rooms = $(this).val();
				console.log(conselected,startdate,enddate,dest,adults,children,rooms);
			});

	 $("#findrate").click(function(event){

		 if(dest && rooms && adults && children && startdate && enddate){
		 /*event.preventDefault();*/
		 $("#map").hide();
		 $("#preloader").empty();
		 $("#warning").empty();
		 $("#hotellink").empty();
		 $("#statusmessage").empty();
		 $("#name").empty();
		 $("#preloader").append("<br><p class='animated infinite fadeIn'>Please wait while we find the best value for you...</p><br><img src='images/ring-alt.svg'/>")
		 console.log ('https://hotwire.herokuapp.com/v1/search/hotel?apikey=23ckt6r6jbbgd2rc5e4rbb6y&format=JSON&dest==' +dest+ '&rooms=' +rooms+ '&adults=' +adults+ '&children=' +children+ '&sort=distance&startdate=' +startdate+ '&enddate='+enddate);
      $.getJSON('https://hotwire.herokuapp.com/v1/search/hotel?apikey=23ckt6r6jbbgd2rc5e4rbb6y&format=JSON&dest==' +dest+ '&rooms=' +rooms+ '&adults=' +adults+ '&children=' +children+ '&sort=distance&startdate=' +startdate+ '&enddate='+enddate,  function(data){
				 hoodID = data.Result[0].NeighborhoodId;
				 console.log("hoodID = "+data.Result[0].NeighborhoodId);

				 metaHoodID = data.MetaData.HotelMetaData.Neighborhoods[0].Id;
				 console.log(data.MetaData.HotelMetaData.Neighborhoods[0].Id);

				 if (hoodID == metaHoodID){
					 name = data.MetaData.HotelMetaData.Neighborhoods[0].Name;
					 console.log(data.MetaData.HotelMetaData.Neighborhoods[0].Name);
					 centroidCoor = data.MetaData.HotelMetaData.Neighborhoods[0].Centroid;
					 console.log(data.MetaData.HotelMetaData.Neighborhoods[0].Centroid);
					 stars = data.Result[0].StarRating;
				 	 rate = data.Result[0].AveragePricePerNight;
					 rooms = data.Result[0].Rooms;
				 	 total = data.Result[0].TotalPrice;
				 	 savings = data.Result[0].SavingsPercentage;
					 recommendation = data.Result[0].RecommendationPercentage;
					 centroidArray = centroidCoor.split(",");
					 latCoor = parseFloat(centroidArray[0]);
					 lngCoor = parseFloat(centroidArray[1]);
					 console.log(latCoor , lngCoor);
					 $("#preloader").empty();
					 $("#statusmessage").append("<p class='animated zoomIn'>Great News! We found a hotel for you!</p>");
					 $("#name").append("<p>Your check-in date will be on " +startdate+ " and your check-out date will be on " +enddate+ ".<br> Your hotel will be in the " + name + " area.<br>It is has a " +stars+ " star rating.<br>You'll be paying about $"+rate+" per night for "+rooms+" room(s) with a total price of $"+total+".<br>If you book this room now you'll be saving "+savings+"%.<br>"+recommendation+"% of people who have stayed here recommend this hotel!<br><br>Your hotel will be located around the area on the map, indicated by the 'A' marker.<br>The convention center is indicated by the 'B' marker. </p>");
					 $("#map").show();


				 }
				 else{
					 console.log ("There is a problem");
				 }

         console.log(data.Result[0].DeepLink);
				 $("#hotellink").append("<p><a class='waves-effect waves-light btn orange darken-2' href=" + data.Result[0].DeepLink + " target='_blank'>Book Now</a></p>");

			 })
		 }
			 else {
			 	event.preventDefault();
				$("#warning").empty();
				$("#warning").append("<p class='red-text text-accent-2 center-align' >You haven't selected all the fields.<br>Please make sure all options are selected including the convention you're attending, number of adults, children, and rooms.</p>");
				console.log ("You haven't selected all the fields. Please make sure all options are selected.");

      }
   });
});
