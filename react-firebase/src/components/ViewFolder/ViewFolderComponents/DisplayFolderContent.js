import React, {Component} from 'react';
import app from "../../../base";
import NavDropdown from "react-bootstrap/NavDropdown";
import fetchData from '../../Backend/Database/GetFromDb.js';


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

        let first = fetchData.getIDs.bind(this);

        // Get each listing info

        let second = fetchData.getAllListings.bind(this);

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