const Listing = require('./Listing.js');
const scrapeRentals = require('./Rentals.js');
const scrapeRent = require('./Rent.js');
const scrapeTrulia = require('./Trulia.js');
const scrapeApartments = require('./Apartments.js');
const mapScraper = require('../MapScraping/mapScraper.js');

module.exports = class Main_Scraper {
    get l() {
        return this._l;
    }

    set l(value) {
        this._l = value;
    }

    constructor() {

        this._l = new Listing('NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA',
            'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA');
    }
    async scrape(data) {

        // splitting the string to get the text between www. and .com
        const userInputSplitted = data.split(".", 2);
        const siteInfo = userInputSplitted[1];

        // Call the respective custom Scraping method to relevant information from
        // the original listing page
        if (siteInfo === "rentals") {
            await scrapeRentals(data, this.l);
        } else if (siteInfo === 'rent') {
            await scrapeRent(data, this.l);
        } else if (siteInfo === 'trulia') {
            await scrapeTrulia(data, this.l);
        } else if (siteInfo === "apartments") {
            await scrapeApartments(data, this.l);
        } else {
            console.log("We cannot scrape from this link.")
        }

        // Get information like distance to campus, an image for the respective housing
        // and grocery stores and bus stops near the apartment
        await mapScraper.getDistance(this.l.address, this.l);
        await mapScraper.getAdditionalInformation(this.l.address, this.l);

    }
};


