const Listing = require('./Listing.js');

module.exports = async function scrapeRent(url, l)  {
    console.log("entered function srapeRent " + new Date().getTime())
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.rent.com/california/la-jolla-houses/366-forward-st-unit-f-4-r2821756';
    //var l = new Listing(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    console.log("calling function rp at " + new Date().getTime())
    await rp(url)
        .then(function(html) {
            console.log("entered .then() of rp at " + new Date().getTime())
            console.log('Address: ' + $('h1._1BHOX', html).text());
            console.log('Price: ' + $('div.Pdhh_', html).text());
            console.log('Area: ' + $('li._33L2a', html).text());
            console.log('Bedroom: ' + $('li[data-tid=pdpKeyInfo_bedText]', html).text());
            console.log('Bathroom: ' + $('li[data-tid=pdpKeyInfo_bathText]', html).text());
            console.log('Contact info: ' + $('a.Iw8EN',html).text());
            console.log('Description: ' + $('div.vxm57',html).text());
            console.log('Building type: ' + $('span[data-tid=pdp-property-details-building-type-content]', html).text());
            console.log('Managed by: ' + $('span[data-tid=pdp-property-details-managed-by-name]',html).text());

            console.log("Type exit or Ctrl-d to exit or input another link here : ");

            l.address = $('h1._1BHOX', html).text();
            l.price = $('div.Pdhh_', html).text();
            l.area = $('li._33L2a', html).text();
            l.bed = $('li[data-tid=pdpKeyInfo_bedText]', html).text();
            l.bath = $('li[data-tid=pdpKeyInfo_bathText]', html).text();
            l.contact_number = $('a.Iw8EN',html).text();
            l.description = $('div.vxm57',html).text();
            l.type = $('span[data-tid=pdp-property-details-building-type-content]', html).text();
            l.contact_name = $('span[data-tid=pdp-property-details-managed-by-name]',html).text();
            console.log("finished executing .then() of rp at " + new Date().getTime())
        })
        .catch(function(err) {
            console.log(err);
        });
    console.log("finished executing function scrapeRent at " + new Date().getTime())
    return l;
};

//scrape('https://www.rent.com/california/la-jolla-houses/8891-nottingham-pl-4-r2978423https://www.rent.com/california/la-jolla-houses/8891-nottingham-pl-4-r2978423')