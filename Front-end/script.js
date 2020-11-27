window.onload = function load(){

/*****************************************************MAPS*****************************************************************/	
	//Maps for displaying pickup and delivery points
	var display_pickup_map = L.map("display_pickup_location").setView([39.39870315600007, -99.41461918999994], 3);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	}).addTo(display_pickup_map);
	
	var display_delivery_map = L.map("display_delivery_location").setView([39.39870315600007, -99.41461918999994], 3);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	}).addTo(display_delivery_map);
	
	//Looking up a package on a map	
	var lookup_map = L.map('all_packages_map').setView([39.39870315600007, -99.41461918999994], 3);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	}).addTo(lookup_map);
	var markers_layer = L.layerGroup().addTo(lookup_map);
	
	//Map for Pickup
	var pickup_map = L.map('pickup_location').setView([39.39870315600007, -99.41461918999994], 3);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	}).addTo(pickup_map);
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
	
	//Map for choosing depot location
	var depot_map = L.map('depot_location').setView([39.39870315600007, -99.41461918999994], 3);	
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	}).addTo(depot_map);
	var depot_marker = L.layerGroup().addTo(depot_map);
	var depot_location;
	
	function onDepotMapClick(e){
		depot_marker.clearLayers();		
		var marker = L.marker(e.latlng, {icon: depot_Icon}).addTo(depot_marker);
		depot_location = e.latlng;
		depot_map.setView(e.latlng, 13);		
	}
	depot_map.on('click', onDepotMapClick);
	
	//Looking up a package on a map	
	var route_map = L.map('route_map').setView([39.39870315600007, -99.41461918999994], 3);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	}).addTo(route_map);
	var route_markers = L.layerGroup().addTo(route_map);
	var poly_markers = L.layerGroup().addTo(route_map);

	//Default color icon for markers
	var default_icon = L.divIcon({
		className: "my-custom-pin",
		iconAnchor: [0, 24],
		labelAnchor: [-6, 0],
		popupAnchor: [0, -36],
		html: `<span/>`
	});
	
	var depot_Icon = L.icon({
		iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
		shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
	
		iconSize:     [38, 95], // size of the icon
		shadowSize:   [50, 64], // size of the shadow
		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62],  // the same for the shadow
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	//Generate random color for a set of markers
	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	

/*****************************************************GEOCODING*************************************************************/	
		
	//Geocoding pickup
	var geocoder = L.esri.Geocoding.geocodeService();
	
	//Refresh map with new address
	document.getElementById("pickup_refresh").onclick = function(){
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
		pickup_marker.clearLayers();
		
		var marker = L.marker(e.latlng, {icon: default_icon}).addTo(pickup_marker);
		pickup_location = e.latlng;
		pickup_map.setView(e.latlng, 13);
		
		geocoder.reverse().latlng(e.latlng).run(function (error, result) {
			if (error) {
				return;
			}
			document.getElementById("pickup_address").value = result.address.LongLabel;	
		});
	}
	pickup_map.on('click', onPickupMapClick);
	
	//Geocoding delivery
	document.getElementById("delivery_refresh").onclick = function(){
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
		document.getElementById("type_form").style.display = "block";

		document.getElementById("sender_details").style.display = "none";
		document.getElementById("receiver_details").style.display = "none";
		document.getElementById("package_details").style.display = "none";
		document.getElementById("package_submitted").style.display = "none";
		
		document.getElementById("package_number_form").style.display = "none";
		document.getElementById("display_package_form").style.display = "none";
		document.getElementById("map_locations").style.display = "none";
		
		document.getElementById("vehicle_number_form").style.display = "none";
		document.getElementById("vehicle_details").style.display = "none";
		document.getElementById("vehicle_submitted").style.display = "none";
		document.getElementById("display_vehicle").style.display = "none";
		document.getElementById("display_route").style.display = "none";
	}
	document.getElementById("lookup_homepage").addEventListener("click", ReturnHome);
	document.getElementById("submitted_homepage").addEventListener("click", ReturnHome);
	document.getElementById("all_lookup_homepage").addEventListener("click", ReturnHome);
	document.getElementById("vehicle_submitted_homepage").addEventListener("click", ReturnHome);
	document.getElementById("display_vehicle_homepage").addEventListener("click", ReturnHome);
	
	//Looking up a package by number
	document.getElementById("lookup_button_open_form").onclick = function(){
		document.getElementById("type_form").style.display = "none";
		document.getElementById("package_number_form").style.display = "grid";
	}
	
	//Looking up a route by number
	document.getElementById("lookup_route").onclick = function(){
		document.getElementById("type_form").style.display = "none";
		document.getElementById("vehicle_number_form").style.display = "grid";
	}

	//Open send package form
	document.getElementById("send_button").onclick = function(){
		document.getElementById("type_form").style.display = "none";
		document.getElementById("sender_details").style.display = "grid";
		pickup_map.invalidateSize();
	}
	
	//Scrolling to the package formScrolling to the receiver form
	document.getElementById("next1").onclick = function(){
		//Checking if the values are filled in
		var pickup_name = document.getElementById("pickup_name");
		var pickup_address = document.getElementById("pickup_address")
		var pickup_date = document.getElementById("pickup_date");
		
		
		if(pickup_name && pickup_address &&  pickup_date && pickup_name.value!="" && pickup_address.value!="" && pickup_date.value!=""){
			var new_section = document.getElementById("receiver_details");
			delivery_map.invalidateSize();			
			new_section.style.display = "grid";
			delivery_map.invalidateSize();
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
	
	//Open add vehicle form
	document.getElementById("add_vehicle_button").onclick = function(){
		document.getElementById("type_form").style.display = "none";
		document.getElementById("vehicle_details").style.display = "grid";
		depot_map.invalidateSize();
	}


/******************************************** LOOK UP PACKAGE *****************************************************/

	//Filling out "display_package_form" from the passed json
	function display_json(data){
		display_package_form.style.display = "grid";
		display_pickup_map.invalidateSize();
		display_delivery_map.invalidateSize();
		
		//Displaying package info
		document.getElementById("display_package_id").innerText = data.id;
		document.getElementById("display_size").innerText = data.size;
		document.getElementById("display_weight").innerText = data.weight;
		
		//Displaying pickup details
		document.getElementById("display_pickup_name").innerText = data.pickup_details.name;
		document.getElementById("display_pickup_address").innerText = data.pickup_details.address;
		document.getElementById("display_pickup_date").innerText = data.pickup_details.date;
		
		var display_pickup_lat = Number(data.pickup_details.latlng.lat);
		var display_pickup_lng = Number(data.pickup_details.latlng.lng);
		var display_pickup_latlng = L.latLng(display_pickup_lat, display_pickup_lng);
		
		display_pickup_map.setView(display_pickup_latlng, 13);
		var display_pickup_markers = L.layerGroup().addTo(display_pickup_map);
		var display_pickup_marker = L.marker(display_pickup_latlng, {icon: default_icon}).addTo(display_pickup_markers);
		
		//Displaying delivery details
		document.getElementById("display_delivery_name").innerText = data.delivery_details.name;
		document.getElementById("display_delivery_address").innerText = data.delivery_details.address;
		document.getElementById("display_delivery_date").innerText = data.delivery_details.date;
		
		var display_delivery_lat = Number(data.delivery_details.latlng.lat);
		var display_delivery_lng = Number(data.delivery_details.latlng.lng);
		var display_delivery_latlng = L.latLng(display_delivery_lat, display_delivery_lng);
		
		display_delivery_map.setView(display_delivery_latlng, 13);
		var display_delivery_markers = L.layerGroup().addTo(display_delivery_map);
		var display_delivery_marker = L.marker(display_delivery_latlng, {icon: default_icon}).addTo(display_delivery_markers);
		
	}
	
	//Look up package by number
	document.getElementById("lookup_button").onclick = function Lookup_package(){
		var package_number = document.getElementById("package_number").value;
		if(package_number == null || package_number == ""){
			window.alert("Please enter the package number!");
			return;
		} else {	
			//Sending GET request
			var address = 'https://localhost:44306/api/Packages/'  + package_number.toString();
			fetch(address, {
				method: 'GET',
			})
				.then(response => response.json())
				.then(data => {
					//Hide other forms
					document.getElementById("package_number_form").style.display = "none";
					
					display_json(data);
				})
		}
	}
		
	
	//Displaying the info on the map
	document.getElementById("lookup_button_all").onclick = function Lookup_packages_map(){
		//Sending GET request
		var address = 'https://localhost:44306/api/Packages/';
		fetch(address, {
			method: 'GET',
		})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data);
				
				//Hide other forms
				document.getElementById("type_form").style.display = "none";
				document.getElementById("map_locations").style.display = "block";
				lookup_map.invalidateSize();

				//Adding markers and listeners
				markers_layer.clearLayers();
				for(var i = 0;  i < data.length; i++){	
					//Closure function to display current data
					var cur_data = data[i];
					function display(cur_data){						
						return function(){
							display_json(cur_data);
						}
					};
					
					//Generate random color
					var cur_color = getRandomColor();
					
					var icon = L.divIcon({
						className: "my-custom-pin",
						iconAnchor: [0, 24],
						labelAnchor: [-6, 0],
						popupAnchor: [0, -36],
						html: `<span style="background-color:${cur_color};" />`
					});
									
					//Create pickup marker
					var cur_pickup_lat = Number(cur_data.pickup_details.latlng.lat);
					var cur_pickup_lng = Number(cur_data.pickup_details.latlng.lng);					
					var cur_pickup_latlng = L.latLng(cur_pickup_lat, cur_pickup_lng);
					var cur_pickup_marker = L.marker(cur_pickup_latlng, {icon: icon, title: "pickup: " + cur_data.id}).addTo(markers_layer);

					cur_pickup_marker.on('click', display(cur_data));
					
					//Create delivery marker
					var cur_delivery_lat = Number(cur_data.delivery_details.latlng.lat);
					var cur_delivery_lng = Number(cur_data.delivery_details.latlng.lng);					
					var cur_delivery_latlng = L.latLng(cur_delivery_lat, cur_delivery_lng);
					var cur_delivery_marker = L.marker(cur_delivery_latlng, {icon: icon, title: "delivery: " + cur_data.id}).addTo(markers_layer);	

					cur_delivery_marker.on('click', display(cur_data));
					
					//Draw a line between markers
					var latlngs = Array();
					latlngs.push(cur_pickup_latlng);
					latlngs.push(cur_delivery_latlng);
					var polyline = L.polyline(latlngs, {color: cur_color}).addTo(lookup_map);
				}				
				console.log(markers_layer.getLayers().length);
			})
	}

