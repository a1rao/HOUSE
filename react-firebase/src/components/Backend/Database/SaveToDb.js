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
    saveToCompare: function(column, l, url) {

        var uid = app.auth().currentUser.uid;
        var databaseref = app.database().ref('users/' + uid + '/comparisonTable/' + column);
        console.log(databaseref.toString());
        databaseref.remove().then(function() {
            console.log("listing removed from folder");
        }).catch(function(error) {
            console.log("eat my fucking ass cuz this listing aint getting deleted");
        });
        var listingKey = l._id;
        databaseref.child(listingKey).set({'url':url});

    },

    removeListing: function(selectedFolder, l) {
        let uid = app.auth().currentUser.uid;
        let databaseref = app.database().ref('users/' + uid + '/folders/' + selectedFolder + '/' + l._id);
        console.log(databaseref.toString());
        databaseref.remove().then(function() {
            console.log("listing removed from folder");
        }).catch(function(error) {
            console.log("eat my fucking ass cuz this listing aint getting deleted");
        })
    //     databaseref = app.database().ref('listings/' + l._id);
    //     databaseref.remove().then(function() {
    //         console.log("listing removed from folder");
    //     }).catch(function(error) {
    //         console.log("eat my fucking ass cuz this listing aint getting deleted");
    //     });
    },
    removeAdd: function(source, target,l) {
        let uid = app.auth().currentUser.uid;
        let databaseref = app.database().ref('users/' + uid + '/folders/' + source + '/' + l._id);
        console.log(databaseref.toString());
        databaseref.remove().then(function() {
            console.log("listing removed from folder");
        }).catch(function(error) {
            console.log("eat my fucking ass cuz this listing aint getting deleted");
        })
        databaseref = app.database().ref('users/' + uid + '/folders/' + target);
        var listingKey = l._id;
        databaseref.child(listingKey).set({'url':l._url});
    },
    removeCompare: function (column) {
        let uid = app.auth().currentUser.uid;
        let databaseref = app.database().ref('users/' + uid + '/comparisonTable/' + column);
        databaseref.remove().then(function() {
            console.log("listing removed from folder");
        }).catch(function(error) {
            console.log("eat my fucking ass cuz this listing aint getting deleted");
        })
    }

};

export default func;