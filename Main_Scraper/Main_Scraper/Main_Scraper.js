const scrapeRentals = require('./Rentals.js');
const scrapeRent = require('./Rent.js');
const scrapeCraigslist = require('./Craigslist.js');
const scrapeTrulia = require('./Trulia.js');
const scrapeApartments = require('./Apartments.js');
const Listing = require('./Listing.js');
const Test = require('./Test.js')

// creates a standard input object
const inputObject = process.stdin;

// sets encoding
inputObject.setEncoding('utf-8');

console.log("running...\n");

// request url
console.log("Input the listing's link here:");

// get user's input
inputObject.on('data', function(data)  {

    // exit condition
    if(data === 'exit\n')  {
        console.log("Exited");
        process.exit();
    } else {
        console.log("Input Data: " + data);

        // splitting the string to get the text between www. and .com
        const userInputSplitted= data.split(".", 2);
        const siteInfo = userInputSplitted[1];

        console.log("Site to Search: " + siteInfo );

        if (siteInfo === "rentals") {
            scrapeRentals(data);
        } else if (siteInfo === 'rent') {
            var l = scrapeRent(data)

            function hello() {
                console.log("1 " + l.address)
            }
            // $(document).bind('function_scrapeRent_complete', hello);
            setTimeout(hello, 3000)

            // var l = Test();
            // console.log("in main");
            // console.log(l)
        } else if (siteInfo === 'trulia') {
            scrapeTrulia(data);
        } else if (siteInfo === "craigslist") {
            scrapeCraigslist(data);
        } else if (siteInfo === "apartments")  {
            scrapeApartments(data);
        } else {
            console.log("We cannot scrape from this link.")
        }
    }
});
