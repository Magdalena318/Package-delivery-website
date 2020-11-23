window.onload = function load(){

/*****************************************************MAPS*****************************************************************/
	//Tiles
	var tile = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	});
	
	//Map for Pickup
	var pickup_map = L.map('pickup_location').setView([39.39870315600007, -99.41461918999994], 3);
	tile.addTo(pickup_map);
	var pickup_marker = L.layerGroup().addTo(pickup_map);
	var pickup_location;
	
	//Map for Delivery
	var delivery_map = L.map('delivery_location').setView([39.39870315600007, -99.41461918999994], 3);	
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	}).addTo(delivery_map);
	var delivery_marker = L.layerGroup().addTo(delivery_map);
	var delivery_location;
	
	//Default color icon for markers
	var default_icon = L.divIcon({
		className: "my-custom-pin",
		iconAnchor: [0, 24],
		labelAnchor: [-6, 0],
		popupAnchor: [0, -36],
		html: `<span/>`
	});

/*****************************************************GEOCODING*************************************************************/	
		
	//Geocoding pickup
	var geocoder = L.esri.Geocoding.geocodeService();
	
	//Refresh map with new address
	document.getElementById("pickup_refresh").onclick = function Pickup_refresh(){
		var pickup_address = document.getElementById("pickup_address").value;

		if(pickup_address != null && pickup_address != ""){
			L.esri.Geocoding.geocode().text(pickup_address).run(function (error, response) {
				if (error) {
					console.log(err);
					window.alert("The provided address can not be found!");
					return;
				}
				
				var latlng = response.results[0].latlng;
				pickup_map.setView(latlng, 13)
				pickup_marker.clearLayers();
				var marker = L.marker(latlng, {icon: default_icon}).addTo(pickup_marker);
				pickup_location = latlng;
			});
			
		}

	}
	
	
	//Reverse geocoding pickup	
	function onPickupMapClick(e) {
		console.log("check");
		pickup_marker.clearLayers();
		
		var marker = L.marker(e.latlng, {icon: default_icon}).addTo(pickup_marker);
		pickup_location = e.latlng;
		pickup_map.setView(e.latlng, 13);
		console.log(e.latlng);
		
		geocoder.reverse().latlng(e.latlng).run(function (error, result) {
			if (error) {
				return;
			}
			console.log(result);
			document.getElementById("pickup_address").value = result.address.LongLabel;	
		});
	}
	pickup_map.on('click', onPickupMapClick);
	
	//Geocoding delivery
	document.getElementById("delivery_refresh").onclick = function Delivery_refresh(){
		var delivery_address = document.getElementById("delivery_address").value;
		
		//Creating address string
		if(delivery_address != null && delivery_address != ""){
			L.esri.Geocoding.geocode().text(delivery_address).run(function (error, response) {
				if (error) {
					console.log(err);				
					window.alert("The provided address can not be found!");
					return;
				}
				console.log(response.results[0].latlng);
				
				var latlng = response.results[0].latlng;
				delivery_map.setView(latlng, 13)
				delivery_marker.clearLayers();
				var marker = L.marker(latlng, {icon: default_icon}).addTo(delivery_marker);
				delivery_location = latlng;
			});
			
		}
	}
	
	//Reverse geocoding delivery
	function onDeliveryMapClick(e) {
		delivery_marker.clearLayers();
		
		var marker = L.marker(e.latlng, {icon: default_icon}).addTo(delivery_marker);
		delivery_location = e.latlng;
		delivery_map.setView(e.latlng, 13);
		
		geocoder.reverse().latlng(e.latlng).run(function (error, result) {
			if (error) {
				return;
			}
			
			document.getElementById("delivery_address").value = result.address.LongLabel;	
		});
	}
	delivery_map.on('click', onDeliveryMapClick);
	
	/*********************************************** OPEN/CLOSE FORMS ****************************************************/
	
	//Returning to the homepage
	function ReturnHome(){
		document.getElementById("sender_details").style.display = "none";
		document.getElementById("receiver_details").style.display = "none";
		document.getElementById("package_details").style.display = "none";
	}
	

	//Scrolling to the package formScrolling to the receiver form
	document.getElementById("next1").onclick = function(){
		//Checking if the values are filled in
		var pickup_name = document.getElementById("pickup_name");
		var pickup_address = document.getElementById("pickup_address")
		var pickup_date = document.getElementById("pickup_date");
		
		
		if(pickup_name && pickup_address &&  pickup_date && pickup_name.value!="" && pickup_address.value!="" && pickup_date.value!=""){
			var new_section = document.getElementById("receiver_details");
			new_section.style.display = "grid";
			new_section.scrollIntoView(true);
		} else {
			alert("Please fill in the required fields.")
		}
		
	}
	
	//Scrolling to the package form
	document.getElementById("next2").onclick = function(){
		//Checking if the values are filled in
		var delivery_name = document.getElementById("delivery_name");
		var delivery_address = document.getElementById("delivery_address")
		var delivery_date = document.getElementById("delivery_date");
		
		
		if(delivery_name && delivery_address && delivery_date && delivery_name.value!="" && delivery_address.value!="" && delivery_date.value!=""){
			var new_section = document.getElementById("package_details");
			new_section.style.display = "grid";
			new_section.scrollIntoView(true);
		} else {
			alert("Please fill in the required fields.")
		}
	}
	
	
	
}


