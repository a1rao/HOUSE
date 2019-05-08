module.exports = function scrapeTrulia(url)  {
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.trulia.com/c/ca/san-diego/west-park-7777-westside-dr-san-diego-ca-92108--2079753904';

    rp(url)
        .then(function(html) {
            console.log('Address: ' + $('span.h6.typeWeightNormal.pts.typeLowlight.xxsHidden', html).text());
            console.log('Size: ' + $('ul#property_features.listInlineBulleted.man.pts', html).text());
            console.log('Price: ' + $('span.h3.typeEmphasize', html).text());

        })
        .catch(function(err) {
            console.log(err);
        });
};