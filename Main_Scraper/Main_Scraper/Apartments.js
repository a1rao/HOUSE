//module.exports = function scrapeApartments(url)  {
function scrapeApartments(url)  {
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.apartments.com/avalon-la-jolla-colony-san-diego-ca/ktr63f8/';

    rp(url)
        .then(function(html) {
            console.log('Address: ' + $('div.propertyAddress h2', html).text().trim());
            console.log('Bedrooms: ' + $('.rentRollupSection span.beds', html).text());
            console.log('Price: ' + $('.rentRollupSection span.rentRange', html).text());

            //console.log(html)



            console.log("Type exit or Ctrl-d to exit or input another link here : ");
        })
        .catch(function(err) {
            console.log(err);
        });
}

scrapeApartments('https://www.apartments.com/avalon-la-jolla-colony-san-diego-ca/ktr63f8/');