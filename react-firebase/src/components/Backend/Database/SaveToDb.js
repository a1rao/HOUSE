import React, {Component} from 'react';
import app from "../../../base";

/*
 * Functions that will add information to the database
 */

/* To import functions, add this to your file header:
 * import saveData from '../../Backend/Database/SaveToDb.js';
 */

const func = {

    // Save scraped data from listing to database
    saveListing: function(selectedFolder, url, l){

        // Push listing to folder specified by folder
        var uid = app.auth().currentUser.uid;
        var databaseref = app.database().ref('users/' + uid + '/folders/' + selectedFolder);
        var listingKey = databaseref.push().key;
        databaseref.child(listingKey).set({'url':url});

        // Add listing to "listings" table
        databaseref = app.database().ref('listings/');
        databaseref.child(listingKey).set(l);
        console.log("saving");


    }

};

export default func;