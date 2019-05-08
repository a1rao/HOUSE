// import {scrapeRentals} from 'Rentals.js';

const scrapeRentals = require('./Rentals.js');
const scrapeRent = require('./Rent.js');
const scrapeCraigslist= require('./Craigslist');
const scrapeTrulia = require('./Trulia.js');
const scrapeApartments = require('./Apartments.js')

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
            scrapeRent(data);
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

    console.log("Type exit or Ctrl-d to exit or input another link here : ");
});

