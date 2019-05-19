// This file is working
var googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyBTD132iHKIXtMExAf6ZOfX9AMWFAaRm6Y',
});


function distance(){
	googleMapsClient.distanceMatrix({
		//origins: ['Regents La Jolla', 'La Regencia', '10201 Camino Ruiz, San Diego, CA 92126'],
		origins: ['10210 Camino Ruiz, San Diego, CA 92126'], // Can be either address or name
		destinations: ['University of California San Diego'],
		mode: 'driving',
		units: 'imperial',
	}, function(err, response){
		if(!err){
			console.log('Response:\n');
			var origin = response.json.origin_addresses;
			var destination = response.json.destination_addresses;
			//console.log(response.json.rows[0].elements);
			for( var i = 0; i < origin.length; i++){
				var jsresult = response.json.rows[i].elements;
				for( var j = 0; j < jsresult.length; j++){
					var distance = jsresult[j].distance.text;
					var duration = jsresult[j].duration.text;
					var from = origin[i];
					var to = destination[j];
					//var jsres = JSON.stringify(response.json.rows[i]);
					console.log("From: "+from);
					console.log("To: "+to);
					console.log("Distance: "+distance);
					console.log("Duration: "+duration+"\n");
				}
			}
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
function placeSearch(){
	googleMapsClient.findPlace({
		input: 'Regents La Jolla',
		inputtype: "textquery",
		fields: ['name', 'photos'],
	}, function(err, response){
		if(!err){
			var name = response.json.candidates[0].name;
			var photo_html = response.json.candidates[0].photos[0].html_attributions;
			var photo_ref = response.json.candidates[0].photos[0].photo_reference;
			console.log("Place name: " + name);
			console.log("Html attribute: " + photo_html);
			console.log("Photo reference: " + photo_ref);
		}
		else{
			console.log(err);
		}
	});
}


//placeSearch();
//distance();
