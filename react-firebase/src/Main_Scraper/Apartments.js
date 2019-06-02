module.exports = async function scrapeApartments(url, l)  {
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.apartments.com/avalon-la-jolla-colony-san-diego-ca/ktr63f8/';

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    await rp(proxyurl + url)
        .then(function(html) {
            // console.log('Address: ' + $('div.propertyAddress h2', html).text().trim());
            // console.log('Bedrooms: ' + $('.rentRollupSection span.beds', html).text());
            // console.log('Price: ' + $('.rentRollupSection span.rentRange', html).text());
            //
            // //console.log(html)
            //
            //
            //
            // console.log("Type exit or Ctrl-d to exit or input another link here : ");

            l.url = url;
            l.address = $('div.propertyAddress h2', html).text();
            l.address = l.address.replace(/\s\s+/g, " ");
            l.price = $('.rentRollupSection span.rentRange', html).text();
            l.price = l.price.replace(/\s\s+/g, "").trim();
            l.int_price = Number(l.price.split("-")[0].replace(/[^0-9.]/g, ""));

            // EXTRACT INTO A SEPARATE FUNCTION
            l.area = $('[class=sqft]', html).text();
            var allArea = l.area.split('Sq Ft');
            allArea = allArea.slice(0, allArea.length-1);
            var i;
            for(i = 0; i < allArea.length; i++) {
                allArea[i] = Number(allArea[i].replace(/[^0-9.]/g, ''));
            }
            var minArea = Math.min(...allArea);
            var maxArea = Math.max(...allArea);
            l.area = (minArea == maxArea) ? minArea + " Sq. Ft." : minArea + " Sq. Ft. - " + maxArea + " Sq. Ft.";
            l.int_area = Math.min(...allArea);
            l.bed = $('#rentRollupSection > span.beds.print', html).text();
            l.int_bed = Number(l.bed.split('-',1)[0].replace(/[^0-9.]/g, ""));


            // EXTRACT INTO A SEPARATE FUNCTION
            var allBaths = $('[class=baths]', html).text().replace(/[^0-9.]/g, "");
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


            // EXTRACT INTO A SEPARATE METHOD
            var allDeposit =$('[class="deposit "]', html).text();
            allDeposit = allDeposit.split("$").slice(1);
            for(i = 0; i < allDeposit.length; i++) {
                allDeposit[i] = Number(allDeposit[i].replace(/[^0-9.]/g, ''));
            }
            var minDep = Math.min(...allDeposit);
            var maxDep = Math.max(...allDeposit);

            if(minDep == maxDep) {
                l.deposit = "$" + minDep;
            }
            else {
                l.deposit = "$" + minDep + " - $" + maxDep;
            }

            // EXTRACT INTO A SEPARATE METHOD??
            var propertyType = $('[class=crumb]', html).text().split("\n")[1].replace(/\s\s+/g, "");
            if(propertyType === "Home") {
                l.type = "Apartment";
            }
            else if (propertyType === "Houses") {
                l.type  = "Homes";
            }
            else {
                l.type = propertyType;
            }

            // no contact name info
            // no email info
            l.contact_number = $('#modalContactLead .contactPhone', html).text();

            var pets = $('[class=petPolicyDetails]', html).text().split("\n");
            // replace(/\s\s/g, "");

            // console.log(pets);
            // console.log("AFTER\n");

            // EXTRACT INTO A SEPARATE FUNCTION
            l.pets = "";
            for(i = 0; i < pets.length; i++) {
                pets[i] = pets[i].replace(/\s\s+/g, "");

                if(pets[i] === '') {
                    pets.splice(i, 1);
                    i--;
                }
                else {
                    l.pets = l.pets + pets[i] + "\n";
                }
            }
            l.pets = l.pets.slice(0, l.pets.length-1);

            // no smoking data available


            // EXTRACT INTO A SEPARATE FUNCTION?
            var parking = $('[class=parkingDetails]', html).text().split("\n");
            l.parking = "";
            for(i = 0; i < parking.length; i++) {
                parking[i] = parking[i].replace(/\s\s+/g, "");

                if(parking[i] === '') {
                    parking.splice(i, 1);
                    i--;
                }
                else {
                    l.parking = l.parking + parking[i] + "\n";
                }
            }
            l.parking = l.parking.substring(0, l.parking.length-1);

            l.lease_period = $('[class=leaseLength]', html).text();

            l.description = $('[id=descriptionSection] p', html).text();

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
    // await map_scrape.distance('University of California San Diego', l.address,l);
    // //
    // await map_scrape.getPhoto(l.address, l);
};
