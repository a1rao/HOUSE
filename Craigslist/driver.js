const rp = require('request-promise');
const $ = require('cheerio');
const CLParse = require('./CraigslistWS');
var url = prompt('Enter the url.');


rp(url)
    .then(function(html) {
        CLParse(url);
    })
    .catch(function(err) {
        console.log(err);
    });

