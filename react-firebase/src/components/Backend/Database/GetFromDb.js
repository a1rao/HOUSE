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
            setTimeout(() => {cb();}, 1000);

        });
    },

    // Get each listing info
    getAllListings: function(cb)
    {
        let items = [];
        console.log("allIDs:", this.state.allIDs);
        this.state.allIDs.forEach(id => {
              app.database().ref('listings/' + id).on('value', dataSnapshot => {
                  let listing = dataSnapshot.val();
                  if (listing != null) { // Ignore null listings aka 'listing1' ;)
                      items.push(listing);
                      console.log('push:', listing);
                  }
              });
        });
        setTimeout(function() {
            console.log("eachlisting in db:", items);
            this.setState({eachListing: items});
            this.setState({done : true});
        }.bind(this), 100*this.state.allIDs.length)

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

    getComparisonID: function(cb) {
        let items = [];
        let uid = app.auth().currentUser.uid;
        let databaseref = app.database().ref('users/' + uid + '/comparisonTable/' + 1);
        databaseref.on('value', dataSnapshot => {
            let item ='';
            dataSnapshot.forEach(childSnapshot => {
                item = childSnapshot.key;
                items.push(item)
                console.log("key when in getID: " + item);
            });
            if(items.length == 0)
                items.push(null);

            this.setState({allIDs: items});

        });
        databaseref = app.database().ref('users/' + uid + '/comparisonTable/' + 2);
        databaseref.on('value', dataSnapshot => {
            let item ='';
            dataSnapshot.forEach(childSnapshot => {
                item = childSnapshot.key;
                items.push(item)
                console.log("key when in getID: " + item);
            });
            if(items.length == 1)
                items.push(null);

            this.setState({allIDs: items});
        });
        databaseref = app.database().ref('users/' + uid + '/comparisonTable/' + 3);
        databaseref.on('value', dataSnapshot => {
            let item ='';
            dataSnapshot.forEach(childSnapshot => {
                item = childSnapshot.key;
                items.push(item)
                console.log("key when in getID: " + item);
            });

            if(items.length === 2)
                items.push(null);

            this.setState({allIDs: items});

        });
        databaseref = app.database().ref('users/' + uid + '/comparisonTable/' + 4);
        databaseref.on('value', dataSnapshot => {
            let item ='';
            dataSnapshot.forEach(childSnapshot => {
                item = childSnapshot.key;
                items.push(item)
                console.log("key when in getID: " + item);
            });
            if(items.length === 3)
                items.push(null);

            this.setState({allIDs: items});
        });

        console.log("allIds in getId: " + this.state.allIDs)
        console.log("length------------------------------`-" + items)
        // Callback function
        setTimeout(() => {cb();}, 1000);
    },
    getListing: function()
    {
        let items = [];
        //console.log("allIDs:", this.state.allIDs);
        if(this.state.allIDs === null) {
            return;
        }
        console.log("all ids in get listing" + this.state.allIDs);
        this.state.allIDs.forEach(id => {
            console.log("ids-----------: " + id);

            app.database().ref('listings/' + id).on('value', dataSnapshot => {
                let listing = dataSnapshot.val();
                if (listing != null) { // Ignore null listings aka 'listing1' ;)
                    items.push(listing);
                    console.log('push:', listing);
                } else {
                    items.push(null);
                }
            });

        });
        setTimeout(function() {
            console.log("eachlisting in getListign:", items);
            this.setState({eachListing: items});
            //this.setState({done : true});
            console.log("please work: " + this.state.eachListing);
            if(this.state.eachListing[0] != null) {
                this.setState({listing1:this.state.eachListing[0]})
            }
            if(this.state.eachListing[1] != null) {
                this.setState({listing2:this.state.eachListing[1]})
            }
            if(this.state.eachListing[2] != null) {
                this.setState({listing3:this.state.eachListing[2]})
            }
            if(this.state.eachListing[3] != null) {
                this.setState({listing4:this.state.eachListing[3]})
            }

        }.bind(this), 100*this.state.allIDs.length)

    }
};

export default func;
