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
        l._id = listingKey;
        databaseref.child(listingKey).set({'url':url});

        // Add listing to "listings" table
        databaseref = app.database().ref('listings/');
        databaseref.child(listingKey).set(l);
        console.log("saving");


    },

    removeListing: function(selectedFolder, l) {
        let uid = app.auth().currentUser.uid;
        let databaseref = app.database().ref('users/' + uid + '/folders/' + selectedFolder + '/' + l._id);
        console.log(databaseref.toString());
        databaseref.remove().then(function() {
            console.log("listing removed from folder");
        }).catch(function(error) {
            console.log("eat my fucking ass cuz this listing aint getting deleted");
        });
    }

};

export default func;