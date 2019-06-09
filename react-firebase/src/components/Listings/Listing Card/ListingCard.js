/* listingCard.js
 * Contains code to handel the display od listing card
 */

import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import FormControl from "react-bootstrap/FormControl";
import saveData from '../../Backend/Database/SaveToDb.js';
import fetchData from '../../Backend/Database/GetFromDb';
import './ListingCard.css';
import Form from 'react-bootstrap/Form';
import app from "../../../base";


const scrape = require('../../../Main_Scraper/scrape');

// Golbal variables
var l = '';
var allFolders = '';


class ListingCard extends Component {

    constructor(props, context) {
        super(props, context);

        // Handle to show the card
        this.handleShow = this.handleShow.bind(this);
        // Handle to close the card
        this.handleClose = this.handleClose.bind(this);

        // Listings information
        this.state = {
            showMain: false,
            showFolders: false,
            showConfirm: false,
            showScraping: false,
            folders: [],
            folder:'',
            url:'',
            image: '',
            title: '',
            address: '',
            price: '',
            bed: '',
            bath: '',
            area: '',
            type: '',
            distance_to_campus: '',
            contact_name: '',
            contact_number: '',
            deposit:'',
            lease_policy: '',
            parking: '',
            smoking: '',
            pet: '',
            description: '',
            stores: '',
            buses: ''
        };
        let getFolders = fetchData.getFolderNames.bind(this);
        getFolders();
    }

    // Scrape the url
    readURL = async event => {
        event.preventDefault();
        this.setState({url:event.target.value})
    };

    // Read from a folder
    readFolder = async event => {
        event.preventDefault();
        this.setState({folder: event.target.value})

        console.log("Folder name: " + this.state.folder)
    };

    // Close listing card
    handleClose() {
        this.setState({ showMain: false });
    }

    // Show listing card
    handleShow() {
        this.setState({ showMain: true });
        this.handleC();
    }

    // Save the listing to a folder
    handleSave = async event =>  {
        this.handleClose();
        this.setState({showFolders: true});
        const all = this.state.folders.map((eachFolder) =>
            <Button variant="outline-success" onClick={() => this.handlePush(eachFolder)}>{eachFolder}</Button>
        );
        allFolders = all;

    }

    // Close folders
    handleCloseFolders = async event => {

        this.setState({showFolders: false})

    }

    // Push the listing to database
    handlePush = async (folder) =>  {
        saveData.saveListing(folder, l.url, l);
        console.log("In push")
        console.log(folder);
        this.handleCloseFolders();
        this.handleShowConfirm();
    }

    // Handle the scrap state
    handleS = async event => {
        this.setState({showScraping: true})
    }

    // Handle to close the scraping window
    handleC = async event => {
        this.setState({showScraping: false})
    }

    // Close the window
    handleCloseConfirm = async event => {
        this.setState({showConfirm: false})
    }

    // Show the details in a window
    handleShowConfirm = async event => {
        this.setState({showConfirm: true })
    }


    // Handle to add new folders
    handleNewFolder = async event => {
        let uid = app.auth().currentUser.uid;
        app.database().ref('users/'+ uid + '/folders/'+ this.state.folder).set({
            "listing1" :  ""
        });
        saveData.saveListing(this.state.folder, l.url, l);
        this.handleCloseFolders();
        this.handleShowConfirm();

    }


    // Handle the scraping function
    handleScrape = async event => {
            var that = this;
            let url = this.state.url + "";

            that.handleS();
            if(url.length > 0) {
                console.log("scraping from " + this.state.url);
                await scrape(this.state.url, this.obtainListing.bind(this));
            }
    };

    // Set the state of all the listing details
    obtainListing(listingInfo) {
        this.setState({image: listingInfo.photo_ref});
        this.setState({title: listingInfo.title});
        this.setState({address: listingInfo.address});
        this.setState({price: listingInfo.price});
        this.setState({bed: listingInfo.bed});
        this.setState({bath: listingInfo.bath});
        this.setState({area: listingInfo.area});
        this.setState({type: listingInfo.type});
        this.setState({distance_to_campus: listingInfo.distance_to_campus});
        this.setState({contact_name: listingInfo.contact_name});
        this.setState({contact_number: listingInfo.contact_number});
        this.setState({lease_policy: listingInfo._lease_period});
        this.setState({deposit: listingInfo.deposit});
        this.setState({parking: listingInfo.parking});
        this.setState({smoking: listingInfo.smoking});
        this.setState({pet: listingInfo.pet});
        this.setState({description: listingInfo._description});
        this.setState({stores: listingInfo.grocery_stores});
        this.setState({buses: listingInfo.bus_stations});

        l = listingInfo;

        this.handleShow();
    }

