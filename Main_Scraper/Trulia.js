<<<<<<< HEAD
module.exports = function scrapeTrulia(url)  {
=======
//module.exports = function scrapeTrulia(url)  {
function scrape(url)  {

>>>>>>> 5857171e8e3861bcaf9fc7e225c97e3ab151b4c1
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.trulia.com/c/ca/san-diego/west-park-7777-westside-dr-san-diego-ca-92108--2079753904';

    rp(url)
        .then(function(html) {
<<<<<<< HEAD
            console.log('Address: ' + $('span.h6.typeWeightNormal.pts.typeLowlight.xxsHidden', html).text());
            console.log('Size: ' + $('ul#property_features.listInlineBulleted.man.pts', html).text());
            console.log('Price: ' + $('span.h3.typeEmphasize', html).text());
=======
            console.log('Address: ' + $('span.h6.typeWeightNormal.pts.typeLowlight.xxsHidden', html).text().trim());
            console.log('Bedrooms : ' + $('li.iconBed', html).text().trim());
            console.log('Bathrooms : ' + $('li.iconBath', html).text().trim());
            console.log('Type : ' + $('li.iconHome', html).text().trim());
            console.log('Size : ' + $('li.iconFloorplan', html).text().trim());
            console.log('Price: ' + $('span.h3.typeEmphasize', html).text().trim());


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

scrape('https://www.trulia.com/p/ca/san-diego/9588-ronda-ave-san-diego-ca-92123--2079915973')
>>>>>>> 5857171e8e3861bcaf9fc7e225c97e3ab151b4c1
