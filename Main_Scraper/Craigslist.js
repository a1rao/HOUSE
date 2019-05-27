module.exports = function scrapeCraigslist(url)  {


    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://sandiego.craigslist.org/ssd/apa/d/imperial-beach-amazing-townhouse/6873411174.html';

    rp(url)
        .then(function(html) {
            console.log('Address: ' + $('div[class=mapaddress]', html).text());
            console.log('Bedroom and bathroom: ' + $('span.shared-line-bubble b', html).text());
            console.log('Price: ' + $('.price', html).text());
            console.log('Description: ' + $('section#postingbody', html).text().trim());
            console.log('Availability: ' + $('span.housing_movein_now.property_date.shared-line-bubble', html).text());
            console.log('Features: ' + $('p.attrgroup span', html).text());
            console.log('Contact info: '+ $('span[id="reply-tel-number"]', html).text());
            console.log('' + $('', html).text());
            console.log('' + $('', html).text());


            console.log("Type exit or Ctrl-d to exit or input another link here : ");
        })
        .catch(function(err) {
            console.log(err);
        });
}