/************************************************* LOOK UP ROUTES **********************************************************/
	//Filling out "display_package_form" from the passed json
	function display_route(data){
		//Displaying the vehicle info
		document.getElementById("display_vehicle_id").innerText = data.id;
		document.getElementById("display_capacity").innerText = data.capacity;
		document.getElementById("display_occupied").innerText = data.occupied;
		document.getElementById("display_depot").innerText = "(" + data.depot.lat + ", " + data.depot.lng + ")";
		
		route_markers.clearLayers();
		poly_markers.clearLayers();
		var endpoints = data.route;
		var cur_color = getRandomColor();
		
		//Depot
		var prev_latlng = L.latLng(endpoints[0].location.lat, endpoints[0].location.lng);
		var route_marker = L.marker(prev_latlng, {icon: depot_Icon, title: "Depot"}).addTo(route_markers);

		for(var i = 1;  i < data.route.length - 1; i++){	
			var cur_latlng = L.latLng(endpoints[i].location.lat, endpoints[i].location.lng);
			
			//Markers title
			if(endpoints[i].delivery == "false"){
				var state = "pick up for ";				
			} else {
				var state = "delivery for ";				
			}
			route_marker = L.marker(cur_latlng, {icon: default_icon, title: state + endpoints[i].package_id}).addTo(route_markers);
			
			//Draw a line between markers
			var latlngs = Array();
			latlngs.push(cur_latlng);
			latlngs.push(prev_latlng);
			var polyline = L.polyline(latlngs, {color: cur_color}).addTo(poly_markers);
			
			prev_latlng = cur_latlng;
		}
		
		//Depot
		var depot_end = L.latLng(endpoints[data.route.length - 1].location.lat, endpoints[data.route.length - 1].location.lng);
		var route_marker = L.marker(depot_end, {icon: depot_Icon, title: "Depot"}).addTo(route_markers);
		var latlngs = Array();
		latlngs.push(depot_end);
		latlngs.push(prev_latlng);
		var polyline = L.polyline(latlngs, {color: "#50c5e6"}).addTo(poly_markers);
	}
	
	
	//Look up route by number
	document.getElementById("lookup_route_button").onclick = function(){
		var vehicle_number = document.getElementById("vehicle_number").value;
		if(vehicle_number == null || vehicle_number == ""){
			window.alert("Please enter the vehicle number!");
			return;
		} else {	
			//Sending GET request
			var address = 'https://localhost:44306/api/Vehicles/'  + vehicle_number.toString();
			fetch(address, {
				method: 'GET',
			})
				.then(response => response.json())
				.then(data => {
					console.log(data);
					//Hide other forms
					document.getElementById("vehicle_number_form").style.display = "none";
					document.getElementById("display_vehicle").style.display = "grid";
					document.getElementById("display_route").style.display = "block";
					route_map.invalidateSize();
					
					display_route(data);
				})
		}
	}
		 

