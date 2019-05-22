var listing_name = process.argv[2];
var campus = 'University of California San Diego';

// Create a google map client
var googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyBTD132iHKIXtMExAf6ZOfX9AMWFAaRm6Y',
});

function distance(name, dest, callback){
	googleMapsClient.distanceMatrix({
		//origins: ['Regents La Jolla', 'La Regencia', '10201 Camino Ruiz, San Diego, CA 92126'],
		origins: [name], // Can be either address or name
		destinations: [dest],
		mode: 'driving',
		units: 'imperial',
	}, function (err, response){
		if(!err){
			var origin = response.json.origin_addresses;
			var destination = response.json.destination_addresses;
		
			var jsresult = response.json.rows[0].elements;
			var dist = jsresult[0].distance.text;
			var dur = jsresult[0].duration.text;
			callback(dist, dur);
			/*
			for( var i = 0; i < origin.length; i++){
				var jsresult = response.json.rows[i].elements;
				for( var j = 0; j < jsresult.length; j++){
					var dist = jsresult[j].distance.text;
					var dur = jsresult[j].duration.text;
					var from = origin[i];
					var to = destination[j];
					
					callback(dist, dur);
					
					console.log("From: "+from);
					console.log("To: "+to);
					console.log("Distance: "+distance);
					console.log("Duration: "+duration+"\n");
				}
			}*/

			
		}
		else{
			console.log(err);
		}
	});

}


/* 
 * One photo can be displayed using the photo reference
 * Input can be name or address
 * */
function getPhoto(name, callback){
	googleMapsClient.findPlace({
		input: name,
		inputtype: "textquery",
		fields: ['name', 'photos'],
	}, function(err, response){
		if(!err){
			var name = response.json.candidates[0].name;
			var photo_html = response.json.candidates[0].photos[0].html_attributions;
			var photo_ref = response.json.candidates[0].photos[0].photo_reference;
			
			callback(name, photo_html, photo_ref);
		}
		else{
			console.log(err);
		}
	});
}


/* Geocode address
 * Shows formatted address, Lat, and Lng
 * */
function geoCode(add, callback, cb2){
	
	googleMapsClient.geocode({
		address: add,
	}, function(err, response){
		if(!err){
			var address = response.json.results[0].formatted_address;
			var lat = response.json.results[0].geometry.location.lat;
			var lng = response.json.results[0].geometry.location.lng;
			callback(lat, lng, cb2);
		}
		else{
			console.log(err);
		}
	});

}


function grocerySearch(lat, lng, callback){

	googleMapsClient.placesNearby({
		location: lat + ',' + lng,
		keyword: 'supermarket',
		radius: 2000,
	}, function(err, response){
		var list = [];

		if(!err){
			for( var i = 0; i < response.json.results.length; i++){
				var name = response.json.results[i].name;
				list.push(name);
			}
			callback(list);	

		}
		else{
			console.log(err);
		}
	});

}


/*
distance(listing_name, campus, function dist_log(dist,dur){
	console.log(dist + ", " + dur);
});

geoCode(listing_name, grocerySearch, function grocers(lists){
	console.log(lists);
});


getPhoto(listing_name, function photo_log(name, html, ref){
	console.log(name);
	console.log(ref);
});
*/
