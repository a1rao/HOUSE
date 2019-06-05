import React, {Component} from 'react';
import app from "../../../base";
import ListThumbnail from '../../Listings/ListThumbnail/ListThumbnail.js'
import '../../Listings/ListThumbnail/ListThumbnail.css';
import fetchData from "../../Backend/Database/GetFromDb";
import saveData from "../../Backend/Database/SaveToDb"
import NavigationBar from "../../NavigationBar/NavigationBar";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

// Display all listing thumbnails from folder that is currently listing1
// For testing purposes, this folder is:  TEST

var folderName = '';
var allFolders = '';
class DisplayFolderContent extends Component{


    constructor(props) {
        super(props);
        // Store user information
        this.state = {
            showLoading: true,
            showListing: false,
            showFolders: false,
            showColumn: false,
            showConfirm: false,
            allIDs: null,
            folders: [],
            eachListing: null,
            l: '',
            done: 0,
            column:'',
        };

        // Get listing id'showScraping
        // folderName = new NavigationBar(props);
        // folderName = folderName.returnName();

        folderName = localStorage.getItem("viewFolderName");
        // Get listing id's
        let first = fetchData.getIDs.bind(this);
        // Get each listing info
        let second = fetchData.getAllListings.bind(this);
        this.handleCloseLoading = this.handleCloseLoading.bind(this);
        this.printListing = this.printListing.bind(this);
        this.handleCloseListing = this.handleCloseListing.bind(this);
        this.handleCloseColumn = this.handleCloseColumn.bind(this);
        this.handleShowColumn = this.handleShowColumn.bind(this);
        this.handleShowFolders = this.handleShowFolders.bind(this);
        this.handleCloseFolders = this.handleCloseFolders.bind(this);
        this.handleCloseConfirm = this.handleCloseConfirm.bind(this);
        this.setColumn1 = this.setColumn1.bind(this);
        this.setColumn2 = this.setColumn2.bind(this);
        this.setColumn3 = this.setColumn3.bind(this);
        this.setColumn4 = this.setColumn4.bind(this);
        //this.formatListing = this.formatListing.bind(this);
        // Make second function call after the first one is done
        first(second,folderName);
        console.log("IN DISPLAyFOlder " + folderName)
        let getFolders = fetchData.getFolderNames.bind(this);
        getFolders();

    }

    handleCloseLoading() {
        this.setState({ showLoading: false })
    }
    handleCloseListing() {
        this.setState( {showListing: false })
    }
    handleCloseFolders() {
        this.setState({showFolders: false})
    }
    handleCloseColumn() {
        this.setState( {showColumn: false})
    }

    handleCloseConfirm() {
        this.setState({showConfirm:false});
    }
    printListing(listing){
        this.setState({showListing: true})
       // console.log("DS JVSONVISNDOViNSOIDNVIOSNVD: "+ event)
        this.setState({l : listing})
    }
    handleShowColumn() {
        this.setState({showColumn: true})
        this.handleCloseListing();
    }
    handleShowFolders() {
        const all = this.state.folders.map((eachFolder) =>
            <Button variant="outline-success" onClick={() => this.handlePush(eachFolder)}>{eachFolder}</Button>
        );
        allFolders = all;
        this.setState({showFolders: true});
        this.handleCloseListing();
    }

    handlePush = async (folder) =>  {

        saveData.removeListing(folderName, this.state.l);
        saveData.saveListing(folder, this.state.l, this.state.l);
        this.handleCloseFolders();
        this.setState({showConfirm:true})
    }
    setColumn1() {
        this.setState({column: 1})
        this.handleCloseColumn();
    }
    setColumn2() {
        this.setState({column: 2})
        this.handleCloseColumn();
    }
    setColumn3() {
        this.setState({column: 3})
        this.handleCloseColumn();
    }
    setColumn4() {
        this.setState({column: 4})
        this.handleCloseColumn();
    }


    deleteListing = event => {
        saveData.removeListing(folderName, this.state.l);
        this.handleCloseListing();
    };

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
                        <Button variant = "primary" onClick ={this.handleShowColumn}>
                            Add to Compare Table
                        </Button>
                        <Button variant="primary" onClick ={this.deleteListing}>
                            Remove from Folder
                        </Button>
                        <Button variant="primary" onClick={this.handleShowFolders}>
                            Move to different Folder
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show ={this.state.showColumn} onHide={this.handleCloseColumn}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select a Column</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={this.setColumn1}> Column 1</Button>
                        <Button onClick={this.setColumn2}> Column 2</Button>
                        <Button onClick={this.setColumn3}> Column 3</Button>
                        <Button onClick={this.setColumn4}> Column 4</Button>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showFolders} onHide={this.handleCloseFolders}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select a Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {allFolders}
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showConfirm} onHide={this.handleCloseConfirm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Listing Moved</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Your Listing has been moved!!!!!!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleCloseConfirm}>
                            Close
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

