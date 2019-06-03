import React, {Component} from 'react';
import app from "../../../base";
import ListThumbnail from '../../Listings/ListThumbnail/ListThumbnail.js'
import '../../Listings/ListThumbnail/ListThumbnail.css';
import fetchData from "../../Backend/Database/GetFromDb";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

// Display all listing thumbnails from folder that is currently selected
// For testing purposes, this folder is:  TEST

class DisplayFolderContent extends Component{


    constructor(props) {
        super(props);
        // Store user information
        this.state = {
            showLoading: true,
            allIDs: null,
            eachListing: null,
            done: 0,
        };

        // Get listing id'showScraping

        // Get listing id's
        let first = fetchData.getIDs.bind(this);
        // Get each listing info
        let second = fetchData.getAllListings.bind(this);
        this.handleCloseLoading = this.handleCloseLoading.bind(this);
        this.formatListing = this.formatListing.bind(this);
        // Make second function call after the first one is done
        first(second);

    }

    handleCloseLoading() {
        this.setState({ showLoading: false })
    }

    formatListing(listing) {

        let info = '';

        info += 'Title: ' + listing._title + '\n';
        info += 'Address: ' + listing._address + '\n';
        info += 'Price: ' + listing._price + '\n';
        info += 'Bed: ' + listing._bed + '\n';
        info += 'Bath: ' + listing._bath + '\n';
        info += 'Distance to Campus: ' + listing._distance_to_campus + '\n';

        console.log("hello" + info);
        return info;
    }


    render(){

        // Make sure component one mounting
        if(this.state.done === 0){
            console.log("IS 0");
            return (
                <div>
                    <Modal show ={this.state.showLoading} onHide={this.handleCloseLoading}>
                    <Modal.Header>
                        <Modal.Title>Fetching your Listings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Please wait for a moment.
                    </Modal.Body>
                </Modal>
                </div>
            );
        }

        // display each listing in folder TODO
        // allListings is a list of saved listings in the user'showScraping folder
        // ERROR: only displays most recent listing with the className: "thumbnail"

        const thumbnails = this.state.eachListing.map((listing) =>
            <div>
                <Button>
                    Title: {listing._title}
                    <br/>
                    Address: {listing._address}
                    <br/>
                    Price: {listing._price}
                    <br/>
                    Bed: {listing._bed}
                    <br/>
                    Bath: {listing._bath}
                    <br/>
                    Distance to Campus: {listing._distance_to_campus}
                </Button>

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
