module.exports = async function scrapeRent(url, l)  {
    //console.log("entered function srapeRent " + new Date().getTime())
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.rent.com/california/la-jolla-houses/366-forward-st-unit-f-4-r2821756';
    //var l = new Listing(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    //console.log("calling function rp at " + new Date().getTime())
    await rp(url)
        .then(function(html) {
            //console.log("entered .then() of rp at " + new Date().getTime())
            // console.log('Address: ' + $('h1[data-tid="property-title"]', html).text() + ", " +
            //             $('div[data-tid="pdpKeyInfo_citystatezip"]', html).text());
            // console.log('Price: ' + $('div[data-tid=pdpKeyInfo_price]', html).text());
            // console.log('Area: ' + $('li._33L2a', html).text());
            // console.log('Bedroom: ' + $('li[data-tid=pdpKeyInfo_bedText]', html).text());
            // console.log('Bathroom: ' + $('li[data-tid=pdpKeyInfo_bathText]', html).text());
            // console.log('Contact info: ' + $('a.Iw8EN',html).text());
            // console.log('Description: ' + $('div.vxm57',html).text());
            // console.log('Building type: ' + $('span[data-tid=pdp-property-details-building-type-content]', html).text());
            // console.log('Managed by: ' + $('span[data-tid=pdp-property-details-managed-by-name]',html).text());
            // console.log('Pets: ' + $('div ._3jOqI h3._3AGyf', html).text());

            //console.log("Type exit or Ctrl-d to exit or input another link here : ");
            l.url = url;
            l.address = $('h1[data-tid="property-title"]', html).text() + ", " +
                        $('div[data-tid="pdpKeyInfo_citystatezip"]', html).text();
            l.price = $('div[data-tid=pdpKeyInfo_price]', html).text();
            l.price = l.price.split('(', 1)[0];
            l.int_price = l.price.replace(/[^0-9.]/g, "");
            l.area = $('li._33L2a', html).text();
            l.int_area = l.area.split('-',1)[0].replace(/[^0-9.]/g, "");
            l.bed = $('li[data-tid=pdpKeyInfo_bedText]', html).text();
            l.int_bed = l.bed.split('-',1)[0];
            l.int_bed = l.int_bed[0].replace(/[^0-9.]/g, "");
            l.bath = $('li[data-tid=pdpKeyInfo_bathText]', html).text();
            l.int_bath = l.bath.split("-",1)[0];
            l.int_bath = l.int_bath[0].replace(/[^0-9.]/g, "");;
            // no deposit info
            l.type = $('span[data-tid=pdp-property-details-building-type-content]', html).text();
            l.contact_name = $('span[data-tid=pdp-property-details-managed-by-name]',html).text();
            // no email info
            l.contact_number = $('a.Iw8EN',html).text().replace(/[^0-9.]/g, "");
            l.pets = $('div[data-tid="pdpPetPolicyList"] h3._3AGyf', html).text();
            // no smoking
            l.parking = $('h3._3AGyf[data-tid="category-header-4"]', html).text();
            if(l.parking === "Parking" )  {
                l.parking = "Yes";
            } else {
                l.parking = "NA";
            }
            l.lease_period = $('div[data-tid="pdpLeasingTerms_Terms"]', html).text();
            l.description = $('div.vxm57',html).text();
            //console.log("finished executing .then() of rp at " + new Date().getTime())

            if(l.url === "") {
                l.url = "NA";
            }
            if(l.address === "") {
                l.address = "NA";
            }
            if(l.price === "") {
                l.price = "NA";
            }
            if(l.int_price === "") {
                l.int_price = "NA";
            }
            if(l.bed === "") {
                l.bed = "NA";
            }
            if(l.int_bed === "") {
                l.int_bed = "NA";
            }
            if(l.bath === "") {
                l.bath = "NA";
            }
            if(l.int_bath === "") {
                l.int_bath = "NA";
            }
            if(l.area === "") {
                l.area = "NA";
            }
            if(l.int_area === "") {
                l.int_area = "NA";
            }
            if(l.type === "") {
                l.type = "NA";
            }
            if(l.contact_name === "") {
                l.contact_name = "NA";
            }
            if(l.contact_number === "") {
                l.contact_number = "NA";
            }
            if(l.pets === "") {
                l.pets = "NA";
            }
            if(l.smoking === "") {
                l.smoking = "NA";
            }
            if(l.parking === "") {
                l.parking = "NA";
            }
            if(l.lease_period === "") {
                l.lease_period = "NA";
            }
            if(l.description === "") {
                l.description = "NA";
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    //console.log("finished executing function scrapeRent at " + new Date().getTime())
};

//scrape('https://www.rent.com/california/la-jolla-houses/8891-nottingham-pl-4-r2978423https://www.rent.com/california/la-jolla-houses/8891-nottingham-pl-4-r2978423')