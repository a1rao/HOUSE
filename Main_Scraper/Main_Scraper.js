// import {scrapeRentals} from 'Rentals.js';

const scrapeRentals = require('./Rentals.js');
const scrapeRent = require('./Rent.js');

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
            scrapeCraigsList(data);
        } else if (siteInfo === "apartments")  {
            scrapeApartments(data);
        } else {
            console.log("We cannot scrape from this link.")
        }
    }

    console.log("Type exit or Ctrl-d to exit or input another link here : ");
});


function scrapeTrulia(url)  {
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
}

function scrapeCraigsList(url)  {
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://sandiego.craigslist.org/ssd/apa/d/imperial-beach-amazing-townhouse/6873411174.html';

    rp(url)
        .then(function(html) {
            console.log('Address: ' + $('div[class=mapaddress]', html).text());
            console.log('Size: ' + $('.housing', html).text());
            console.log('Price: ' + $('.price', html).text());
        })
        .catch(function(err) {
            console.log(err);
        });
}

function scrapeApartments(url)  {
    const rp = require('request-promise');
    const $ = require('cheerio');
    //const url = 'https://www.apartments.com/avalon-la-jolla-colony-san-diego-ca/ktr63f8/';

    rp(url)
        .then(function(html) {
            console.log('Address: ' + $('div.propertyAddress h2', html).text());
            console.log('Bedrooms: ' + $('.rentRollupSection span.beds', html).text());
            console.log('Price: ' + $('.rentRollupSection span.rentRange', html).text());

            //console.log(html)
        })
        .catch(function(err) {
            console.log(err);
        });
}