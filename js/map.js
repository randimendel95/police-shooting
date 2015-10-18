// Function to draw your map
var drawMap = function() {
	var map = L.map('map').setView([38, 97], 3);

  // Create a tile layer variable using the appropriate url
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {minZoom:0});

  // Add the layer to your map
	layer.addTo(map); 

  // Execute your function to get data
	getData();
}

// Function for getting data
var getData = function() {

  // Execute an AJAX request to get the data in data/response.js
  //var data = $.get('data/response.json';
  //var circle = L.circle([38,97], 20);
  // When your request is successful, call your customBuild function
  //.done(custombuild());
}

// Loop through your data and add the appropriate layers and points
var customBuild = function() {
	// Be sure to add each layer to the map
	//male
	window.alert("hello");
	var malevictim = new L.LayerGroup(['lat', 'lng'], 10, {color:'blue'});
	//female
	var femalevictim = new L.layerGroup(['lat', 'lng'], 10, {color:'pink'});
	//unknown
	var unspecified - new L.layerGroup(['lat', 'lng'], 10, {color:'gray'});

	$.each(data, {L.cirlce(['lat', 'lng'], 20, { 
		if ("victim's gender".equals('male') {
			this.addTo(malevictim);
		} else if ("victim's gender".equals('female')) {
			this.addTp(femalevictim);
		} else {
			this.addTo(unspecified);
		} 
	);.get

	malevictim.addTo(map);
	femalevictim.addTo(map);
	unspecified.addTo(map);

	
	// Once layers are on the map, add a leaflet controller that shows/hides layers
  
}

