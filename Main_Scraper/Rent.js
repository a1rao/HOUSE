module.exports = function scrapeRent(url)  {
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.rent.com/california/la-jolla-houses/366-forward-st-unit-f-4-r2821756';

    rp(url)
        .then(function(html) {
            console.log('Address: ' + $('h1._1BHOX', html).text());
            console.log('Price: ' + $('div.Pdhh_', html).text());
            console.log('Size: ' + $('li._33L2a', html).text());
            console.log('Bedroom: ' + $('li[data-tid=pdpKeyInfo_bedText]', html).text());
            console.log('Bathroom: ' + $('li[data-tid=pdpKeyInfo_bathText]', html).text());

            //console.log(html);
        })
        .catch(function(err) {
            console.log(err);
        });
};