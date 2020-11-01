window.onload = function load(){
	
	window.scrollTo(0, 0);

	document.getElementById("next1").onclick = function Next1_OnClick(){
		var new_section = document.getElementById("seller_details");
		new_section.style.visibility = "visible";
		new_section.scrollIntoView(true);
		}
	
	document.getElementById("next2").onclick = function Next2_OnClick(){
		var new_section = document.getElementById("buyer_details");
		new_section.style.visibility = "visible";
		new_section.scrollIntoView(true);
		}
		
	document.getElementById("next3").onclick = function Next3_OnClick(){
		var new_section = document.getElementById("package_details");
		new_section.style.visibility = "visible";
		new_section.scrollIntoView(true);
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
	
	//Map for Delivery
	var delivery_map = L.map('delivery_location').setView([52.2297, 21.0122], 13);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNrZ2ljeHp3eTAyZXIydHN1bTFmcTdxZG0ifQ.UwB5VeAMvyI5EfZ6kA4KSQ'
	}).addTo(delivery_map);
	
	//Geocoding pickup
	var country_geocoder = L.esri.Geocoding.geocodeService();
	
	var pickup_country = document.getElementById("pickup_country");
	
	pickup_country.onchange = function(){
		var pickup_value = document.getElementById("pickup_country").value;
		country_geocoder.geocode().text(pickup_value).run(function (error, response) {
			if (error) {
			  return;
			}

			pickup_map.fitBounds(response.results[0].bounds);
		});
	};
	
	//Geocoding delivery
	var delivery_country = document.getElementById("delivery_country");
	
	delivery_country.onchange = function(){
		var delivery_value = document.getElementById("delivery_country").value;
		country_geocoder.geocode().text(delivery_value).run(function (error, response) {
			if (error) {
			  return;
			}

			delivery_map.fitBounds(response.results[0].bounds);
		});
	};

	
	//Reverse geocoding pickup
	var geocodeService = L.esri.Geocoding.geocodeService();
	
	function onPickupMapClick(e) {
		geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
			if (error) {
				return;
			}
			
			console.log(result.address.LongLabel);
			
			var address = result.address.LongLabel.split(",");
			
			if(address[address.length - 1]!="POL"){
				window.alert("We don't work in this area!");
			} else 
			if(address.length < 4){
				window.alert("We don't work in this area!");
			} else {
				document.getElementById("pickup_city").value = address[address.length - 3];
				document.getElementById("pickup_index").value = address[address.length - 5];
				document.getElementById("pickup_address").value = address[address.length - 6];
			}
			
			
			console.log(address);
		});
	}

	pickup_map.on('click', onPickupMapClick);
	
	//Reverse geocoding delivery
	function onDeliveryMapClick(e) {
		geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
			if (error) {
				return;
			}
			
			console.log(result.address.LongLabel);
			
			var address = result.address.LongLabel.split(",");
			
			if(address.length < 6){
				window.alert("We don't work in this area!");
			} else {
				document.getElementById("delivery_city").value = address[address.length - 3];
				document.getElementById("delivery_index").value = address[address.length - 5];
				document.getElementById("delivery_address").value = address[address.length - 6];
			}
			
			
			console.log(address);
		});
	}

	delivery_map.on('click', onDeliveryMapClick);
} 




