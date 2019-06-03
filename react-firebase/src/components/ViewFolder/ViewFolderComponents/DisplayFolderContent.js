import React, {Component} from 'react';
import app from "../../../base";
import ListThumbnail from '../../Listings/ListThumbnail/ListThumbnail.js'
import '../../Listings/ListThumbnail/ListThumbnail.css';
import fetchData from "../../Backend/Database/GetFromDb";
import NavigationBar from "../../NavigationBar/NavigationBar";

// Display all listing thumbnails from folder that is currently selected
// For testing purposes, this folder is:  TEST

class DisplayFolderContent extends Component{


    constructor(props) {
        super(props);
        // Store user information
        this.state = {
            allIDs: null,
            eachListing: null,
            done: 0,
        };

        // Get listing id'showScraping

        // Get listing id's
        let first = fetchData.getIDs.bind(this);
        // Get each listing info
        let second = fetchData.getAllListings.bind(this);
        // Make second function call after the first one is done
        first(second);

    }


    render(){

        // Make sure component one mounting
        if(this.state.done === 0){
            console.log("IS 0");
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }

        // display each listing in folder TODO
        // allListings is a list of saved listings in the user'showScraping folder
        // ERROR: only displays most recent listing with the className: "thumbnail"

        const thumbnails = this.state.eachListing.map((listing) =>
            <div>
                <p>url: {listing.url}</p>
                <p>price: {listing.price}</p>
                <p>address: {listing.address}</p>
            </div>
        );

        return (
            <div className="thumbnail">
                <p>{thumbnails}</p>
            </div>
        );
    }



}

export default DisplayFolderContent;
