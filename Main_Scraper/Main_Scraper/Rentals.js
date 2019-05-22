module.exports = async function scrapeRentals(url, l) {

    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.rentals.com/Apartments/California/San-Diego/2030733';

    await rp(url)
        .then(function (html) {
            console.log('Address: ' + $('div._3nu1d', html).text() + " " + $('div._2yfo0', html).text());
            console.log('Price: ' + $('div._2EN5B', html).text());
            console.log('Size: ' + $('.kYOWw', html).text());
            console.log('Bedroom and Bathroom: ' + $('span[data-tid=bed_bath_section]', html).text());
            console.log('Property Type: ' + $('span._11V9X[data-tid="Property Type"]',html).text());
            console.log('Deposit: ' + $('span._11V9X[data-tid="Deposit"]',html).text());
            console.log('Date Available: ' + $('span._11V9X[data-tid="Date Available"]',html).text());
            console.log('Parking: ' + $('span._11V9X[data-tid="Parking"]',html).text());
            console.log('Smoking: ' + $('span._11V9X[data-tid="Smoking"]',html).text());
            console.log('Lease Terms: ' + $('div._11V9X[data-tid="Lease Terms"]',html).text());
            console.log('Pets: ' + $('div._11V9X[data-tid="Pets"]',html).text() +  ". "  + $('div._25WBb',html).text());
            console.log('Managed by: ' + $('p[data-tid="managementName"]', html).text());
            console.log('Contact info: ' + $('a._1c0U0 span', html).text());
            console.log('Description : ' + $('div[data-tid="listing_text"]', html).text());


            //console.log("Type exit or Ctrl-d to exit or input another link here : ");
            //console.log(html);
            if(l.url === "") {
                l.url = "NA";
            }
            if(l.address === "") {
                l.address = "NA";
            }
            if(l.price === "") {
                l.price = "NA";
            }
            if(l.int_price === "") {
                l.int_price = "NA";
            }
            if(l.bed === "") {
                l.bed = "NA";
            }
            if(l.int_bed === "") {
                l.int_bed = "NA";
            }
            if(l.bath === "") {
                l.bath = "NA";
            }
            if(l.int_bath === "") {
                l.int_bath = "NA";
            }
            if(l.area === "") {
                l.area = "NA";
            }
            if(l.int_area === "") {
                l.int_area = "NA";
            }
            if(l.deposit === "") {
                l.deposit = "NA";
            }
            if(l.type === "") {
                l.type = "NA";
            }
            if(l.contact_name === "") {
                l.contact_name = "NA";
            }
            if(l.contact_email === "") {
                l.contact_email = "NA";
            }
            if(l.contact_number === "") {
                l.contact_number = "NA";
            }
            if(l.pets === "") {
                l.pets = "NA";
            }
            if(l.smoking === "") {
                l.smoking = "NA";
            }
            if(l.parking === "") {
                l.parking = "NA";
            }
            if(l.lease_period === "") {
                l.lease_period = "NA";
            }
            if(l.description === "") {
                l.description = "NA";
            }
        })
        .catch(function (err) {
            console.log(err);
        });
};
