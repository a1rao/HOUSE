const scrape = require('./scrape.js')

scrape('https://www.rentals.com/California/San-Diego/lv154310215').then(function(result) {
    setTimeout(function(){console.log(result);}, 5000);
});
