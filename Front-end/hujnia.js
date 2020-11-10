	var id_stored = 1;
	var constant_id = 10000000;
	var all_pickup_map;
	var all_delivery_map;
	var get_count=0;
	var id = [];
	
	function create_map()
	{
		if(get_count == 1)
		{
		 all_pickup_map = L.map('All_pickup_location').setView([52.2297, 21.0122], 13);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNrZ2ljeHp3eTAyZXIydHN1bTFmcTdxZG0ifQ.UwB5VeAMvyI5EfZ6kA4KSQ'
	}).addTo(all_pickup_map);
		
	 all_delivery_map = L.map('All_delivery_location').setView([52.2297, 21.0122], 13);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNrZ2ljeHp3eTAyZXIydHN1bTFmcTdxZG0ifQ.UwB5VeAMvyI5EfZ6kA4KSQ'
	}).addTo(all_delivery_map);
		}
	}

	document.getElementById("lookup_button_all").onclick = function Lookup_all_package(){
		ReturnHome();
		document.getElementById("map_locations").style.display = "grid";
		document.getElementById("type_form").style.display = "none";
		get_count++;
		create_map();
		for(var i = 0 ; i < id_stored ; i++)
		{
		var address = 'https://localhost:44327/api/Packages/' + (constant_id+i).toString();
		fetch(address, {
			method: 'GET',
		})
			.then(response => response.json())
			.then(data => {
				var change_pickup_lat = Number(data.pickup_details.address.latlng.lat);
				var idnumber = data.id;
				var change_pickup_lng = Number(data.pickup_details.address.latlng.lng);
				var change_latlng = L.latLng(change_pickup_lat, change_pickup_lng);
				console.log(change_latlng);
				change_pickup_marker = L.layerGroup().addTo(all_pickup_map);
				var pickup_marker = L.marker(change_latlng,{customId:idnumber}).addTo(change_pickup_marker);
				pickup_marker.on('click', function onMarkerClick(){
					var customId = this.options.customId;
					var address = 'https://localhost:44327/api/Packages/'  + customId.toString();
					get_JSON(address);
				});
				var change_delivery_lat = Number(data.delivery_details.address.latlng.lat);
				var change_delivery_lng = Number(data.delivery_details.address.latlng.lng);
				var change_latlng = L.latLng(change_delivery_lat, change_delivery_lng);
				console.log(change_latlng);

				var change_delivery_marker = L.layerGroup().addTo(all_delivery_map);
				var delivery_marker = L.marker(change_latlng,{customId:idnumber}).addTo(change_delivery_marker);
				delivery_marker.on('click', function onMarkerClick(){
					var customId = this.options.customId;
					var address = 'https://localhost:44327/api/Packages/'  + customId.toString();
					get_JSON(address);
				});
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	}
}



		function get_JSON(address)
		{
			document.getElementById("map_locations").style.display = "none";
			fetch(address, {
				method: 'GET',
			})
				.then(response => response.json())
				.then(data => {
					console.log('Success:', data);
					document.getElementById("package_number_form").style.display = "none";
					document.getElementById("sender_details").style.display = "none";
					document.getElementById("receiver_details").style.display = "none";
					document.getElementById("package_details").style.display = "none";
					
					//Displaying pickup details
					document.getElementById("div_pickup_fname").innerText = data.pickup_details.name.first_name;
					document.getElementById("div_pickup_lname").innerText = data.pickup_details.name.last_name;
					document.getElementById("div_pickup_address").innerText = data.pickup_details.address.address;
					document.getElementById("div_pickup_date").innerText = data.pickup_details.date;
					
					var change_pickup_lat = Number(data.pickup_details.address.latlng.lat);
					var change_pickup_lng = Number(data.pickup_details.address.latlng.lng);
					var change_latlng = L.latLng(change_pickup_lat, change_pickup_lng);
					console.log(change_latlng);
					var change_pickup_map = L.map("change_pickup_location").setView(change_latlng, 13);
					L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
						maxZoom: 18,
						id: 'mapbox/streets-v11',
						tileSize: 512,
						zoomOffset: -1,
						accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNrZ2ljeHp3eTAyZXIydHN1bTFmcTdxZG0ifQ.UwB5VeAMvyI5EfZ6kA4KSQ'
					}).addTo(change_pickup_map);
					var change_pickup_marker = L.layerGroup().addTo(change_pickup_map);
					var marker = L.marker(change_latlng).addTo(change_pickup_marker);
					
					//Displaying delivery details
					document.getElementById("div_delivery_fname").innerText = data.delivery_details.name.first_name;
					document.getElementById("div_delivery_lname").innerText = data.delivery_details.name.last_name;
					document.getElementById("div_delivery_address").innerText = data.delivery_details.address.address;
					document.getElementById("div_delivery_date").innerText = data.delivery_details.date;
					
					var change_delivery_lat = Number(data.delivery_details.address.latlng.lat);
					var change_delivery_lng = Number(data.delivery_details.address.latlng.lng);
					var change_latlng = L.latLng(change_delivery_lat, change_delivery_lng);
					console.log(change_latlng);
					var change_delivery_map = L.map("change_delivery_location").setView(change_latlng, 13);
					L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
						maxZoom: 18,
						id: 'mapbox/streets-v11',
						tileSize: 512,
						zoomOffset: -1,
						accessToken: 'pk.eyJ1IjoibWFnZGFsZW5hMzE4IiwiYSI6ImNrZ2ljeHp3eTAyZXIydHN1bTFmcTdxZG0ifQ.UwB5VeAMvyI5EfZ6kA4KSQ'
					}).addTo(change_delivery_map);
					var change_delivery_marker = L.layerGroup().addTo(change_delivery_map);
					var marker = L.marker(change_latlng).addTo(change_delivery_marker);
					
					//Displaying package info
					document.getElementById("display_package_id").innerText = data.id;
					document.getElementById("div_size").innerText = data.package_info.size;
					document.getElementById("div_weight").innerText = data.package_info.weight;
					
					display_package_form.style.display = "grid";
			})
			.catch((error) => {
			  console.error('Error:', error);
			});
			
		 }
	
	
	//Send the package data to the server
	document.getElementById("submit_package").onclick = function Send_package_data(){
		//Constructing JSON		
		const data = { 
			"id":"1", 
			"pickup_details": {
				"first_name": document.getElementById("pickup_fname").value,
				"last_name": document.getElementById("pickup_lname").value,
				"address": document.getElementById("pickup_address").value,
				"latlng": {
					"lat": pickup_location.lat,
					"lng": pickup_location.lng
				},				
				"date": document.getElementById("pickup_date").value
			},
			"delivery_details": {
				"first_name": document.getElementById("delivery_fname").value,
				"last_name": document.getElementById("delivery_lname").value,
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
				id_stored++;
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
		
			document.getElementById("send_button").onclick = function Send_package_display(){
		document.getElementById("type_form").style.display = "none";
		document.getElementById("package_number_form").style.display = "none";
		document.getElementById("sender_details").style.display = "grid";
	}