window.onload = function load(){
	
	
	window.scrollTo(0, 0);
	
	//Looking up a package
	document.getElementById("lookup_button_open_form").onclick = function Open_package_number(){
		document.getElementById("type_form").remove();
		document.getElementById("package_number_form").style.visibility = "visible";
	}
	
	document.getElementById("lookup_button").onclick = function Lookup_package(){
		 var package_number = document.getElementById("package_number");
		 if(package_number == null || package_number == ""){
			 window.alert("Please enter the package number!");
			 return;
		 } else {			
			const userAction = async () => {
				const response = await fetch('https://localhost:44361/Packages/' + package_number.toString());
				const myJson = await response.json(); //extract JSON from the http response
				console.log(myJson);
			}
			
			document.getElementById("package_number_form").remove();
			document.getElementById("display_package_form").style.visibility = "visible";
		 }
	}
	
	document.getElementById("send_button").onclick = function Send_package_display(){
		document.getElementById("type_form").remove();
		document.getElementById("package_number_form").remove();
		document.getElementById("sender_details").style.visibility = "visible";
	}
	
	//Scrolling to the package formScrolling to the receiver form
	document.getElementById("next1").onclick = function Next1_OnClick(){
		//Checking if the values are filled in
		var pickup_fname = document.getElementById("pickup_fname");
		var pickup_lname = document.getElementById("pickup_lname");
		var pickup_country = document.getElementById("pickup_country");
		var pickup_city= document.getElementById("pickup_city");
		var pickup_address = document.getElementById("pickup_address")
		var pickup_index = document.getElementById("pickup_index");
		var pickup_date = document.getElementById("pickup_date");
		
		
		if(pickup_fname && pickup_lname && pickup_country && pickup_city && pickup_address && pickup_index &&  pickup_date && pickup_fname.value!="" 
		&&  pickup_lname.value!="" && pickup_city.value!="" && pickup_address.value!="" && pickup_index.value!="" && pickup_date.value!=""){
			var new_section = document.getElementById("receiver_details");
			new_section.style.visibility = "visible";
			new_section.scrollIntoView(true);
		} else {
			alert("Please fill in the required fields.")
		}
		
	}
	
	//Scrolling to the package form
	document.getElementById("next2").onclick = function Next2_OnClick(){
		//Checking if the values are filled in
		var delivery_fname = document.getElementById("delivery_fname");
		var delivery_lname = document.getElementById("delivery_lname");
		var delivery_country = document.getElementById("delivery_country");
		var delivery_city= document.getElementById("delivery_city");
		var delivery_address = document.getElementById("delivery_address")
		var delivery_index = document.getElementById("delivery_index");
		var delivery_date = document.getElementById("delivery_date");
		
		
		if(delivery_fname && delivery_lname && delivery_country && delivery_city && delivery_address && delivery_index &&  delivery_date && delivery_fname.value!="" 
		&&  delivery_lname.value!="" && delivery_city.value!="" && delivery_address.value!="" && delivery_index.value!="" && delivery_date.value!=""){
			var new_section = document.getElementById("package_details");
			new_section.style.visibility = "visible";
			new_section.scrollIntoView(true);
		} else {
			alert("Please fill in the required fields.")
		}
	}

	//Map for Pickup
	var pickup_map = L.map('pickup_location').setView([52.2297, 21.0122], 13);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNrZ2ljeHp3eTAyZXIydHN1bTFmcTdxZG0ifQ.UwB5VeAMvyI5EfZ6kA4KSQ'
	}).addTo(pickup_map);
	var pickup_marker = L.layerGroup().addTo(pickup_map);
	var pickup_location;
	
	
	//Geocoding pickup
	var geocoder = L.esri.Geocoding.geocodeService();
	
	//Country choosing
	var pickup_country = document.getElementById("pickup_country");
	
	pickup_country.onchange = function(){
		var pickup_value = document.getElementById("pickup_country").value;
		geocoder.geocode().text(pickup_value).run(function (error, response) {
			if (error) {
			  return;
			}

			pickup_map.fitBounds(response.results[0].bounds);
		});
	};
	
	//Refresh map with new address
	document.getElementById("pickup_refresh").onclick = function Pickup_refresh(){
		var pickup_country = document.getElementById("pickup_country").value;
		var pickup_city = document.getElementById("pickup_city").value;
		var pickup_address = document.getElementById("pickup_address").value;
		var pickup_index = document.getElementById("pickup_index").value;
		
		//Creating address string
		var full_address = "";
		if(pickup_address && pickup_address!=""){
			full_address += pickup_address;
		}
		if(pickup_city && pickup_city!=""){
			if(full_address != "")
				full_address += ", ";
			full_address += pickup_city;
		}
		if(full_address[full_address.length-2]!=",")
			full_address += ", ";
		pickup_address+=pickup_country;
		if(pickup_index && pickup_index!=""){
			if(full_address[full_address.length-2]!=",")
				full_address += ", ";
			full_address += pickup_index;
		}
		
		console.log(full_address);
		L.esri.Geocoding.geocode().text(full_address).run(function (error, response) {
			if (error) {
				console.log(err);
				window.alert("The provided address can not be found!");
				return;
			}
			
			var latlng = response.results[0].latlng;
			pickup_map.setView(latlng, 13)
			pickup_marker.clearLayers();
			var marker = L.marker(latlng).addTo(pickup_marker);
			pickup_location = latlng;
		});

	}
	
	
	//Reverse geocoding pickup
	var geocodeService = L.esri.Geocoding.geocodeService();
	
	function onPickupMapClick(e) {
		pickup_marker.clearLayers();
		
		var marker = L.marker(e.latlng).addTo(pickup_marker);
		pickup_location = e.latlng;
		
		geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
			if (error) {
				return;
			}
			
			console.log(result.address.LongLabel);
			
			var address = result.address.LongLabel.split(", ");
			
			if(address[address.length - 1]!="POL"){
				window.alert("We don't work in this area!");

			} else if(address.length < 6){
				window.alert("The address should be more precise!");
			} else {
				if(address.length == 6){
					document.getElementById("pickup_city").value = address[3];
					document.getElementById("pickup_index").value = address[1];
					document.getElementById("pickup_address").value = address[0];					
				} else {
					document.getElementById("pickup_city").value = address[4];
					document.getElementById("pickup_index").value = address[2];
					document.getElementById("pickup_address").value = address[1];	
				}

			}
			
			
			console.log(address);
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
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNrZ2ljeHp3eTAyZXIydHN1bTFmcTdxZG0ifQ.UwB5VeAMvyI5EfZ6kA4KSQ'
	}).addTo(delivery_map);
	var delivery_marker = L.layerGroup().addTo(delivery_map);
	var delivery_location;
	
	//Geocoding delivery
	
	//Country choosing
	var delivery_country = document.getElementById("delivery_country");
	
	delivery_country.onchange = function(){
		var delivery_value = document.getElementById("delivery_country").value;
		geocoder.geocode().text(delivery_value).run(function (error, response) {
			if (error) {
			  return;
			}

			delivery_map.fitBounds(response.results[0].bounds);
		});
	};
	
	//Refresh map with new address
	document.getElementById("delivery_refresh").onclick = function Delivery_refresh(){
		var delivery_country = document.getElementById("delivery_country").value;
		var delivery_city = document.getElementById("delivery_city").value;
		var delivery_address = document.getElementById("delivery_address").value;
		var delivery_index = document.getElementById("delivery_index").value;
		
		//Creating address string
		var full_address = "";
		if(delivery_address && delivery_address!=""){
			full_address += delivery_address;
		}
		if(delivery_city && delivery_city!=""){
			if(full_address != "")
				full_address += ", ";
			full_address += delivery_city;
		}
		if(full_address[full_address.length-2]!=",")
			full_address += ", ";
		delivery_address+=delivery_country;
		if(delivery_index && delivery_index!=""){
			if(full_address[full_address.length-2]!=",")
				full_address += ", ";
			full_address += delivery_index;
		}
		
		console.log(full_address);
		L.esri.Geocoding.geocode().text(full_address).run(function (error, response) {
			if (error) {
				console.log(err);				
				window.alert("The provided address can not be found!");
				return;
			}
			console.log(response.results[0].latlng);
			
			var latlng = response.results[0].latlng;
			delivery_map.setView(latlng, 13)
			delivery_marker.clearLayers();
			var marker = L.marker(latlng).addTo(delivery_marker);
			delivery_location = latlng;
		});
	}

	
	//Reverse geocoding delivery
	function onDeliveryMapClick(e) {
		delivery_marker.clearLayers();
		
		var marker = L.marker(e.latlng).addTo(delivery_marker);
		delivery_location = e.latlng;
		
		geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
			if (error) {
				return;
			}
			
			console.log(result.address.LongLabel);
			
			var address = result.address.LongLabel.split(", ");
			
			if(address[address.length - 1]!="POL"){
				window.alert("We don't work in this area!");

			} else if(address.length < 6){
				window.alert("The address should be more precise!");
			} else {
				if(address.length == 6){
					document.getElementById("delivery_city").value = address[3];
					document.getElementById("delivery_index").value = address[1];
					document.getElementById("delivery_address").value = address[0];					
				} else {
					document.getElementById("delivery_city").value = address[4];
					document.getElementById("delivery_index").value = address[2];
					document.getElementById("delivery_address").value = address[1];	
				}

			}
			
			
			console.log(address);
		});
	}
	delivery_map.on('click', onDeliveryMapClick);
	
			
			
			
	//Send the package data to the server
	document.getElementById("submit_package").onclick = function Send_package_data(){
		//Constructing JSON
		console.log("somesing");
		const data = { "id":"0", "pickup_details": {
			"name":{
				"first_name": document.getElementById("pickup_fname").value,
				"last_name": document.getElementById("pickup_lname").value
			}, 
			"address":{
				"country": document.getElementById("pickup_country").value,
				"city": document.getElementById("pickup_city").value,
				"address": document.getElementById("pickup_address").value,
				"index": document.getElementById("pickup_index").value,
				"latlng":{
					"lat": pickup_location.lat,
					"lng": pickup_location.lng
				}
			}			 
		}, "delivery_details":{
			"name":{
				"first_name": document.getElementById("delivery_fname").value,
				"last_name": document.getElementById("delivery_lname").value
			}, 
			"address":{
				"country": document.getElementById("delivery_country").value,
				"city": document.getElementById("delivery_city").value,
				"address": document.getElementById("delivery_address").value,
				"index": document.getElementById("delivery_index").value,
				"latlng":{
					"lat": delivery_location.lat,
					"lng": delivery_location.lng
				}
			}			 
		}, "package_info":{
			"size": document.getElementById("size").value,
			"weight": document.getElementById("weight").value
		}};
		
		console.log(JSON.stringify(data));
		
		fetch('https://localhost:44361/api/Packages', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => {
			  console.log('Success:', data);
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	}
} 




