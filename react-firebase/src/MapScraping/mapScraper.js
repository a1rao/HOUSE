const makeRequest = require('request-promise');

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "https://maps.googleapis.com/maps/api";
const DISTANCE = "/distancematrix";
const PLACE = "/place";
const OUTPUT = "/json?";
const PLACE_FROM_TEXT  = "/findplacefromtext";
const NEARBY = "/nearbysearch";
const LOCATION = "location=";
const NEARBY_MARKET = "type=supermarket";
const NEARBY_BUS = "type=bus_station";
const MARKET_RADIUS = "radius=3219";
const BUS_RADIUS = "radius=805";
const SORT_DISTANCE = "rankby=distance";
const PLACE_DETAILS = "/details";
const PLACE_PHOTO = "/photo?";
const PHOTO_REF = "photoreference=";
const PHOTO_WIDTH = "maxwidth=1000";
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
const DEFAULT_IMAGE = "https://github.com/a1rao/HOUSE/blob/master/react-firebase/images/default_listing_image.png?raw=true";
const EMPTY = "";

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
	/**
	 * Get distance information (distance and travel time) from the listing address ot the campus address
	 * @param target The address of the listing
	 * @param l The listing object to save the information into
	 * @returns {Promise<void>}
	 */
	getDistance: async function(target, l) {

		await makeRequest(PROXY_URL + BASE_URL + DISTANCE + OUTPUT + UNITS + URL_SEPARATOR + ORIGIN
			+ target.replace(/ /g, "%20").replace(/,/g, "") + URL_SEPARATOR + DEST + FIXED_CAMPUS.replace(/ /g, "%20")
			+ URL_SEPARATOR + API_KEY).then(function(body, callback) {

				var response = JSON.parse(body);

				l.distance_to_campus = response.rows[0].elements[0].distance.text;
				l._distance = Number(l.distance_to_campus.replace(/[^0-9.]/g, EMPTY));
				l.travel_time = response.rows[0].elements[0].duration.text;
		}).catch(function(err) {
			console.log("An error occurred!!");
			console.log(err);
		});
	},

	/**
	 * Get information of what's nearby (grocery stores and bus stops) and also gets an image related to the listing
	 * if such information is available
	 * @param address The address of the listing
	 * @param l The listing object to save the information into
	 * @returns {Promise<void>}
	 */
	getAdditionalInformation: async function(address, l) {
		await makeRequest(PROXY_URL + BASE_URL + PLACE + PLACE_FROM_TEXT + OUTPUT + INPUT
			+ address.replace(/ /g, "%20").replace(/,/g, "") + URL_SEPARATOR
			+ TEXT_QUERY + URL_SEPARATOR + PLACE_FIELDS + URL_SEPARATOR + API_KEY)
			.then(async function(body) {
				var response = JSON.parse(body);

				var placeID = response.candidates[0].place_id;

				await makeRequest(PROXY_URL+ BASE_URL + PLACE + PLACE_DETAILS + OUTPUT + PLACE_ID + placeID + URL_SEPARATOR
					+ DETAILS_FIELDS + URL_SEPARATOR + API_KEY)
					.then(async function(body){
						var detailedResponse = JSON.parse(body);

						var ref;

						if(detailedResponse.result.photos !== undefined) {
							ref = detailedResponse.result.photos[0].photo_reference;
						}

						l.photo_ref = (ref === undefined) ? DEFAULT_IMAGE : BASE_URL + PLACE + PLACE_PHOTO
							+ PHOTO_WIDTH + URL_SEPARATOR + PHOTO_REF + ref + URL_SEPARATOR + API_KEY;

						if(detailedResponse.result.geometry !== undefined) {
							var lat = detailedResponse.result.geometry.location.lat;
							var lng = detailedResponse.result.geometry.location.lng;
							await getStores(lat, lng, l);
							await getBuses(lat, lng, l);
						}
					})
					.catch(function(err) {
						console.log("An error occurred!");
						console.log(err);
					});
			}).catch(function(err) {
			console.log("An error occurred!!");
			console.log(err);
		});
	}
};

/**
 * Get information of supermarkets near the listing
 * @param lat The latitude of the listing
 * @param lng The longitude of the listing
 * @param l The listing object to save the information into
 * @returns {Promise<void>}
 */
async function getStores(lat, lng, l) {

	await makeRequest(PROXY_URL + BASE_URL + PLACE + NEARBY + OUTPUT + LOCATION + lat + "," + lng
		+ URL_SEPARATOR + MARKET_RADIUS + URL_SEPARATOR + NEARBY_MARKET + URL_SEPARATOR + API_KEY).then(function(body) {

		var response = JSON.parse(body);

		var stores;

		if(response.results.length === 0) {
			stores = "There are no supermarkets within a 2 mile radius.";
		}
		else {
			stores = [];

			let i;
			for(i = 0; i < response.results.length; i++) {
				stores.push(response.results[i].name);
			}
		}

		l.grocery_stores = stores.toString().split(",").join(", ");
	});
}

/**
 * Get information of bus stops near the listing
 * @param lat The latitude of the listing
 * @param lng The longitude of the listing
 * @param l The listing object to save the information into
 * @returns {Promise<void>}
 */
async function getBuses(lat, lng, l) {

	await makeRequest(PROXY_URL + BASE_URL + PLACE + NEARBY + OUTPUT + LOCATION + lat + "," + lng
		+ URL_SEPARATOR + BUS_RADIUS + URL_SEPARATOR + NEARBY_BUS + URL_SEPARATOR + SORT_DISTANCE + URL_SEPARATOR + API_KEY)
		.then(function(body) {

		var response = JSON.parse(body);

		var buses;

		if(response.results.length === 0) {
			buses = "There are no bus stops within a 0.5 mile radius.";
		}
		else {
			buses = response.results[0].name;
		}

		l.bus_stations = buses;
	});
}
