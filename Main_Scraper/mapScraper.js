var listing_name = process.argv[2];
var campus = 'University of California San Diego';

// Create a google map client
var googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyBTD132iHKIXtMExAf6ZOfX9AMWFAaRm6Y',
});

module.exports = {
//const key: 'AIzaSyBTD132iHKIXtMExAf6ZOfX9AMWFAaRm6Y',
/*
 * distance
 * - Takes in a name for origin and destination and returns the distance and 
 *   duration between origin and destination
 *
 *  Parameter: 	ori	- The name of origin
 *  		dest	- The name of destination
 *  		callback- The callback function
 *
 *  Return:	Returns dis and dur to the callback function
 *  		dis	- The distance (in miles) between origin and destination
 *  		dur	- The travel time between origin and destination
 * */
	distance: async function(ori, dest,l){
		await googleMapsClient.distanceMatrix({
			//origins: ['Regents La Jolla', 'La Regencia', '10201 Camino Ruiz, San Diego, CA 92126'],
			origins: [ori], // Can be either address or name
			destinations: [dest],
			mode: 'transit',
			transit_mode: 'bus',
			units: 'imperial',
		}, await function (err, response){
			if(!err){
				var origin = response.json.origin_addresses;
				var destination = response.json.destination_addresses;
		
				var jsresult = response.json.rows[0].elements;
				var dist = jsresult[0].distance.text;
				var dur = jsresult[0].duration.text;
				// console.log(dist);
				// console.log(dur);
				l.distance_to_campus = dist;
			}
			else{
				console.log(err);
			}
		});

	},


/* 
 * getphoto
 * - Returns a photo reference to be used to display an image
 *
 * Parameters: 	name	- Name or address of the place where image needs to be 
 * 			  searched for
 *
 * Return: 	Returns name, photo_html, photo_attirbute to a callback function
 * 		name		- Name of the place
 *		photo_html	- The html attribute for that photo
 *		photo_ref	- The photo reference needed to display the image
 *
 * USING PHOTO REFERENCE:
 *
 * https://maps.googleapis.com/maps/api/place/photo?maxwidth[maxheight]=ENTER_NUMBER&photoreference=PHOTO_REF&key=API_KEY
 *
 * Choose either maxheight or maxwidth. They both take in a value between 1 and 1600
 * 
 * Eg:
 * https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=CmRaAAAAOc-VYh-SbVK-7vAWp9vRTueIxclf61j8aLs_5prcv2IsXwKjHIuVxN2TO2hrNTEBOirUWXbGg88PRUiXNpd6-5u_JswAVRPQsiLCqDbT32qM7E7Z1l2o9G0HZL-gPDQSEhAWUuU0QCMlJWI5F8Zsrq4dGhTIvBqyiuJfcH3cqGN0BCKrDuihMQ&key=AIzaSyBTD132iHKIXtMExAf6ZOfX9AMWFAaRm6Y
 *
 * */
	getPhoto: function(name, l){
		googleMapsClient.findPlace({
			input: name,
			inputtype: "textquery",
			fields: ['name', 'photos'],
		}, function(err, response){
			if(!err){
				// var name = response.json.candidates[0].name;
				// var photo_html = response.json.candidates[0].photos[0].html_attributions;
				// Return to callback function
				l.photo = response.json.candidates[0].photos[0].photo_reference;
			}
			else{
				console.log(err);
			}
		});
	},


/* 
 * geoCode
 * - Converts the name/address of a place to its lattitude and longitude format
 *
 * Parameter: 	add	- The address of a place
 * 		callback- The function to call after api call (grocerySearch)
 * 		cb2	- The callback function to be passed into grocerySearch
 *
 * Return:	none. Lattitude and longitude will be used in grocerySearch
 * */
	groceryStore: function(add, cb){
	
		// Call geocode API
		googleMapsClient.geocode({
			address: add,
		}, function(err, response){
			// Handle JSON response
			if(!err){
				// Formatted address (used when needed)
				var address = response.json.results[0].formatted_address;
				
				var lat = response.json.results[0].geometry.location.lat;
				var lng = response.json.results[0].geometry.location.lng;
			
				grocerySearch(lat, lng, cb);
			}
			// Error in calling API
			else{
				console.log(err);
			}
		});
	}
};


/*
 * grocerySearch
 * - Search for grocery stores within 2000 meters of a location
 *
 * Parameter: 	lat	- The lattitude of location to search for
 * 		lng	- The longitude of location to search for
 *
 * Return:	list	- A list of grocery stores within 2000 meter radius 
 * */
function grocerySearch(lat, lng, callback){

	googleMapsClient.placesNearby({
		location: lat + ',' + lng,
		keyword: 'supermarket',
		radius: 2000,
	}, function(err, response){
		// Store grocery stores in an array
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


/* How to call?
// If you want to get distance:
distance(listing_name, campus, function dist_log(dist,dur){
	console.log(dist + ", " + dur);
});

// If you want to get grocery stores:
geoCode(listing_name, grocerySearch, function grocers(lists){
	console.log(lists);
});


// If you wanna get photo reference:
getPhoto(listing_name, function photo_log(name, html, ref){
	console.log(name);
	console.log(ref);
});
*/
