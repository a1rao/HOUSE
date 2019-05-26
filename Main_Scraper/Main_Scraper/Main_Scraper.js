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

    //console.log("Before Initializing l " + new Date().getTime())
    var l = new Listing('NA','NA','NA','NA','NA','NA','NA','NA','NA','NA','NA','NA','NA','NA','NA','NA','NA','NA','NA',
                        'NA','NA');
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
            await scrapeRentals(data, l);
        } else if (siteInfo === 'rent') {
            //console.log("calling srapeRent at " + new Date().getTime())
            await scrapeRent(data,l);
            //console.log("returned from function scrapeRent at " + new Date().getTime())

            // var retVal = function hello() {
            //     return l;
            // };
            // setTimeout(hello, 3000)

        } else if (siteInfo === 'trulia') {
            await scrapeTrulia(data,l);
        } else if (siteInfo === "craigslist") {
            await scrapeCraigslist(data,l);
        } else if (siteInfo === "apartments") {
            await scrapeApartments(data, l);
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
    //console.log("Before calling main() " + new Date().getTime())

    // var ret1 = await main('https://www.rent.com/california/la-jolla-houses/8891-nottingham-pl-4-r2978423');
    // var ret2 = await main('https://www.rent.com/california/san-diego-apartments/axiom-la-jolla-4-462064');
    // var ret3 = await main('https://www.rent.com/california/la-jolla-apartments/solazzo-apartment-homes-4-427067');
    // var ret4 = await main('https://www.rent.com/california/san-diego-apartments/olympus-corsair-4-100048895');
    // var ret5 = await main('https://www.rent.com/california/san-diego-apartments/la-jolla-palms-4-442619');

    // //console.log("Returned from main() at " + new Date().getTime())

    // var ret1 = await main('https://www.rentals.com/California/La-Jolla/r2972867');
    // var ret2 = await main('https://www.rentals.com/California/Chula-Vista/r2979400');
    // var ret3 = await main('https://www.rentals.com/Apartments/California/La-Jolla/65412');
    // var ret4 = await main('https://www.rentals.com/Apartments/California/La-Jolla/14605');
    // var ret5 = await main('https://www.rentals.com/Apartments/California/La-Jolla/100028054');
    //
    var ret1 = await main('https://www.trulia.com/p/ca/la-jolla/1115-pearl-st-8-la-jolla-ca-92037--2079470875');
    var ret2 = await main('https://www.trulia.com/c/ca/la-jolla/ocean-house-on-prospect-apartment-homes-400-prospect-st-la-jolla-ca-92037--2079475969');
    var ret3 = await main('https://www.trulia.com/c/ca/la-jolla/solazzo-apartments-homes-8506-villa-la-jolla-dr-la-jolla-ca-92037--2079485381');
    var ret4 = await main('https://www.trulia.com/p/ca/la-jolla/2342-via-siena-la-jolla-ca-92037--1011677623');
    var ret5 = await main('https://www.trulia.com/c/ca/la-jolla/elan-beachcomber-8115-el-paseo-grande-la-jolla-ca-92037--1136376307');


    //setTimeout(() => {
    console.log("---------------------Object returned--------------");
    console.log("------------------------- url --------------- " + ret1.url);
    console.log("------------------------- address ---------------" + ret1.address);
    console.log("------------------------- price --------------- " + ret1.price);
    console.log("------------------------- int_price --------------- " + ret1.int_price);
    console.log("------------------------- bed --------------- " + ret1.bed);
    console.log("------------------------- int_bed --------------- " + ret1.int_bed);
    console.log("------------------------- bath --------------- " + ret1.bath);
    console.log("------------------------- int_bath --------------- " + ret1.int_bath);
    console.log("------------------------- Area --------------- " + ret1.area);
    console.log("------------------------- int_Area --------------- " + ret1.int_area);
    console.log("------------------------- type --------------- " + ret1.type);
    console.log("------------------------- deposit --------------- " + ret1.deposit);
    console.log("------------------------- contact_name --------------- " + ret1.contact_name);
    console.log("------------------------- contact_email --------------- " + ret1.contact_email);
    console.log("------------------------- contact_number --------------- " + ret1.contact_number);
    console.log("------------------------- distance_to_campus --------------- " + ret1.distance_to_campus);
    console.log("------------------------- pets --------------- " + ret1.pets);
    console.log("------------------------- smoking --------------- " + ret1.smoking);
    console.log("------------------------- parking --------------- " + ret1.parking);
    console.log("------------------------- lease_period --------------- " + ret1.lease_period);
    console.log("------------------------- description --------------- " + ret1.description);

    console.log("---------------------Object returned--------------");
    console.log("------------------------- url --------------- " + ret2.url);
    console.log("------------------------- address ---------------" + ret2.address);
    console.log("------------------------- price --------------- " + ret2.price);
    console.log("------------------------- int_price --------------- " + ret2.int_price);
    console.log("------------------------- bed --------------- " + ret2.bed);
    console.log("------------------------- int_bed --------------- " + ret2.int_bed);
    console.log("------------------------- bath --------------- " + ret2.bath);
    console.log("------------------------- int_bath --------------- " + ret2.int_bath);
    console.log("------------------------- Area --------------- " + ret2.area);
    console.log("------------------------- int_Area --------------- " + ret2.int_area);
    console.log("------------------------- type --------------- " + ret2.type);
    console.log("------------------------- deposit --------------- " + ret2.deposit);
    console.log("------------------------- contact_name --------------- " + ret2.contact_name);
    console.log("------------------------- contact_email --------------- " + ret2.contact_email);
    console.log("------------------------- contact_number --------------- " + ret2.contact_number);
    console.log("------------------------- distance_to_campus --------------- " + ret2.distance_to_campus);
    console.log("------------------------- pets --------------- " + ret2.pets);
    console.log("------------------------- smoking --------------- " + ret2.smoking);
    console.log("------------------------- parking --------------- " + ret2.parking);
    console.log("------------------------- lease_period --------------- " + ret2.lease_period);
    console.log("------------------------- description --------------- " + ret2.description);

    console.log("---------------------Object returned--------------");
    console.log("------------------------- url --------------- " + ret3.url);
    console.log("------------------------- address ---------------" + ret3.address);
    console.log("------------------------- price --------------- " + ret3.price);
    console.log("------------------------- int_price --------------- " + ret3.int_price);
    console.log("------------------------- bed --------------- " + ret3.bed);
    console.log("------------------------- int_bed --------------- " + ret3.int_bed);
    console.log("------------------------- bath --------------- " + ret3.bath);
    console.log("------------------------- int_bath --------------- " + ret3.int_bath);
    console.log("------------------------- Area --------------- " + ret3.area);
    console.log("------------------------- int_Area --------------- " + ret3.int_area);
    console.log("------------------------- type --------------- " + ret3.type);
    console.log("------------------------- deposit --------------- " + ret3.deposit);
    console.log("------------------------- contact_name --------------- " + ret3.contact_name);
    console.log("------------------------- contact_email --------------- " + ret3.contact_email);
    console.log("------------------------- contact_number --------------- " + ret3.contact_number);
    console.log("------------------------- distance_to_campus --------------- " + ret3.distance_to_campus);
    console.log("------------------------- pets --------------- " + ret3.pets);
    console.log("------------------------- smoking --------------- " + ret3.smoking);
    console.log("------------------------- parking --------------- " + ret3.parking);
    console.log("------------------------- lease_period --------------- " + ret3.lease_period);
    console.log("------------------------- description --------------- " + ret3.description);

    console.log("---------------------Object returned--------------");
    console.log("------------------------- url --------------- " + ret4.url);
    console.log("------------------------- address ---------------" + ret4.address);
    console.log("------------------------- price --------------- " + ret4.price);
    console.log("------------------------- int_price --------------- " + ret4.int_price);
    console.log("------------------------- bed --------------- " + ret4.bed);
    console.log("------------------------- int_bed --------------- " + ret4.int_bed);
    console.log("------------------------- bath --------------- " + ret4.bath);
    console.log("------------------------- int_bath --------------- " + ret4.int_bath);
    console.log("------------------------- Area --------------- " + ret4.area);
    console.log("------------------------- int_Area --------------- " + ret4.int_area);
    console.log("------------------------- type --------------- " + ret4.type);
    console.log("------------------------- deposit --------------- " + ret4.deposit);
    console.log("------------------------- contact_name --------------- " + ret4.contact_name);
    console.log("------------------------- contact_email --------------- " + ret4.contact_email);
    console.log("------------------------- contact_number --------------- " + ret4.contact_number);
    console.log("------------------------- distance_to_campus --------------- " + ret4.distance_to_campus);
    console.log("------------------------- pets --------------- " + ret4.pets);
    console.log("------------------------- smoking --------------- " + ret4.smoking);
    console.log("------------------------- parking --------------- " + ret4.parking);
    console.log("------------------------- lease_period --------------- " + ret4.lease_period);
    console.log("------------------------- description --------------- " + ret4.description);

    console.log("---------------------Object returned--------------");
    console.log("------------------------- url --------------- " + ret5.url);
    console.log("------------------------- address ---------------" + ret5.address);
    console.log("------------------------- price --------------- " + ret5.price);
    console.log("------------------------- int_price --------------- " + ret5.int_price);
    console.log("------------------------- bed --------------- " + ret5.bed);
    console.log("------------------------- int_bed --------------- " + ret5.int_bed);
    console.log("------------------------- bath --------------- " + ret5.bath);
    console.log("------------------------- int_bath --------------- " + ret5.int_bath);
    console.log("------------------------- Area --------------- " + ret5.area);
    console.log("------------------------- int_Area --------------- " + ret5.int_area);
    console.log("------------------------- type --------------- " + ret5.type);
    console.log("------------------------- deposit --------------- " + ret5.deposit);
    console.log("------------------------- contact_name --------------- " + ret5.contact_name);
    console.log("------------------------- contact_email --------------- " + ret5.contact_email);
    console.log("------------------------- contact_number --------------- " + ret5.contact_number);
    console.log("------------------------- distance_to_campus --------------- " + ret5.distance_to_campus);
    console.log("------------------------- pets --------------- " + ret5.pets);
    console.log("------------------------- smoking --------------- " + ret5.smoking);
    console.log("------------------------- parking --------------- " + ret5.parking);
    console.log("------------------------- lease_period --------------- " + ret5.lease_period);
    console.log("------------------------- description --------------- " + ret5.description);
    //}, 10000)
    return JSON.stringify(ret1);
}

fuckThisShit();