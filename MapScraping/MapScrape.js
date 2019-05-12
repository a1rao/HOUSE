/*
const googleMapsClient = require('@google/maps').createClient({
    key : 'AIzaSyAqJJmxy1kZpqY6fzB2ktwd762QDociYpc',
});*/

// Need to insert src in the script tag//
// <script src = "https://maps.googleapis.com/maps/api/js?AIzaSyBTD132iHKIXtMExAf6ZOfX9AMWFAaRm6Y"></script>

function getDistance(address, campus) {
    var distance = new google.maps.DistanceMatrixService();
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

getDistance('Regents La Jolla','University of California San Diego');
