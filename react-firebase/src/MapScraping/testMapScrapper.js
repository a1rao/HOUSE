const map_scrape = require('./mapScraper.js');

map_scrape.getPhoto('La Regencia', photolog);
function photolog(name, photo_html, photo_ref){
	console.log(name);
	console.log(photo_ref);
	console.log("The HTML variable stores: " + photo_html);
}

map_scrape.distance('University of California San Diego', 'Regents La Jolla', distlog);
function distlog(dist, dur){
	console.log(dist);
	console.log(dur);
}

map_scrape.groceryStore('Costa Verde', grocers);
function grocers(lists){
	console.log(lists);
}
