module.exports = async function scrapeRentals(url, l) {

    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.rentals.com/Apartments/California/San-Diego/2030733';

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    await rp(proxyurl + url)
        .then(function (html) {
            // console.log('Address: ' + $('div._3nu1d', html).text() + " " + $('div._2yfo0', html).text());
            // console.log('Price: ' + $('div._2EN5B', html).text());
            // console.log('Size: ' + $('.kYOWw', html).text());
            // console.log('Bedroom and Bathroom: ' + $('span[data-tid=bed_bath_section]', html).text());
            // console.log('Property Type: ' + $('span._11V9X[data-tid="Property Type"]',html).text());
            // console.log('Deposit: ' + $('span._11V9X[data-tid="Deposit"]',html).text());
            // console.log('Date Available: ' + $('span._11V9X[data-tid="Date Available"]',html).text());
            // console.log('Parking: ' + $('span._11V9X[data-tid="Parking"]',html).text());
            // console.log('Smoking: ' + $('span._11V9X[data-tid="Smoking"]',html).text());
            // console.log('Lease Terms: ' + $('div._11V9X[data-tid="Lease Terms"]',html).text());
            // console.log('Pets: ' + $('div._11V9X[data-tid="Pets"]',html).text() +  ". "  + $('div._25WBb',html).text());
            // console.log('Managed by: ' + $('p[data-tid="managementName"]', html).text());
            // console.log('Contact info: ' + $('a._1c0U0 span', html).text());
            // console.log('Description : ' + $('div[data-tid="listing_text"]', html).text());

            //console.log("Type exit or Ctrl-d to exit or input another link here : ");
            //console.log(html);
            l.url = url;
            l.title = $('div._3nu1d', html).text();
            l.address = $('div._3nu1d', html).text() + " " + $('div._2yfo0', html).text();
            l.price = $('div._2EN5B', html).text();
            l.price = l.price.split('/',1)[0];
            l.int_price = Number(l.price.split('-',1)[0].replace(/[^0-9.]/g, ""));
            l.bed = $('span[data-tid=bed_bath_section]', html).text().split(',', 2);
            l.bath = l.bed[1];
            l.bed = l.bed[0];

            l.int_bed = l.bed.split('-', 1)[0].replace(/[^0-9.]/g, "");;
            if(l.int_bed === "" )  {
                l.int_bed = 0;
            }
            console.log("Before converting bed count to int we have: " + l.int_bed);
            l.int_bed = Number(l.int_bed);
            l.int_bath = Number(l.bath.split('-',1)[0].replace(/[^0-9.]/g, ""));
            l.area =  $('.kYOWw', html).text().replace('•', "").trim();
            l.int_area = Number(l.area.replace(/[^0-9]/g, ""));
            l.deposit = $('span._11V9X[data-tid="Deposit"]',html).text();
            l.type = $('span._11V9X[data-tid="Property Type"]',html).text();
            //console.log('Date Available: ' + $('span._11V9X[data-tid="Date Available"]',html).text();
            l.contact_name =  $('p[data-tid="managementName"]', html).text();
            // no email
            l.contact_number = $('div.EcmxA span', html).text();
            l.pets =  $('div._11V9X[data-tid="Pets"]',html).text();
                //+  ". "  + $('div._25WBb',html).text();
            l.smoking =  $('span._11V9X[data-tid="Smoking"]',html).text();
            l.parking =  $('span._11V9X[data-tid="Parking"]',html).text();
            l.lease_period =  $('div._11V9X[data-tid="Lease Terms"]',html).text();
            l.description = $('div[data-tid="listing_text"]', html).text();

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

    // await map_scrape.distance('University of California San Diego', l.address,l);
    // await map_scrape.getPhoto(l.address, l);
};
