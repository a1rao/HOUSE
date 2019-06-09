module.exports = async function scrapeApartments(url, l)  {
    const rp = require('request-promise');
    const $ = require('cheerio');
    const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
    const DEFAULT_VALUE = "NA";
    const EMPTY = "";

    await rp( PROXY_URL + url)
        .then(function(html) {

            l.url = url;

            // Get Title
            l.title = $('h1.propertyName', html).text().replace(/\s\s+/g, " ");

            // Get address
            l.address = $('div.propertyAddress h2', html).text();
            l.address = l.address.replace(/\s\s+/g, " ");

            // Get Price
            l.price = $('.rentRollupSection span.rentRange', html).text();
            l.price = l.price.replace(/\s\s+/g, EMPTY).trim();
            l.int_price = Number(l.price.split("-")[0].replace(/[^0-9.]/g, EMPTY));

            // Get Square footage
            l.area = $('[class=sqft]', html).text();
            var allArea = l.area.split('Sq Ft');
            allArea = allArea.slice(0, allArea.length-1);
            var i;
            for(i = 0; i < allArea.length; i++) {
                allArea[i] = Number(allArea[i].replace(/[^0-9.]/g, EMPTY));
            }
            var minArea = Math.min(...allArea);
            var maxArea = Math.max(...allArea);
            l.area = (minArea == maxArea) ? minArea + " Sq. Ft." : minArea + " Sq. Ft. - " + maxArea + " Sq. Ft.";
            l.int_area = Math.min(...allArea);

            // Get number of bedrooms
            l.bed = $('#rentRollupSection > span.beds.print', html).text();
            l.int_bed = Number(l.bed.split('-',1)[0].replace(/[^0-9.]/g, EMPTY));


            // Get number of baths
            var allBaths = $('[class=baths]', html).text().replace(/[^0-9.]/g, EMPTY);
            i = 0;
            var baths = [];
            while( i < allBaths.length) {
                baths.push(Number(allBaths[i]));
                i = i + 3;
            }
            var minBaths = Math.min(...baths);
            var maxBaths = Math.max(...baths);
            l.bath = (minBaths == maxBaths) ? minBaths : minBaths + " - " + maxBaths;
            l.int_bath = minBaths;

            // Get information for deposit amount
            var allDeposit =$('[class="deposit "]', html).text();
            allDeposit = allDeposit.split("$").slice(1);
            for(i = 0; i < allDeposit.length; i++) {
                allDeposit[i] = Number(allDeposit[i].replace(/[^0-9.]/g, EMPTY));
            }
            var minDep = Math.min(...allDeposit);
            var maxDep = Math.max(...allDeposit);
            if(minDep == maxDep) {
                l.deposit = "$" + minDep;
            } else {
                l.deposit = "$" + minDep + " - $" + maxDep;
            }

            // Get the property type
            var propertyType = $('[class=crumb]', html).text().split("\n")[1].replace(/\s\s+/g, EMPTY);
            if(propertyType === "Home") {
                l.type = "Apartment";
            }
            else if (propertyType === "Houses") {
                l.type  = "Homes";
            }
            else {
                l.type = propertyType;
            }

            // Get contact information : The site only lists the name and the phone number of the owner.
            l.contact_number = $('#modalContactLead .contactPhone', html).text();
            l.contact_name = $('[class=logoColumnContainer]', html)[0].children[0].next.attribs.alt;

            var pets = $('[class=petPolicyDetails]', html).text().split("\n");

            // Get information on the pet policy
            l.pets = EMPTY;
            for(i = 0; i < pets.length; i++) {
                pets[i] = pets[i].replace(/\s\s+/g, EMPTY);

                if(pets[i] === EMPTY) {
                    pets.splice(i, 1);
                    i--;
                }
                else {
                    l.pets = l.pets + pets[i] + "\n";
                }
            }
            l.pets = l.pets.slice(0, l.pets.length-1);

            // Get information on parking availability
            var parking = $('[class=parkingDetails]', html).text().split("\n");
            l.parking = EMPTY;
            for(i = 0; i < parking.length; i++) {
                parking[i] = parking[i].replace(/\s\s+/g, EMPTY);

                if(parking[i] === EMPTY) {
                    parking.splice(i, 1);
                    i--;
                }
                else {
                    l.parking = l.parking + parking[i] + "\n";
                }
            }
            l.parking = l.parking.substring(0, l.parking.length-1);

            // Get lease period information
            l.lease_period = $('[class=leaseLength]', html).text();

            // Get a general description
            l.description = $('[id=descriptionSection] p', html).text();


            // If certain information was not found, set it to default value
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
            if(l.type === EMPTY) {
                l.type = DEFAULT_VALUE;
            }
            if(l.contact_name === EMPTY) {
                l.contact_name = DEFAULT_VALUE;
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
