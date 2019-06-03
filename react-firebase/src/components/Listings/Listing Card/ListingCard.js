import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NavigationBar from '../../NavigationBar/NavigationBar';
import FormControl from "react-bootstrap/FormControl";
import saveData from '../../Backend/Database/SaveToDb.js';
import fetchData from '../../Backend/Database/GetFromDb';
import NavDropdown from "react-bootstrap/NavDropdown";
import {forEach} from "react-bootstrap/es/utils/ElementChildren";





const scrape = require('../../../Main_Scraper/scrape');

var l = '';
var allFolders = '';
class ListingCard extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            showFolders: false,
            c: false,
            s: false,
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
        };
        let getFolders = fetchData.getFolderNames.bind(this);
        getFolders();
    }

    readURL = async event => {
        event.preventDefault();
        this.setState({url:event.target.value})
    };

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
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
        this.handleShowConfirm();
        this.setState({showFolders: false})

    }
    handlePush = async (folder) =>  {

        saveData.saveListing(folder, l.url, l);
        console.log("In push")
        console.log(folder);
        this.handleCloseFolders();
    }
    handleS = async event => {
        this.setState({s: true})

        setTimeout(this.handleShow, 5000);

    }
    handleC = async event => {
        this.setState({s: false})
    }

    handleCloseConfirm = async event => {
        this.setState({c: false})
        console.log("i shouldnt be here")
    }

    handleShowConfirm = async event => {

        this.setState({c: true })
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

    handleScrape = async event => {
            var that = this;
            let url = this.state.url + "";

            if(url.length > 0) {
                console.log("scraping from " + this.state.url);
                var listingInfo;
                listingInfo = await scrape(this.state.url);
                setTimeout(function() {

                        that.setState({image: listingInfo.photo});
                        that.setState({title: listingInfo.title});
                        that.setState({address: listingInfo.address});
                        that.setState({price: listingInfo.price});
                        that.setState({bed: listingInfo.bed});
                        that.setState({bath: listingInfo.bath});
                        that.setState({area: listingInfo.area});
                        that.setState({type: listingInfo.type});
                        that.setState({distance_to_campus: listingInfo.distance_to_campus});
                        that.setState({contact_name: listingInfo.contact_name});
                        that.setState({contact_number: listingInfo.contact_number});
                        that.setState({lease_policy: listingInfo._lease_period});
                        that.setState({deposit: listingInfo.deposit});
                        that.setState({parking: listingInfo.parking});
                        that.setState({smoking: listingInfo.smoking});
                        that.setState({pet: listingInfo.pet});
                        that.setState({description: listingInfo._description});

                        l = listingInfo;

                        console.log(l)
                        console.log(listingInfo)

                    },4000);

            }

           // setTimeout(that.handleShow, 5000);
            that.handleS();
    };

    render(){



        return (
            <div>
                <FormControl type="text" name="url" placeholder="Enter Listing URL" onChange={this.readURL} className="mr-sm-2"/>

                <Button variant="outline-success" onClick={this.handleScrape}>
                    Search
                </Button>
                <Modal show={this.state.s} onHide = {this.handleC}>
                    <Modal.Header/>
                    <Modal.Title>Scraping...</Modal.Title>
                    <Modal.Body></Modal.Body>
                </Modal>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        URL : {this.state.url}
                        <br/>
                        PHOTO: {this.state.image}
                        <br/>
                        TITLE: {this.state.title}
                        <br/>
                        ADDRESS: {this.state.address}
                        <br/>
                        PRICE: {this.state.price}
                        <br/>
                        BEDS: {this.state.bed}
                        <br/>
                        BATH: {this.state.bath}
                        <br/>
                        AREA: {this.state.area}
                        <br/>
                        DISTANCE TO CAMPUS: {this.state.distance_to_campus}
                        <br/>
                        TYPE: {this.state.type}
                        <br/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick= {this.handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showFolders} onHide={this.handleCloseFolders}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select a Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {allFolders}
                    </Modal.Body>
                </Modal>
                <Modal show ={this.state.c} onHide={this.handleCloseConfirm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Listing Saved</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Your Listing has been saved!!!!!!
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