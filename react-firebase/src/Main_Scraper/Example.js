const scrape = require('./scrape.js')

scrape('https://www.rent.com/california/la-jolla-apartments/solazzo-apartment-homes-4-427067').then(function(result) {
    setTimeout(function(){console.log(result)}, 5000);
});
