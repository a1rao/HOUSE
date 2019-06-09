module.exports = async function scrapeRentals(url, l) {
    const rp = require('request-promise');
    const $ = require('cheerio');
    const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
    const DEFAULT_VALUE = "NA";
    const EMPTY = "";

    await rp(PROXY_URL + url)
        .then(function (html) {

            l.url = url;

            // Get Title
            l.title = $('div._3nu1d', html).text();

            // Get address
            l.address = $('div._3nu1d', html).text() + " " + $('div._2yfo0', html).text();

            // Get Price
            l.price = $('div._2EN5B', html).text();
            l.price = l.price.split('/',1)[0];
            l.int_price = Number(l.price.split('-',1)[0].replace(/[^0-9.]/g, EMPTY));

            // Get Square footage
            l.area =  $('.kYOWw', html).text().replace('•', EMPTY).trim();
            l.int_area = Number(l.area.replace(/[^0-9]/g, EMPTY));

            // Get number of bedrooms and bathrooms
            l.bed = $('span[data-tid=bed_bath_section]', html).text().split(',', 2);
            l.bath = l.bed[1];
            l.bed = l.bed[0];
            l.int_bed = l.bed.split('-', 1)[0].replace(/[^0-9.]/g, EMPTY);;
            if(l.int_bed === EMPTY )  {
                l.int_bed = 0;
            }
            l.int_bed = Number(l.int_bed);
            l.int_bath = Number(l.bath.split('-',1)[0].replace(/[^0-9.]/g, EMPTY));

            // Get information for deposit amount
            l.deposit = $('span._11V9X[data-tid="Deposit"]',html).text();

            // Get the property type
            l.type = $('span._11V9X[data-tid="Property Type"]',html).text();

            // Get contact information : The site only lists the name and the phone number of the owner.
            l.contact_name =  $('p[data-tid="managementName"]', html).text();
            l.contact_number = $('div.EcmxA span', html).text();

            // Get information on the pet policy
            l.pets =  $('div._11V9X[data-tid="Pets"]',html).text();

            // Get information on the smoking policy
            l.smoking =  $('span._11V9X[data-tid="Smoking"]',html).text();

            // Get information on parking availability
            l.parking =  $('span._11V9X[data-tid="Parking"]',html).text();

            // Get lease period information
            l.lease_period =  $('div._11V9X[data-tid="Lease Terms"]',html).text();

            // Get a general description
            l.description = $('div[data-tid="listing_text"]', html).text();

            // If certain information was not found, set it to default value
            if(l.title === EMPTY) {
                l.title = DEFAULT_VALUE;
            }
            if(l.address === EMPTY) {
                l.address = DEFAULT_VALUE;
            }
            if(l.price === EMPTY) {
                l.price = DEFAULT_VALUE;
            }
            if(l.int_price === EMPTY) {
                l.int_price = DEFAULT_VALUE;
            }
            if(l.bed === EMPTY) {
                l.bed = DEFAULT_VALUE;
            }
            if(l.int_bed === EMPTY) {
                l.int_bed = DEFAULT_VALUE;
            }
            if(l.bath === EMPTY) {
                l.bath = DEFAULT_VALUE;
            }
            if(l.int_bath === EMPTY) {
                l.int_bath = DEFAULT_VALUE;
            }
            if(l.area === EMPTY) {
                l.area = DEFAULT_VALUE;
            }
            if(l.int_area === EMPTY) {
                l.int_area = DEFAULT_VALUE;
            }
            if(l.deposit === EMPTY) {
                l.deposit = DEFAULT_VALUE;
            }
            if(l.type === EMPTY) {
                l.type = DEFAULT_VALUE;
            }
            if(l.contact_name === EMPTY) {
                l.contact_name = DEFAULT_VALUE;
            }
            if(l.contact_email === EMPTY) {
                l.contact_email = DEFAULT_VALUE;
            }
            if(l.contact_number === EMPTY) {
                l.contact_number = DEFAULT_VALUE;
            }
            if(l.pets === EMPTY) {
                l.pets = DEFAULT_VALUE;
            }
            if(l.smoking === EMPTY) {
                l.smoking = DEFAULT_VALUE;
            }
            if(l.parking === EMPTY) {
                l.parking = DEFAULT_VALUE;
            }
            if(l.lease_period === EMPTY) {
                l.lease_period = DEFAULT_VALUE;
            }
            if(l.description === EMPTY) {
                l.description = DEFAULT_VALUE;
            }

        })
        .catch(function (err) {
            console.log(err);
        });
};
