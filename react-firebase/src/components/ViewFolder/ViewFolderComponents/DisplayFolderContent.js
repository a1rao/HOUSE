import React, {Component} from 'react';
import app from "../../../base";
import NavDropdown from "react-bootstrap/NavDropdown";


// Display each listing from folder that is currently selected
// For testing purposes, this folder is:  TEST

class DisplayFolderContent extends Component{

    constructor(props) {
        super(props);

        // Store user information
        this.state = {
            'allIDs': [],
            'eachListing' : []
        };

        // Get listing id's
        function getIDs(cb) {
            let uid = app.auth().currentUser.uid;
            let databaseref = app.database().ref('users/' + uid + '/folders/' + 'TEST')
            databaseref.on('value', dataSnapshot => {
                let items = [];
                dataSnapshot.forEach(childSnapshot => {
                    let item = childSnapshot.key;
                    console.log("id", item);
                    items.push(item);
                });
                this.setState({allIDs: items});

                // Callback function
                cb();

            });
        }
        let first = getIDs.bind(this);

        // Get each listing info
        function getInfo() {
            let items = [];
            this.state.allIDs.forEach(id => {
                app.database().ref('listings/' + id).once('value', dataSnapshot => {
                    let listing = dataSnapshot.val();
                    items.push(listing);
                    console.log("info:", listing);
                });
            });
            this.setState({eachListing: items});
        }
        let second = getInfo.bind(this);

        // Make second function call after the first one is done
        first(second);

    }

    componentWillUnmount() {
        app.database().off();
    }

    render(){
        // display each listing in folder TODO
        const allListings = this.state.eachListing.map((listing) =>
            <p>{listing.url}</p>
        );

        return(
            <div>
                <h1>{allListings}</h1>
            </div>
        );
    }



}

export default DisplayFolderContent;