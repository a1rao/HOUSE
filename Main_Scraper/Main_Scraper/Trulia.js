module.exports = async function scrapeTrulia(url, l)  {


    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.trulia.com/c/ca/san-diego/west-park-7777-westside-dr-san-diego-ca-92108--2079753904';

    await rp(url)
        .then(function(html) {
            // console.log('Address: ' + $('span.h6.typeWeightNormal.pts.typeLowlight.xxsHidden', html).text().trim());
            // console.log('Bedrooms : ' + $('li.iconBed', html).text().trim());
            // console.log('Bathrooms : ' + $('li.iconBath', html).text().trim());
            // console.log('Type : ' + $('li.iconHome', html).text().trim());
            // console.log('Size : ' + $('li.iconFloorplan', html).text().trim());
            // console.log('Price: ' + $('span.h3.typeEmphasize', html).text().trim());
            //console.log("Type exit or Ctrl-d to exit or input another link here : ");

            l.url = url;
            l.address = $('div.h2.typeEmphasize.pan.man.defaultLineHeight span', html).text().trim() + " " +
                        $('span.h6.typeWeightNormal.pts.typeLowlight.xxsHidden', html).text().trim();
            //l.address = l.address.split('(',1)[0].trim();
            l.address = l.address.replace(/\s\s+/g, "");
            l.price = $('span.h3.typeEmphasize', html).text().trim();
            l.int_price = Number(l.price.split('-', 1)[0].replace(/[^0-9.]/g, ""));
            l.bed =  $('li.iconBed', html).text();
            l.int_bed = Number(l.bed.split('-',1)[0].replace(/[^0-9.]/g, ""));
            l.bath =  $('li.iconBath', html).text();
            l.int_bath = Number(l.bath.split('-', 1)[0].replace(/[^0-9.]/g, ""));
            l.area =  $('li.iconFloorplan', html).text();
            l.int_area = Number(l.area.split('-', 1)[0].replace(/[^0-9.]/g, ""));
            // no deposit
            l.type = $('li.iconHome', html).text();
            //l.contact_name = $('div.contactDetailsInfo', html).text(); // doesn't work
            // no contact name
            l.contact_number = $('div.mvl a', html).text().replace(/[^0-9.]/g, "").substring(0,10);
            //no email
            l.pets = $('li.iconDog', html).text();
            // no smoking
            // no parking
            // no lease
            l.description =  $('p[id="propertyDescription"]', html).text().replace(/\s\s+/g, "");
            l.contact_name = "none";

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
};