    render(){

        return (
            <div>
                {/*Search bar*/}
                <FormControl type="text" name="url" placeholder="Enter Listing URL" onChange={this.readURL} className="mr-sm-2"/>

                {/*Search button pressed*/}
                <Button variant="outline-success" onClick={this.handleScrape}>
                    Scrape
                </Button>

                {/*Modal to handle scraping wait*/}
                <Modal className="addColor" show={this.state.showScraping} onHide = {this.handleC}>
                    <Modal.Header className="scraping">Scraping your url...</Modal.Header>
                    <Modal.Body className="tip"><b>TIP:</b> You can add listings to the comparison table while viewing the folders!</Modal.Body>
                </Modal>

                {/*Close the model*/}
                <Modal show={this.state.showMain} onHide={this.handleClose}>

                    <Modal.Header>
                        <Modal.Title>{this.state.title}<br/></Modal.Title>
                        <a href={this.state.url} target="_blank">Listing URL</a>
                    </Modal.Header>

                    <Modal.Body className="mBody">

                        {/*listing image*/}
                        <div className = "mBodyElementImage">
                            <Image src={this.state.image} height={200} />
                        </div>

                        <br/>
                        <br/>

                        {/*listing title*/}
                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Title:
                            </div>

                            <div className="mBodyElementContent">
                                {this.state.title}
                            </div>
                        </div>

                        <br/>
                        <br/>

                        {/*Listing address*/}
                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Address:
                            </div>

                            <div className="mBodyElementContent">
                                {this.state.address}
                            </div>
                        </div>

                        <br/>
                        <br/>

                        {/*Listing price*/}
                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Price:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.price}
                            </div>
                        </div>

                        <br/>
                        <br/>


                        {/*Listing bedroom details*/}
                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Beds:
                            </div>

                            <div className="mBodyElementContent">
                                {this.state.bed}
                            </div>
                        </div>

                        <br/>
                        <br/>

                        {/*Listing bath details*/}
                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Bath:
                            </div>

                            <div className="mBodyElementContent">
                                {this.state.bath}
                            </div>
                        </div>

                        <br/>
                        <br/>

                        {/*Listing square footage*/}
                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Area:
                            </div>

                            <div className="mBodyElementContent">
                                {this.state.area}
                            </div>
                        </div>

                        <br/>
                        <br/>

                        {/*Listing distance to campus*/}
                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Distance to Campus:
                            </div>

                            <div className="mBodyElementContent">
                                {this.state.distance_to_campus}
                            </div>
                        </div>

                        <br/>
                        <br/>

                        {/*listing type*/}
                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Type:
                            </div>

                            <div className="mBodyElementContent">
                                {this.state.type}
                            </div>
                        </div>

                        <br/>
                        <br/>

                        {/*nearby grocery*/}
                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Nearby Stores:
                            </div>

                            <div className="mBodyElementContent">
                                {this.state.stores}
                            </div>
                        </div>

                        <br/>
                        <br/>

                        {/*Nearby bus stops*/}
                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                NEARBY BUS STOPS:
                            </div>

                            <div className="mBodyElementContent">
                                {this.state.buses}
                            </div>
                        </div>

                    </Modal.Body>

                    {/*Handle close and save listing */}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick= {this.handleSave}>
                            Save Listing
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/*Show all the folders*/}
                <Modal show={this.state.showFolders} onHide={this.handleCloseFolders}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select a Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {allFolders}
                        <br/>
                        <div className="searchBarWrap">
                            <Form inline>
                                <FormControl  className = "newFolder" type="text" name="folder" placeholder="Create a new folder" onChange={this.readFolder}/>
                                <Button variant="outline-success" onClick={this.handleNewFolder}>
                                    Create
                                </Button>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>

                {/*Modal to interact with user*/}
                <Modal show ={this.state.showConfirm} onHide={this.handleCloseConfirm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Listing Saved</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Your listing has been saved!!!!!!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleCloseConfirm}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }


}
export default ListingCard;
