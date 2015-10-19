// Function to draw your map
var drawMap = function() {
	var map = L.map('map').setView([39, -98], 4);

  // Create a tile layer variable using the appropriate url
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {minZoom:0});

  // Add the layer to your map
	layer.addTo(map); 

  // Execute your function to get data
	getData(map);
}

// Function for getting data
var getData = function(map) {
  // Execute an AJAX request to get the data in data/response.js

  	$.ajax({
  		dataType:'json',
  		success: function(data) {

  			customBuild(data, map);
  		},
  		url: 'data/response.json'
  	});

}

  // When your request is successful, call your customBuild function


// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {

	var maleskilled = 0;
	var malesalive = 0;
	var otherskilled = 0;
	var othersalive = 0;
	
	var circlesize = 10; //circle radius is 6 for killed, changes to 3 for not killed
	// Be sure to add each layer to the map
	//male
	var malevictim = new L.LayerGroup([]);
	//female
	var femalevictim = new L.layerGroup([]);
	//unknown
	var unspecified = new L.layerGroup([]);


	var circlecolor = null;
	var addwhere = null;

	$.each(data, function() { 
		var lat = $(this).attr("lat");
		var lng = $(this).attr("lng");

		if ($(this).attr("Victim's Gender") == 'Male') {
			//if killed add to males killed 
			if ($(this).attr("Hit or Killed?") == 'Killed') {
				circlesize = 10;
				maleskilled++;
			} else { //if not killed add to males alive
				malesalive++;
				circlesize = 5;
			}
			circlecolor = 'blue';
			addwhere = malevictim;

		} else if ($(this).attr("Victim's Gender") == 'Female') {
			if($(this).attr("Hit or Killed?") == 'Killed'){
				circlesize = 10;
				otherskilled++;
			} else {
				othersalive++;
				circlesize = 5;
			}
			circlecolor = 'pink';
			addwhere = femalevictim;

		} else {
			//if killed, add to total women/other killed
			if($(this).attr("Hit or Killed?") == 'Killed') {
				otherskilled++;
			} else { //if not killed, add to total women/other alive
				othersalive++;
			}
			circlecolor = 'grey';
			addwhere = unspecified;

		} 

		//adds circle marker for each incident, at location given
		var circle = new L.circleMarker([lat,lng], {radius:circlesize, color:circlecolor});
		circle.addTo(addwhere);

		//link of information source for given incident
		var str = "View Source";
		var sourceLink = str.link($(this).attr('Source Link'));
	
		//adds popup for more information on incident story, and link
		circle.bindPopup($(this).attr("Summary") + sourceLink);


	});



	var genderOverlay = {
    	"Male" : malevictim,
    	"Female" : femalevictim,
    	"Unspecified" : unspecified
	};

	// Once layers are on the map, add a leaflet controller that shows/hides layers
	L.control.layers(null,genderOverlay).addTo(map);

	$("#malesalive").text(malesalive);
	$("#maleskilled").text(maleskilled);
	$("#othersalive").text(othersalive);
	$("#otherskilled").text(otherskilled);

  
}

