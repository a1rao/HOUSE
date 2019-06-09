import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import NavigationBar from '../../NavigationBar/NavigationBar';
import FormControl from "react-bootstrap/FormControl";
import saveData from '../../Backend/Database/SaveToDb.js';
import fetchData from '../../Backend/Database/GetFromDb';
import NavDropdown from "react-bootstrap/NavDropdown";
import {forEach} from "react-bootstrap/es/utils/ElementChildren";
import './ListingCard.css';
import Form from 'react-bootstrap/Form';
import app from "../../../base";





const scrape = require('../../../Main_Scraper/scrape');

var l = '';
var allFolders = '';
class ListingCard extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

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

    readURL = async event => {
        event.preventDefault();
        this.setState({url:event.target.value})
    };

    readFolder = async event => {
        event.preventDefault();
        this.setState({folder: event.target.value})

        console.log("Folder name: " + this.state.folder)
    };

    handleClose() {
        this.setState({ showMain: false });
    }

    handleShow() {
        this.setState({ showMain: true });
        console.log("Closing The Scraping Window");
        this.handleC();
    }
    handleSave = async event =>  {
        this.handleClose();
        this.setState({showFolders: true});
        const all = this.state.folders.map((eachFolder) =>
            <Button variant="outline-success" onClick={() => this.handlePush(eachFolder)}>{eachFolder}</Button>
        );
        allFolders = all;

        // this.state.folders.forEach( function(element) {
        //     <Button>{element}</Button>
        // });
    }
    handleCloseFolders = async event => {

        this.setState({showFolders: false})

    }
    handlePush = async (folder) =>  {

        saveData.saveListing(folder, l.url, l);
        console.log("In push")
        console.log(folder);
        this.handleCloseFolders();
        this.handleShowConfirm();
    }
    handleS = async event => {
        this.setState({showScraping: true})

        // setTimeout(this.handleShow, 7000);                                 REMOVED HERE

    }
    handleC = async event => {
        console.log("Closing The Scraping Window");

        this.setState({showScraping: false})
    }

    handleCloseConfirm = async event => {
        this.setState({showConfirm: false})
        console.log("i shouldnt be here")
    }

    handleShowConfirm = async event => {

        this.setState({showConfirm: true })
        console.log("i am here")
    }



    // updateListingInfo(listInfo) {
    //
    //     this.setState({image: 'NA'});
    //     this.setState({title: listInfo.title});
    //     this.setState( {address: listInfo.address});
    //     this.setState({price: listInfo.price});
    //     this.setState({num_bedrooms: listInfo.bed});
    //     this.setState({num_bathrooms: listInfo.bath});
    //     this.setState({distance_to_campus: 'NA'});
    //     this.setState({lease_policy: listInfo.lease_period});
    //     this.setState({parking: listInfo.parking});
    //     this.setState({smoking: listInfo.smoking});
    //     this.setState({pet_policy: listInfo.pets});
    //     this.setState({description: listInfo.description});
    //
    // }
    handleNewFolder = async event => {
        let uid = app.auth().currentUser.uid;
        app.database().ref('users/'+ uid + '/folders/'+ this.state.folder).set({
            "listing1" :  ""
        });
        saveData.saveListing(this.state.folder, l.url, l);
        this.handleCloseFolders();
        this.handleShowConfirm();

    }

    handleScrape = async event => {
            var that = this;
            let url = this.state.url + "";

            if(url.length > 0) {
                console.log("scraping from " + this.state.url);
                await scrape(this.state.url, this.obtainListing.bind(this));
            }

           // setTimeout(that.handleShow, 5000);
            that.handleS();
    };

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

        console.log(l)
        console.log(listingInfo)

        this.handleShow();
    }

    render(){



        return (
            <div>
                <FormControl type="text" name="url" placeholder="Enter Listing URL" onChange={this.readURL} className="mr-sm-2"/>

                <Button variant="outline-success" onClick={this.handleScrape}>
                    Scrape
                </Button>
                <Modal className="addColor" show={this.state.showScraping} onHide = {this.handleC}>
                    <Modal.Header className="scraping">Scraping your url...</Modal.Header>
                    <Modal.Body className="tip"><b>TIP:</b> You can add listings to the comparison table while viewing the folders!</Modal.Body>
                </Modal>

                <Modal show={this.state.showMain} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>{this.state.title}<br/></Modal.Title>
                        <a href={this.state.url} target="_blank">Listing URL</a>
                    </Modal.Header>
                    <Modal.Body className="mBody">

                        <div className = "mBodyElementImage">
                            <Image src={this.state.image} height={200} />
                        </div>

                        <br/>
                        <br/>

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

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                NEARBY BUS STOPS:
                            </div>

                            <div className="mBodyElementContent">
                                {this.state.buses}
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick= {this.handleSave}>
                            Save Listing
                        </Button>
                    </Modal.Footer>
                </Modal>
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
