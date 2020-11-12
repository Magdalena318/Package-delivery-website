window.onload = function load(){
	
/***************************************************** LOOK UP PACKAGE *****************************************************************/
	
	//Default color icon for markers
	var default_icon = L.divIcon({
		className: "my-custom-pin",
		iconAnchor: [0, 24],
		labelAnchor: [-6, 0],
		popupAnchor: [0, -36],
		html: `<span/>`
	});
					
	//Maps for displaying pickup and delivery points
	var display_pickup_map = L.map("display_pickup_location");
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	}).addTo(display_pickup_map);
	
	var display_delivery_map = L.map("display_delivery_location");
		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	}).addTo(display_delivery_map);

	//Filling out "display_package_form" from the passed json
	function display_json(data){
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
		
		display_package_form.style.display = "grid";
	}
	
	//Look up by number
	document.getElementById("lookup_button").onclick = function Lookup_package(){
		var package_number = document.getElementById("package_number").value;
		if(package_number == null || package_number == ""){
			window.alert("Please enter the package number!");
			return;
		} else {	
			//Sending GET request
			var address = 'https://localhost:44329/api/Packages/'  + package_number.toString();
			fetch(address, {
				method: 'GET',
			})
				.then(response => response.json())
				.then(data => {
					//Hide other forms
					document.getElementById("package_number_form").style.display = "none";
					document.getElementById("sender_details").style.display = "none";
					document.getElementById("receiver_details").style.display = "none";
					document.getElementById("package_details").style.display = "none";
					
					display_json(data);
				})
		}
	}
	
	//Looking up a package on a map
	
	var lookup_map = L.map('all_packages_map').setView([0.0, 50], 1);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	}).addTo(lookup_map);
	var markers_layer = L.layerGroup().addTo(lookup_map);
	
	//Generate random color for a set of markers
	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
		
	
	//Displaying the info on the map
	document.getElementById("lookup_button_all").onclick = function Lookup_packages_map(){
		//Sending GET request
		var address = 'https://localhost:44329/api/Packages/';
		fetch(address, {
			method: 'GET',
		})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data);
				
				//Hide other forms
				document.getElementById("type_form").style.display = "none";
				document.getElementById("map_locations").style.display = "block";

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
					
					//Tiles updating
					lookup_map.invalidateSize();
				}				
				console.log(markers_layer.getLayers().length);
			})
	}
		 
/********************************************************* OPEN/CLOSE FORMS ****************************************************************/
	
	//Looking up a package by number
	document.getElementById("lookup_button_open_form").onclick = function Open_package_number(){
		document.getElementById("type_form").style.display = "none";
		document.getElementById("package_number_form").style.display = "grid";
		document.getElementById("map_locations").style.display = "none";
	}

	//Open send package form
	document.getElementById("send_button").onclick = function Send_package_display(){
		document.getElementById("type_form").style.display = "none";
		document.getElementById("package_number_form").style.display = "none";
		document.getElementById("sender_details").style.display = "grid";
	}
	
	//Scrolling to the package formScrolling to the receiver form
	document.getElementById("next1").onclick = function Next1_OnClick(){
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
	document.getElementById("next2").onclick = function Next2_OnClick(){
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
	
	//Returning to the homepage
	function ReturnHome(){
		document.getElementById("package_number_form").style.display = "none";
		document.getElementById("sender_details").style.display = "none";
		document.getElementById("receiver_details").style.display = "none";
		document.getElementById("package_details").style.display = "none";
		document.getElementById("display_package_form").style.display = "none";
		document.getElementById("package_submitted").style.display = "none";
		document.getElementById("type_form").style.display = "block";
		document.getElementById("map_locations").style.display = "none";
	}
	document.getElementById("lookup_homepage").addEventListener("click", ReturnHome);
	document.getElementById("submitted_homepage").addEventListener("click", ReturnHome);
	document.getElementById("all_lookup_homepage").addEventListener("click", ReturnHome);


	/*************************************************** SEND PACKAGE PART*************************************************************/
	
	//Map for Pickup
	var pickup_map = L.map('pickup_location').setView([52.2297, 21.0122], 13);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	}).addTo(pickup_map);
	var pickup_marker = L.layerGroup().addTo(pickup_map);
	var pickup_location;
	pickup_map.invalidateSize();
	
	
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
				pickup_map.invalidateSize();
				pickup_location = latlng;
			});
			
		}

	}
	
	
	//Reverse geocoding pickup
	var geocodeService = L.esri.Geocoding.geocodeService();
	
	function onPickupMapClick(e) {
		pickup_marker.clearLayers();
		
		var marker = L.marker(e.latlng, {icon: default_icon}).addTo(pickup_marker);
		pickup_location = e.latlng;
		pickup_map.invalidateSize();
		
		geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
			if (error) {
				return;
			}
			document.getElementById("pickup_address").value = result.address.LongLabel;	
		});
	}

	pickup_map.on('click', onPickupMapClick);
	
	//Map for Delivery
	var delivery_map = L.map('delivery_location').setView([52.2297, 21.0122], 13);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNraGM5cGQ0bjAxMncycW0wbjNoNmdibjgifQ.3o366Xt1v3kTI8x_Q7vNJg'
	}).addTo(delivery_map);
	var delivery_marker = L.layerGroup().addTo(delivery_map);
	var delivery_location;
	delivery_map.invalidateSize();
	
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
				delivery_map.invalidateSize();
				delivery_location = latlng;
			});
			
		}
	}

	
	//Reverse geocoding delivery
	function onDeliveryMapClick(e) {
		delivery_marker.clearLayers();
		
		var marker = L.marker(e.latlng, {icon: default_icon}).addTo(delivery_marker);
		delivery_location = e.latlng;
		delivery_map.invalidateSize();
		
		geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
			if (error) {
				return;
			}
			
			document.getElementById("delivery_address").value = result.address.LongLabel;	
		});
	}
	delivery_map.on('click', onDeliveryMapClick);
	
			
			
			
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
		
		fetch('https://localhost:44329/api/Packages', {
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
} 



