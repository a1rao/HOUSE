<<<<<<< HEAD
module.exports = function scrapeApartments(url)  {
=======
//module.exports = function scrapeApartments(url)  {
function scrapeApartments(url)  {
>>>>>>> 5857171e8e3861bcaf9fc7e225c97e3ab151b4c1
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.apartments.com/avalon-la-jolla-colony-san-diego-ca/ktr63f8/';

    rp(url)
        .then(function(html) {
<<<<<<< HEAD
            console.log('Address: ' + $('div.propertyAddress h2', html).text());
=======
            console.log('Address: ' + $('div.propertyAddress h2', html).text().trim());
>>>>>>> 5857171e8e3861bcaf9fc7e225c97e3ab151b4c1
            console.log('Bedrooms: ' + $('.rentRollupSection span.beds', html).text());
            console.log('Price: ' + $('.rentRollupSection span.rentRange', html).text());

            //console.log(html)
<<<<<<< HEAD
=======



            console.log("Type exit or Ctrl-d to exit or input another link here : ");
>>>>>>> 5857171e8e3861bcaf9fc7e225c97e3ab151b4c1
        })
        .catch(function(err) {
            console.log(err);
        });
<<<<<<< HEAD
}
=======
}

scrapeApartments('https://www.apartments.com/avalon-la-jolla-colony-san-diego-ca/ktr63f8/');
>>>>>>> 5857171e8e3861bcaf9fc7e225c97e3ab151b4c1
