<<<<<<< HEAD
module.exports = function scrapeCraigslist(url)  {
=======
//module.exports = function scrapeCraigslist(url)  {
function scrape(url) {

>>>>>>> 5857171e8e3861bcaf9fc7e225c97e3ab151b4c1
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://sandiego.craigslist.org/ssd/apa/d/imperial-beach-amazing-townhouse/6873411174.html';

    rp(url)
        .then(function(html) {
            console.log('Address: ' + $('div[class=mapaddress]', html).text());
<<<<<<< HEAD
            console.log('Size: ' + $('.housing', html).text());
            console.log('Price: ' + $('.price', html).text());
=======
            console.log('Bedroom and bathroom: ' + $('span.shared-line-bubble b', html).text());
            console.log('Price: ' + $('.price', html).text());
            console.log('Description: ' + $('section#postingbody', html).text().trim());
            console.log('Availability: ' + $('span.housing_movein_now.property_date.shared-line-bubble', html).text());
            console.log('Features: ' + $('p.attrgroup span', html).text());
            console.log('Contact info: '+ $('span[id="reply-tel-number"]', html).text());
            console.log('' + $('', html).text());
            console.log('' + $('', html).text());


            console.log("Type exit or Ctrl-d to exit or input another link here : ");
>>>>>>> 5857171e8e3861bcaf9fc7e225c97e3ab151b4c1
        })
        .catch(function(err) {
            console.log(err);
        });
<<<<<<< HEAD
};
=======
}

scrape('https://sandiego.craigslist.org/ssd/apa/d/national-city-2-bedroom-1-bath/6880128949.html')
>>>>>>> 5857171e8e3861bcaf9fc7e225c97e3ab151b4c1
