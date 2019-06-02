import React, {Component} from 'react';
import app from "../../../base";
import ListThumbnail from '../../Listings/ListThumbnail/ListThumbnail.js'
import '../../Listings/ListThumbnail/ListThumbnail.css';
import fetchData from "../../Backend/Database/GetFromDb";
//import ListImage from './components/ListImage';


// Display all listing thumbnails from folder that is currently selected
// For testing purposes, this folder is:  TEST

class DisplayFolderContent extends Component{

    constructor(props) {
        super(props);

        // Store user information
        this.state = {
            'allIDs': null,
            'eachListing' : null,
            'done': 0
        };

        // Get listing id's

        let first = fetchData.getIDs.bind(this);

        // Get each listing info

        let second = fetchData.getAllListings.bind(this);

        // Make second function call after the first one is done
        first(second);

    }

    render(){

        if(this.state.done === 0){
            console.log("IS 0");
            return <div />
        }

        else {
            // display each listing in folder TODO
            // allListings is a list of saved listings in the user's folder
            // ERROR: only displays most recent listing with the className: "thumbnail"

            console.log("render all ids", this.state.allIDs);
            console.log("render each listing", this.state.eachListing);
            const allListings = this.state.eachListing.map((listing) =>
                <div className="thumbnail">
                    <p>url: {listing.url}</p>
                    <p>price: {listing.price}</p>
                    <p>address: {listing.address}</p>
                </div>
            );
        console.log("allList", allListings);

            return (
                <div >
                    <p>{this.state.eachListing.map}</p>
                </div>
            );
        }
    }





    /********



    componentWillUnmount() {
        app.database().off();
    }

    render(){
        console.log("in Display Folder Content");
        return(

            <ListThumbnail />
        );
        // display each listing in folder TODO

    } ****/



}

export default DisplayFolderContent;