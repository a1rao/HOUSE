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

var folderName = '';
class DisplayFolderContent extends Component{


    constructor(props) {
        super(props);
        // Store user information
        this.state = {
            showLoading: true,
            showListing: false,
            allIDs: null,
            eachListing: null,
            l: '',
            done: 0,
        };

        // Get listing id'showScraping
        folderName = new NavigationBar(props);
        folderName = folderName.returnName();
        // Get listing id's
        let first = fetchData.getIDs.bind(this);
        // Get each listing info
        let second = fetchData.getAllListings.bind(this);
        this.handleCloseLoading = this.handleCloseLoading.bind(this);
        this.printListing = this.printListing.bind(this);
        this.handleCloseListing = this.handleCloseListing.bind(this);
        //this.formatListing = this.formatListing.bind(this);
        // Make second function call after the first one is done
        first(second,"TEST");
        console.log("IN DISPLAyFOlder " + folderName)

    }

    handleCloseLoading() {
        this.setState({ showLoading: false })
    }
    handleCloseListing() {
        this.setState( {showListing: false })
    }

    printListing(listing){
        this.setState({showListing: true})
       // console.log("DS JVSONVISNDOViNSOIDNVIOSNVD: "+ event)
        this.setState({l : listing})
    }


    render(){

        // Make sure component one mounting
        if(this.state.done === 0){
            //console.log("IS 0");
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
                <Button onClick = {() => this.printListing(listing)}  >
                    {listing._title}
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

                <Modal show = {this.state.showListing} onHide={this.handleCloseListing}>
                    <Modal.Header>
                        <Modal.Title>{this.state.l._title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        PHOTO: {this.state.l._photo_name}
                        <br/>
                        ADDRESS: {this.state.l._address}
                        <br/>
                        PRICE: {this.state.l._price}
                        <br/>
                        BEDS: {this.state.l._bed}
                        <br/>
                        BATH: {this.state.l._bath}
                        <br/>
                        AREA: {this.state.l._area}
                        <br/>
                        DISTANCE TO CAMPUS: {this.state.l._distance_to_campus}
                        <br/>
                        TYPE: {this.state.l._type}
                        <br/>
                        Deposit: {this.state.l._deposit}
                        <br/>
                        Lease Period: {this.state.l._lease_period}
                        <br/>
                        Parking: {this.state.l._parking}
                        <br/>
                        Smoking: {this.state.l._smoking}
                        <br/>
                        Pets: {this.state.l._pets}
                        <br/>
                        Contact Name: {this.state.l._contact_name}
                        <br/>
                        Contact Number: {this.state.l._contact_number}
                        <br/>
                        Contact Email: {this.state.l._contact_email}
                        <br/>
                        URL : {this.state.l._url}
                        <br/>
                        Description: {this.state.l._description}
                        <br/>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseListing}>
                            Close
                        </Button>
                        <Button variant = "primary" onClick ={this.handleCloseListing}>
                            Add TO Compare Table
                        </Button>
                    </Modal.Footer>
                </Modal>

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

