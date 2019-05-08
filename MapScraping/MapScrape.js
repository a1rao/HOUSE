const googleMapsClient = require('@google/maps').createClient({
    key : 'AlzaSyBOItxSbHWVs44HvGno_ALoVcDEFMVOSPQ'
});

function getDistance(address, campus) {
    var distance = new googleMapsClient..DistanceMatrixService();
    distance.getDistanceMatrix({
        origins: address,
        destination: campus,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: true,
    },
    function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log('Error:', status);
        } else {
            console.log(response);
            $("#distance").text(response.rows[0].elements[0].distance.text).show();
            $("#duration").text(response.rows[0].elements[0].duration.text).show();
        }
    });
}

getDistance('Regents La Jolla','9500 Gilman Dr, La Jolla, CA 92093');
