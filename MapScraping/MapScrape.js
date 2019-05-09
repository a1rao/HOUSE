const googleMapsClient = require('@google/maps').createClient({
    key : 'AIzaSyBOltxSbHWVs44HvGno_ALoVcDEFMVOSPQ'
});

function getDistance(address, campus) {
    var distance = new googleMapsClient.distanceMatrix(
    {
        origins: address,
        destinations: campus,
        mode: 'driving',
        units: 'metric',
        avoid: 'tolls',
    },
    function (err, response) {
        if (!err) {
            console.log(response);
            $("#distance").text(response.rows[0].elements[0].distance.text).show();
            $("#duration").text(response.rows[0].elements[0].duration.text).show();
        } else {
            console.log(err);
        }
    });
}
var start = ['Regents La Jolla'];
var end = ['9500 Gilman Dr, La Jolla, CA 92093'];
getDistance(start, end);
