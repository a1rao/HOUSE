module.exports = function scrapeApartments(url)  {
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.apartments.com/avalon-la-jolla-colony-san-diego-ca/ktr63f8/';

    rp(url)
        .then(function(html) {
            console.log('Address: ' + $('div.propertyAddress h2', html).text());
            console.log('Bedrooms: ' + $('.rentRollupSection span.beds', html).text());
            console.log('Price: ' + $('.rentRollupSection span.rentRange', html).text());

            //console.log(html)
        })
        .catch(function(err) {
            console.log(err);
        });
}