/***************************************************SUBMITTING*************************************************************/					
	//Send the package data to the server
	document.getElementById("submit_package").onclick = function Send_package_data(){
		//Constructing JSON		
		const data = { 
			"id":"1", 
			"pickup_details": {
				"name": document.getElementById("pickup_name").value,
				"address": document.getElementById("pickup_address").value,
				"latlng": {
					"lat": pickup_location.lat,
					"lng": pickup_location.lng
				},				
				"date": document.getElementById("pickup_date").value
			},
			"delivery_details": {
				"name": document.getElementById("delivery_name").value,
				"address": document.getElementById("delivery_address").value,
				"latlng": {
					"lat": delivery_location.lat,
					"lng": delivery_location.lng
				},
				"date": document.getElementById("delivery_date").value
			},
			"size": document.getElementById("size").value,
			"weight": document.getElementById("weight").value		
		};
		
		console.log(JSON.stringify(data));
		
		fetch('https://localhost:44306/api/Packages', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data.toString());
				document.getElementById("sender_details").style.display = "none";
				document.getElementById("receiver_details").style.display = "none";
				document.getElementById("package_details").style.display = "none";
				document.getElementById("package_submitted").style.display = "grid";
				document.getElementById("success").textContent = "Package has been submitted successfully! Package number is ";
				document.getElementById("success").textContent = document.getElementById("success").textContent + data;
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	}
	
	//Send the vehicle data to the server
	document.getElementById("submit_vehicle").onclick = function(){
		//Constructing JSON	
		if(document.getElementById("capacity").value!="")	
		{
		const data = { 
			"capacity": document.getElementById("capacity").value,
			"lat": depot_location.lat,
			"lng": depot_location.lng
		};
		
		console.log(JSON.stringify(data));
		
		fetch('https://localhost:44306/api/Vehicles', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data.toString());
				document.getElementById("vehicle_details").style.display = "none";
				document.getElementById("vehicle_submitted").style.display = "grid";
				var successstring = "Vehicle has been submitted successfully! Vehicle number is ";
				document.getElementById("vehicle_success").textContent = successstring + data;
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	}
	
else
{
	alert("Enter capacity");
}
} 

}



