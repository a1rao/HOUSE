//const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
//
// // creates a standard input object
// const inputObject = process.stdin;
// // sets encoding
// inputObject.setEncoding('utf-8');
// get user's input
// inputObject.on('data'){
//     main(data);
// }
// async function getInputURL() {
//     let ret;
//     // await rl.question('Input URL here: ', (input) => {
//     //     console.log("Called the fucking callback method right FUCKING HERE ---------------------")
//     //     console.log(`Received: ${input}`);
//     //     ret = input;
//     // });
//     ret = prompt("Input URL here: ")
//     console.log("Why the fuck did I ome here even with the await tag before calling a function??????????????")
//     return ret;
// }

const Listing = require('./Listing.js');
const scrapeRentals = require('./Rentals.js');
const scrapeRent = require('./Rent.js');
const scrapeCraigslist = require('./Craigslist.js');
const scrapeTrulia = require('./Trulia.js');
const scrapeApartments = require('./Apartments.js');

module.exports = class Main_Scraper {
    get l() {
        return this._l;
    }

    set l(value) {
        this._l = value;
    }

    constructor() {

        this._l = new Listing('NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA',
            'NA', 'NA');
    }
    async scrape(data) {

        //console.log("Before Initializing l " + new Date().getTime())
        //console.log("after initializing l " + new Date().getTime())
        //console.log("running...\n");
        // const readline = require('readline').createInterface({
        //     input: process.stdin,
        //     output: process.stdout
        // });
        //
        // let data;
        // await readline.question(`Input the Listing's link here: `, (data) => {
        //     data = data;
        //     console.log(`Input Data:  ${data}!`)
        //     readline.close()
        // });
        //var data = await getInputURL();
        //console.log("The data read in is " + data + " -------------------------------------------- ")
        //const readline = require('readline');
        //getInput();
        // async function getUrl() {
        //     return new Promise(resolve => {
        //         const rl = readline.createInterface({
        //             input:  process.stdin,
        //             output: process.stdout
        //         });
        //         rl.question("Input URL here ", (answer) => {
        //             resolve(answer);
        //             console.log("Input data1: ", answer);
        //             rl.close();
        //         });
        //     });
        // }
        // async function getInput() {
        //     data = await getUrl();
        //exit condition

        if (data === 'exit\n') {
            console.log("Exited");
            process.exit();
        } else {
            //console.log("URl to scrape: " + data);
            // splitting the string to get the text between www. and .com
            const userInputSplitted = data.split(".", 2);
            const siteInfo = userInputSplitted[1];

            //console.log("Site to Scrape: " + siteInfo);

            if (siteInfo === "rentals") {
                await scrapeRentals(data, this.l);
            } else if (siteInfo === 'rent') {
                //console.log("calling srapeRent at " + new Date().getTime())
                await scrapeRent(data, this.l);
                //console.log("returned from function scrapeRent at " + new Date().getTime())
                // var retVal = function hello() {
                //     return l;
                // };
                // setTimeout(hello, 3000)
            } else if (siteInfo === 'trulia') {
                await scrapeTrulia(data, this.l);
            } else if (siteInfo === "craigslist") {
                await scrapeCraigslist(data, this.l);
            } else if (siteInfo === "apartments") {
                await scrapeApartments(data, this.l);
            } else {
                console.log("We cannot scrape from this link.")
            }
        }
        return JSON.stringify(this.l);
    }

// function r()  {
//     console.log(" retval : " + ret)
// }
//
// setTimeout(r, 10000);
};


