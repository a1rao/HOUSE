module.exports = function scrapeRentals(url) {
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.rentals.com/Apartments/California/San-Diego/2030733';

    rp(url)
        .then(function (html) {
            console.log('Address: ' + $('div._3nu1d', html).text());
            console.log('Price: ' + $('div._2EN5B', html).text());
            console.log('Size: ' + $('.kYOWw', html).text());
            console.log('Bedroom and Bathroom: ' + $('span[data-tid=bed_bath_section]', html).text());

            //console.log(html);
        })
        .catch(function (err) {
            console.log(err);
        });
};