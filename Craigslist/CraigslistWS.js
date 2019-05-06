// Javascript code to datascrape from Craigslist

const rp = require('request-promise');
const $ = require('cheerio');

const CLParse = function(url) {
    rp(url)
        .then(function(html) {
                console.log('Address: ' + $('div[class=mapaddress]', html).text());
                console.log('Size: ' + $('.housing', html).text());
                console.log('Price: ' + $('.price', html).text());
        })
        .catch(function(err) {
            console.log(err);
        });
};

module.exports = CLParse;
