module.exports = async function scrapeRent(url, l)  {
    const rp = require('request-promise');
    const $ = require('cheerio');
    const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
    const DEFAULT_VALUE = "NA";
    const EMPTY = "";

    await rp(PROXY_URL + url)
        .then(function(html) {

            l.url = url;

            // Get Title
            l.title = $('h1[data-tid="property-title"]', html).text();

            // Get address
            l.address = $('h1[data-tid="property-title"]', html).text() + ", " +
                        $('div[data-tid="pdpKeyInfo_citystatezip"]', html).text();

            // Get Price
            l.price = $('div[data-tid=pdpKeyInfo_price]', html).text();
            l.price = l.price.split('(', 1)[0];
            l.int_price = Number(l.price.split('-',1)[0].replace(/[^0-9.]/g, EMPTY));

            // Get Square footage
            l.area = $('li._33L2a', html).text();
            l.int_area = Number(l.area.split('-',1)[0].replace(/[^0-9.]/g, EMPTY));

            // Get number of bedrooms
            l.bed = $('li[data-tid=pdpKeyInfo_bedText]', html).text();
            l.int_bed = Number(l.bed.split('-',1)[0][0].replace(/[^0-9.]/g, EMPTY));

            // Get number of baths
            l.bath = $('li[data-tid=pdpKeyInfo_bathText]', html).text();
            l.int_bath = Number(l.bath.split("-",1)[0][0].replace(/[^0-9.]/g, EMPTY));

            // Get information for deposit amount
            l.type = $('span[data-tid=pdp-property-details-building-type-content]', html).text();

            // Get the property type
            l.contact_name = $('span[data-tid=pdp-property-details-managed-by-name]',html).text();

            // Get contact information : The site only lists the phone number of the owner
            l.contact_number = $('a.Iw8EN',html).text();

            // Get information on the pet policy
            l.pets = $('div[data-tid="pdpPetPolicyList"] h3._3AGyf', html).text();
            for(var i = 0; i < l.pets.length;i++)  {
                if(l.pets[i] === l.pets[i].toUpperCase())  {
                    l.pets = l.pets.substring(0,i) + " " + l.pets.substring(i);
                    i++;
                }
            }

            // Get information on parking availability
            l.parking = $('h3._3AGyf[data-tid="category-header-4"]', html).text();
            if(l.parking === "Parking" )  {
                l.parking = "Yes";
            } else {
                l.parking = DEFAULT_VALUE;
            }

            // Get lease period information
            l.lease_period = $('div[data-tid="pdpLeasingTerms_Terms"]', html).text();

            // Get a general description
            l.description = $('div.vxm57',html).text();

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
};

//scrape('https://www.rent.com/california/la-jolla-houses/8891-nottingham-pl-4-r2978423https://www.rent.com/california/la-jolla-houses/8891-nottingham-pl-4-r2978423')