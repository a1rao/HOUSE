// Create a google map client
var googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyBTD132iHKIXtMExAf6ZOfX9AMWFAaRm6Y',
});
const makeRequest = require('request-promise');

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "https://maps.googleapis.com/maps/api";
const DISTANCE = "/distancematrix";
const PLACE = "/place";
const OUTPUT = "/json?";
const PLACE_FROM_TEXT  = "/findplacefromtext";
const NEARBY = "/nearbysearch";
const LOCATION = "location=";
const NEARBY_TYPE = "type=supermarket";
const RADIUS = "radius=2000";
const PLACE_DETAILS = "/details";
const PLACE_PHOTO = "/photo?";
const PHOTO_REF = "photoreference=";
const PHOTO_WIDTH = "maxwidth=400";
const INPUT = "input=";
const TEXT_QUERY = "inputtype=textquery";
const PLACE_FIELDS = "fields=place_id";
const PLACE_ID = "placeid=";
const DETAILS_FIELDS = "fields=photos,geometry/location";
const UNITS = "units=imperial";
const ORIGIN = "origins=";
const DEST = "destinations=";
const API_KEY = "key=AIzaSyBTD132iHKIXtMExAf6ZOfX9AMWFAaRm6Y";
const URL_SEPARATOR = "&";
const FIXED_CAMPUS = "University of California San Diego";

