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
    getIDs: function(cb, folderName)
    {
        let uid = app.auth().currentUser.uid;
        let databaseref = app.database().ref('users/' + uid + '/folders/' + folderName)
        databaseref.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.key;
                items.push(item);
            });
            this.setState({'allIDs': items});
            // Callback function
            cb();

        });
    },

    // Get each listing info
    getAllListings: function(cb)
    {
        let items = [];
        //console.log("allIDs:", this.state.allIDs);
        this.state.allIDs.forEach(id => {
              app.database().ref('listings/' + id).on('value', dataSnapshot => {
                  let listing = dataSnapshot.val();
                  items.push(listing);
                  console.log('push:', listing);
              });
        });
        setTimeout(function() {
            console.log("eachlisting in db:", items);
            this.setState({eachListing: items});
            this.setState({done : true});
        }.bind(this), 50*this.state.allIDs.length)

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
            dataSnapshot.forEach(childSnapshot => {
                items.push(childSnapshot.key);
            });
            this.setState({folders: items})
        });
    },



};

export default func;
