import React, {Component} from 'react';
import app from "../../../base";

/*
 * Functions that add information to the database
 * Tables: users, listings
 */

const func = {

    // Save scraped data from listing to database
    // Pushes a unique id into user's folder and to listings folder to identify this listing
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
    },

    // Save selected listing to a column in the compare table
    // Can be saved as one of four columns
    saveToCompare: function(column, l, url) {
        var uid = app.auth().currentUser.uid;
        var databaseref = app.database().ref('users/' + uid + '/comparisonTable/' + column);
        databaseref.remove().then(function() {
        }).catch(function(error) {
        });
        var listingKey = l._id;
        databaseref.child(listingKey).set({'url':url});

    },

    // Remove specified listing from database
    // Delete listing id from user's folder and from listing table
    removeListing: function(selectedFolder, l) {
        let uid = app.auth().currentUser.uid;
        let databaseref = app.database().ref('users/' + uid + '/folders/' + selectedFolder + '/' + l._id);
        databaseref.remove().then(function() {
        }).catch(function(error) {
        })
        databaseref = app.database().ref('listings/' + l._id);
        databaseref.remove().then(function() {
        }).catch(function(error) {
        })
    },

    // Move specified listing from source folder to target folder
    removeAdd: function(source, target,l) {
        let uid = app.auth().currentUser.uid;
        let databaseref = app.database().ref('users/' + uid + '/folders/' + source + '/' + l._id);
        databaseref.remove().then(function() {
        }).catch(function(error) {
        })
        databaseref = app.database().ref('users/' + uid + '/folders/' + target);
        var listingKey = l._id;
        databaseref.child(listingKey).set({'url':l._url});
    },

    // Empty all listings from comparison table
    removeCompare: function () {
        let uid = app.auth().currentUser.uid;
        let databaseref = app.database().ref('users/' + uid + '/comparisonTable/');
        databaseref.remove().then(function() {
        }).catch(function(error) {
        });
    }
};

export default func;