module.exports = {
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
	distance: async function(ori, dest, l){
		await googleMapsClient.distanceMatrix({
			//origins: ['Regents La Jolla', 'La Regencia', '10201 Camino Ruiz, San Diego, CA 92126'],
			origins: [ori], // Can be either address or name
			destinations: [dest],
			mode: 'transit',
			transit_mode: 'bus',
			units: 'imperial',
		}, async function (err, response){
			if(!err){
				var origin = response.json.origin_addresses;
				var destination = response.json.destination_addresses;

				var jsresult = response.json.rows[0].elements;
				var dist = jsresult[0].distance.text;
				var dur = jsresult[0].duration.text;


				l.distance_to_campus = dist;
				l.travel_time = dur;
				// console.log("1");
				// console.log("Stored distance is " + l.distance_to_campus);
				// console.log("Stored travel time is " + l.travel_time);
				// return jsresult;
				// await callback(dist, dur);

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
	getPhoto: async function(name, l){
		await googleMapsClient.findPlace({
			input: name,
			inputtype: "textquery",
			fields: ['name', 'photos'],
		}, async function(err, response){
			if(!err){
				l.photo_name = response.json.candidates[0].name;
				var photo_html = response.json.candidates[0].photos[0].html_attributions;
				l.photo_ref = response.json.candidates[0].photos[0].photo_reference;

				// Return to callback function
				// console.log("3");
				// await callback(name, photo_ref);
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
	groceryStore: async function(add, l){

		// Call geocode API
		await googleMapsClient.geocode({
			address: add,
		}, async function(err, response){
			// Handle JSON response
			if(!err){
				// Formatted address (used when needed)
				var address = response.json.results[0].formatted_address;

				var lat = response.json.results[0].geometry.location.lat;
				var lng = response.json.results[0].geometry.location.lng;

				// console.log("5");
				await grocerySearch(lat, lng, l);
			}
			// Error in calling API
			else{
				console.log(err);
			}
		});
	},

	getDistance: async function(target, l) {

// Request api
		/*request(kaefhakjak, function(error, response, body){
			if(response){
				console.log("Ststus code: " + response.statusCode);
				console.log(body);
			}
			else{
				console.log(error);
			}
		});*/

		await makeRequest(PROXY_URL + BASE_URL + DISTANCE + OUTPUT + UNITS + URL_SEPARATOR + ORIGIN
			+ target.replace(" ", "%20") + URL_SEPARATOR + DEST + FIXED_CAMPUS.replace(" ", "%20")
			+ URL_SEPARATOR + API_KEY).then(function(body) {
			console.log("We got here in DistanceQuery at " + (new Date().getTime()));
			// console.log(body);
			var response = JSON.parse(body);

			console.log(response);

			l.distance_to_campus =response.rows[0].elements[0].distance.text;
			l.travel_time = response.rows[0].elements[0].duration.text;

			console.log("Done with DistanceQuery at " + (new Date().getTime()));

		}).catch(function(err) {
			console.log("An error occurred!!");
			console.log(err);
		});
	},

	getPhotos: function(address, l) {
		makeRequest(PROXY_URL + BASE_URL + PLACE + PLACE_FROM_TEXT + OUTPUT + INPUT + address.replace(" ", "%20") + URL_SEPARATOR
			+ TEXT_QUERY + URL_SEPARATOR + PLACE_FIELDS + URL_SEPARATOR + API_KEY).then(async function(body) {
			console.log("We got here in PlaceSearchQuery at " + (new Date().getTime()));
			// console.log(body);
			var response = JSON.parse(body);

			console.log(response);

			var placeID = response.candidates[0].place_id;

			await makeRequest(PROXY_URL+ BASE_URL + PLACE + PLACE_DETAILS + OUTPUT + PLACE_ID + placeID + URL_SEPARATOR
				+ DETAILS_FIELDS + URL_SEPARATOR + API_KEY)
				.then(async function(body){
					console.log("We got here in PlaceDetailsQuery at " + (new Date().getTime()));
					var detailedResponse = JSON.parse(body);

					console.log(detailedResponse);

					var ref = detailedResponse.result.photos[0].photo_reference;
					var lat = detailedResponse.result.geometry.location.lat;
					var lng = detailedResponse.result.geometry.location.lng;

					l.photo_ref = /*PROXY_URL +*/ BASE_URL + PLACE + PLACE_PHOTO + PHOTO_WIDTH + URL_SEPARATOR
						+ PHOTO_REF + ref + URL_SEPARATOR + API_KEY;

					await getStores(lat, lng, l);

					console.log("Done with Details Search at " + (new Date().getTime()));

					// makeRequest(PROXY_URL + BASE_URL + PLACE + PLACE_PHOTO + PHOTO_WIDTH + URL_SEPARATOR
					// 	+ PHOTO_REF + ref + URL_SEPARATOR + API_KEY).then(function(body) {
					// 		console.log("We got here in PlacePhotosQuery");
					// 		console.log("And this is what we got as the return value");
					// 		console.log(typeof body);
					//
					// 		l.photo_ref = body;
					// 		// var photoResponse = JSON.parse(body);
					//
					// 		// console.log(photoResponse);
					// })
					// 	.catch(function(err) {
					// 		console.log("An error occurred");
					// 		console.log(err);
					// 	});
				})
				.catch(function(err) {
					console.log("An error occurred!");
					console.log(err);
			});


			console.log("Done with Places Search at " + (new Date().getTime()));
			// l.distance_to_campus =response.rows[0].elements[0].distance.text;
			// l.travel_time = response.rows[0].elements[0].duration.text;

		}).catch(function(err) {
			console.log("An error occurred!!");
			console.log(err);
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
async function grocerySearch(lat, lng, l){

	await googleMapsClient.placesNearby({
		location: lat + ',' + lng,
		keyword: 'supermarket',
		radius: 2000,
	}, async function(err, response){
		// Store grocery stores in an array
		var list = [];

		if(!err){
			for( var i = 0; i < response.json.results.length; i++){
				var name = response.json.results[i].name;
				list.push(name);
			}

			l.grocery_stores = list;
			// console.log("6");
			// await callback(list);
		}
		else{
			console.log(err);
		}
	});
}

async function getStores(lat, lng, l) {
	await makeRequest(PROXY_URL + BASE_URL + PLACE + NEARBY + OUTPUT + LOCATION + lat + "," + lng
		+ URL_SEPARATOR + RADIUS + URL_SEPARATOR + NEARBY_TYPE + URL_SEPARATOR + API_KEY).then(function(body) {
		console.log("We got here in PlaceNearbySearch at " + (new Date().getTime()));

		var response = JSON.parse(body);
		console.log(response);

		var stores;

		if(response.results.length === 0) {
			console.log("Got into the if block in nearby places search. Number of stores found is " + response.results.length);
			stores = "Grocery Shopping will be a long. No supermarkets found within a 2 km radius.";
		}
		else {
			stores = [];

			console.log("Got into the else block in nearby places search. Number of stores found is " + response.results.length);
			let i;

			for(i = 0; i < response.results.length; i++) {
				stores.push(response.results[i].name);
			}
		}

		l.grocery_stores = stores;
		console.log("Set stores at " + (new Date().getTime()));

	})
}

