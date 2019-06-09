module.exports = async function scrapeTrulia(url, l)  {
    const rp = require('request-promise');
    const $ = require('cheerio');
    const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
    const DEFAULT_VALUE = "NA";
    const EMPTY = "";

    await rp(PROXY_URL + url)
        .then(function(html) {

            l.url = url;

            // Get Title
            l.title = $('div.h2.typeEmphasize.pan.man.defaultLineHeight span', html).text().trim().replace(/\s\s+/g, EMPTY);

            // Get DEFAULT_VALUE
            l.address = $('div.h2.typeEmphasize.pan.man.defaultLineHeight span', html).text().trim() + " " +
                        $('span.h6.typeWeightNormal.pts.typeLowlight.xxsHidden', html).text().trim();
            l.address = l.address.replace(/\s\s+/g, EMPTY);


            // Get Price
            l.price = $('span.h3.typeEmphasize', html).text().trim();
            l.int_price = Number(l.price.split('-', 1)[0].replace(/[^0-9.]/g, EMPTY));

            // Get Square footage
            l.area =  $('li.iconFloorplan', html).text();
            l.int_area = Number(l.area.split('-', 1)[0].replace(/[^0-9.]/g, EMPTY));

            // Get number of bedrooms
            l.bed =  $('li.iconBed', html).text();
            l.int_bed = Number(l.bed.split('-',1)[0].replace(/[^0-9.]/g, EMPTY));

            // Get number of baths
            l.bath =  $('li.iconBath', html).text();
            l.int_bath = Number(l.bath.split('-', 1)[0].replace(/[^0-9.]/g, EMPTY));

            // Get the property type
            l.type = $('li.iconHome', html).text();

            // Get contact information : The site only lists the phone number of the owner
            l.contact_number = $('div.mvl a', html).text().replace(/[^0-9.]/g, EMPTY).substring(0,10);

            // Get information on the pet policy
            l.pets = $('li.iconDog', html).text();

            // Get information on parking availability
            l.description =  $('p[id="propertyDescription"]', html).text().replace(/\s\s+/g, EMPTY);

            // If certain information was not found, set it to default value
            if(l.title === EMPTY) {
                l.title = DEFAULT_VALUE;
            }
            if(l.address === EMPTY) {
                l.address = DEFAULT_VALUE;
            }
            if(l.price === EMPTY) {
                l.price = DEFAULT_VALUE;
            }
            if(l.int_price === EMPTY) {
                l.int_price = DEFAULT_VALUE;
            }
            if(l.bed === EMPTY) {
                l.bed = DEFAULT_VALUE;
            }
            if(l.int_bed === EMPTY) {
                l.int_bed = DEFAULT_VALUE;
            }
            if(l.bath === EMPTY) {
                l.bath = DEFAULT_VALUE;
            }
            if(l.int_bath === EMPTY) {
                l.int_bath = DEFAULT_VALUE;
            }
            if(l.area === EMPTY) {
                l.area = DEFAULT_VALUE;
            }
            if(l.int_area === EMPTY) {
                l.int_area = DEFAULT_VALUE;
            }
            if(l.deposit === EMPTY) {
                l.deposit = DEFAULT_VALUE;
            }
            if(l.type === EMPTY) {
                l.type = DEFAULT_VALUE;
            }
            if(l.contact_name === EMPTY) {
                l.contact_name = DEFAULT_VALUE;
            }
            if(l.contact_email === EMPTY) {
                l.contact_email = DEFAULT_VALUE;
            }
            if(l.contact_number === EMPTY) {
                l.contact_number = DEFAULT_VALUE;
            }
            if(l.pets === EMPTY) {
                l.pets = DEFAULT_VALUE;
            }
            if(l.smoking === EMPTY) {
                l.smoking = DEFAULT_VALUE;
            }
            if(l.parking === EMPTY) {
                l.parking = DEFAULT_VALUE;
            }
            if(l.lease_period === EMPTY) {
                l.lease_period = DEFAULT_VALUE;
            }
            if(l.description === EMPTY) {
                l.description = DEFAULT_VALUE;
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    //
    // await map_scrape.distance('University of California San Diego', l.address,l);
    // await map_scrape.getPhoto(l.address, l);
};

