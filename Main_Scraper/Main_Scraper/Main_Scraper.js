const scrapeRentals = require('./Rentals.js');
const scrapeRent = require('./Rent.js');
const scrapeCraigslist = require('./Craigslist.js');
const scrapeTrulia = require('./Trulia.js');
const scrapeApartments = require('./Apartments.js');
const Listing = require('./Listing.js');

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
async function main(data)  {

    console.log("Before Initializing l " + new Date().getTime())
    var l = new Listing(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
    console.log("after initializing l " + new Date().getTime())
    console.log("running...\n");

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
        console.log("Input Data2: " + data);

        // splitting the string to get the text between www. and .com
        const userInputSplitted = data.split(".", 2);
        const siteInfo = userInputSplitted[1];

        console.log("Site to Search: " + siteInfo);

        if (siteInfo === "rentals") {
            scrapeRentals(data);
        } else if (siteInfo === 'rent') {
            console.log("calling srapeRent at " + new Date().getTime())
            await scrapeRent(data,l);
            console.log("returned from function scrapeRent at " + new Date().getTime())

            // var retVal = function hello() {
            //     return l;
            // };
            // setTimeout(hello, 3000)

        } else if (siteInfo === 'trulia') {
            scrapeTrulia(data);
        } else if (siteInfo === "craigslist") {
            scrapeCraigslist(data);
        } else if (siteInfo === "apartments") {
            scrapeApartments(data);
        } else {
            console.log("We cannot scrape from this link.")
        }
    }
    return l;
}
// function r()  {
//     console.log(" retval : " + ret)
// }
//
// setTimeout(r, 10000);

async function fuckThisShit() {
    console.log("Before calling main() " + new Date().getTime())
    var ret = await main('https://www.rent.com/california/la-jolla-houses/8891-nottingham-pl-4-r2978423');
    console.log("Returned from main() at " + new Date().getTime())

    setTimeout(() => {
        console.log("------------------------- address ---------------" + ret.address);
        console.log("------------------------- price ---------------" + ret.price);
    }, 10000)
}

fuckThisShit();