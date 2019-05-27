import React, {Component} from 'react';
import app from "../../../base";

/*
 * Functions that will perform queries to get information from the database
 */

/* To import functions, add this to your file header:
 * import fetchData from '../../Backend/Database/GetFromDb.js';
 */

const func = {
    // Get IDs of saved listings in
    getIDs: function(cb)
    {
    let uid = app.auth().currentUser.uid;
    let databaseref = app.database().ref('users/' + uid + '/folders/' + 'TEST')
    databaseref.on('value', dataSnapshot => {
        let items = [];
        dataSnapshot.forEach(childSnapshot => {
            let item = childSnapshot.key;
            console.log("id", item);
            items.push(item);
        });
        this.setState({'allIDs': items});
        // Callback function
        cb();

    });
    },

    // Get each listing info
    getAllListings: function()
    {
    let items = [];
    console.log("allIDs:", this.state.allIDs);
    this.state.allIDs.forEach(id => {
        app.database().ref('listings/' + id).on('value', dataSnapshot => {
            let listing = dataSnapshot.val();
            items.push(listing);
            console.log("info:", listing);
        });
    });
    this.setState({'eachListing': items});
    },

    // Get user first and last name
    getName: function() {
        let uid = app.auth().currentUser.uid;
        this.firebase = app.database().ref('users/' + uid);
        this.firebase.on('value', dataSnapshot => {
            const userObject = dataSnapshot.val();
            this.setState({
                firstName: userObject.first,
                lastName: userObject.last
            });
        });
    },

    // Get folders
    getFolderNames: function(){
        let uid = app.auth().currentUser.uid;
        this.firebase = app.database().ref('users/' + uid + '/folders/')
        this.firebase.on('value', dataSnapshot => {
            let items =[];
            console.log(dataSnapshot);
            dataSnapshot.forEach(childSnapshot => {
                items.push(childSnapshot.key);
                console.log(childSnapshot.key);
            });
            this.setState({folders: items})
        });
    }
};

export default func;






