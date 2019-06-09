/* GetFromDb.js
 * Contains functions that will perform queries to get information from the database
 */
import React, {Component} from 'react';
import app from "../../../base";

const func = {
    /**
     * Get IDs of saved listings in database
     * @param cb: callback function to call after getting IDs
     * @param folderName: name of the folder where listings need to be  retrieved
     */
    getIDs: function(cb, folderName)
    {
        // User's ID
        let uid = app.auth().currentUser.uid;

        // Get a reference from database and push the listings ID form database into an array
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


    /**
     * Get each listing's name using listing's ID
     * @param cb: callback function
     */
    getAllListings: function(cb)
    {
        // Store listings name
        let items = [];
        this.state.allIDs.forEach(id => {
              app.database().ref('listings/' + id).on('value', dataSnapshot => {
                  let listing = dataSnapshot.val();
                  if (listing != null) { // Ignore null listings aka 'listing1'
                      items.push(listing);
                      // console.log('push:', listing);
                  }
              });
        });

        // Make sure all listings are pushed into item
        setTimeout(function() {
            console.log("eachlisting in db:", items);
            this.setState({eachListing: items});
            this.setState({done : true});
        }.bind(this), 100*this.state.allIDs.length)

    },


    /**
     * Get user first and last name
     */
    getName: function() {
        // User ID
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


    /**
     * Get folder's name
     */
    getFolderNames: function(){
        // User's ID
        let uid = app.auth().currentUser.uid;
        // Push folder's name into an array
        this.firebase = app.database().ref('users/' + uid + '/folders/')
        this.firebase.on('value', dataSnapshot => {
            let items =[];
            dataSnapshot.forEach(childSnapshot => {
                items.push(childSnapshot.key);
            });
            this.setState({folders: items})
        });
    },


    /**
     * Get listing's ID to be populated in the comparison table
     * @param cb: Callback function to call after retrieving listing's IDs
     */
    getComparisonID: function(cb) {
        let items = [];
        let uid = app.auth().currentUser.uid;       // User ID

        // Push listing ID to be compared from database into item
        let databaseref = app.database().ref('users/' + uid + '/comparisonTable/' + 1);
        databaseref.on('value', dataSnapshot => {
            let item ='';
            dataSnapshot.forEach(childSnapshot => {
                item = childSnapshot.key;
                items.push(item)
            });
            if(items.length == 0)
                items.push(null);

            // Update state
            this.setState({compareIDs: items});

        });


        databaseref = app.database().ref('users/' + uid + '/comparisonTable/' + 2);
        databaseref.on('value', dataSnapshot => {
            let item ='';
            dataSnapshot.forEach(childSnapshot => {
                item = childSnapshot.key;
                items.push(item)
            });
            if(items.length == 1)
                items.push(null);

            this.setState({compareIDs: items});
        });

        databaseref = app.database().ref('users/' + uid + '/comparisonTable/' + 3);
        databaseref.on('value', dataSnapshot => {
            let item ='';
            dataSnapshot.forEach(childSnapshot => {
                item = childSnapshot.key;
                items.push(item)
            });

            if(items.length === 2)
                items.push(null);

            this.setState({compareIDs: items});

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

            this.setState({compareIDs: items});
        });

        // Callback function
        setTimeout(() => {cb();}, 1000);
    },


    // Get user's listings from the database
    getListing: function()
    {
        let items = [];
        if(this.state.compareIDs === null) {
            return;
        }

        this.state.compareIDs.forEach(id => {
            app.database().ref('listings/' + id).on('value', dataSnapshot => {
                let listing = dataSnapshot.val();
                if (listing != null) { // Ignore null listings aka 'listing1' ;)
                    items.push(listing);
                } else {
                    items.push(null);
                }
            });

        });

        // Make sure all information has been retrieved
        setTimeout(function() {
            console.log("eachlisting in getListign:", items);
            this.setState({eachListing2: items});
            if(this.state.eachListing2[0] != null) {
                this.setState({listing1:this.state.eachListing2[0]})
            }
            if(this.state.eachListing2[1] != null) {
                this.setState({listing2:this.state.eachListing2[1]})
            }
            if(this.state.eachListing2[2] != null) {
                this.setState({listing3:this.state.eachListing2[2]})
            }
            if(this.state.eachListing2[3] != null) {
                this.setState({listing4:this.state.eachListing2[3]})
            }

            this.setState({showF: false});
        }.bind(this), 100*this.state.compareIDs.length)

    }
};

export default func;
