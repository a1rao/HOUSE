// Javascript code to datascrape from Craigslist

const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://sandiego.craigslist.org/ssd/apa/d/imperial-beach-amazing-townhouse/6873411174.html';

rp(url)
    .then(function(html) {
        console.log('Address: ' + $('div[class=mapaddress]', html).text());
        console.log('Size: ' + $('.housing', html).text());
        console.log('Price: ' + $('.price', html).text());
    })
    .catch(function(err) {
        console.log(err);
    });
