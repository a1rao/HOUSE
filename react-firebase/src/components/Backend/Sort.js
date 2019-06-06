

// Sort by price
const func = {
    sortPrice: function (listings, s) {
        if(s === "_price") {
            listings.sort(function (a, b) {
                if (a._int_price < b._int_price) {
                    return -1;
                }
                if (a._int_price > b._int_price) {
                    return 1;
                }
                return 0;
            });
        }
        else if(s === "_area") {
            listings.sort(function (a, b) {
                if (a._int_area > b._int_area) {
                    return -1;
                }
                if (a._int_area < b._int_area) {
                    return 1;
                }
                return 0;
            });
        }
        else if(s === "_distance_to_campus") {
            listings.sort(function (a, b) {
                if (a._distance_to_campus > b._distance_to_campus) {
                    return -1;
                }
                if (a._distance_to_campus < b._distance_to_campus) {
                    return 1;
                }
                return 0;
            });
        }
        else if(s === "_bed") {
            listings.sort(function (a, b) {
                if (a._int_bed > b._int_bed) {
                    return -1;
                }
                if (a._int_bed< b._int_bed) {
                    return 1;
                }
                return 0;
            });
        }
        return listings;
    }
}

export default func;

