const scrape = require('./scrape.js')

scrape('https://www.rent.com/california/san-diego-apartments/the-villas-of-renaissance-4-439424').then(function(result) {
    setTimeout(function(){console.log(result);}, 5000);
});
