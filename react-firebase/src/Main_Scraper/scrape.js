const Main_Scraper = require('./Main_Scraper.js');

module.exports = async function scrape(url, callback) {

    // Create a Main_Scraper object which to use it's Listing object
    let ret = await new Main_Scraper();

    // Scrape for data
    await ret.scrape(url);

    // Call callback function
    callback(ret.l);
};