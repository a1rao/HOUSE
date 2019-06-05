import React, {Component} from 'react';
import app from "../../../base";
//import ListThumbnail from '../../Listings/ListThumbnail/ListThumbnail.js'
//import '../../Listings/ListThumbnail/ListThumbnail.css';
import './DisplayFolderContent.css';
import fetchData from "../../Backend/Database/GetFromDb";
import saveData from "../../Backend/Database/SaveToDb"
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/ButtonGroup";

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
            folder:'',
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
        this.handleShowConfirm = this.handleShowConfirm.bind(this);
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

    readFolder = async event => {
        event.preventDefault();
        this.setState({folder: event.target.value})

        console.log("Folder name: " + this.state.folder)
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
    handleShowConfirm() {
        this.setState({showConfirm:true})
    }
    handleShowFolders() {
        const all = this.state.folders.map((eachFolder) =>
            <Button variant="outline-success" onClick={() => this.handlePush(eachFolder)}>{eachFolder}</Button>
        );
        allFolders = all;
        this.setState({showFolders: true});
        this.handleCloseListing();
    }
    handleNewFolder = async event => {
        saveData.removeListing(folderName, this.state.l);
        saveData.saveListing(this.state.folder, this.state.l._url, this.state.l);
        console.log(this.state.folder);
        this.handleCloseFolders();
        this.handleShowConfirm();

    }

    handlePush = async (folder) =>  {

        saveData.removeListing(folderName, this.state.l);
        saveData.saveListing(folder, this.state.l._url, this.state.l);
        this.handleCloseFolders();
        this.handleShowConfirm();
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
            <div className = "allThumbnails">
                <Button className="listThumbnail" variant="dark" size="sm"  onClick = {() => this.printListing(listing)} >
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

                <Modal show={this.state.showListing} onHide={this.handleCloseListing}>
                    <div className="mHeader">
                        <Modal.Header>
                            <div className="mTitle">
                                <Modal.Title>{this.state.l._title} <br/> </Modal.Title>
                            </div>
                            <div className="listURL">
                                <a href={this.state.l._url}>Listing URL</a>
                            </div>
                        </Modal.Header>
                    </div>

                    <Modal.Body className="mBody">

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                PHOTO:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._photo_name}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                ADDRESS:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._address}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                PRICE:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._price}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                BEDS:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._bed}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                BATH:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._bath}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                AREA:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._area}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                DISTANCE TO CAMPUS:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._distance_to_campus}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                TYPE:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._type}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Deposit:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._deposit}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Lease Period:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._lease_period}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Parking:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._parking}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Smoking:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._smoking}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Pets:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._pets}
                            </div>
                        </div>
                        <br/>
                        <br/>

                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Contact Name:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._contact_name}
                            </div>
                        </div>
                        <br/>
                        <br/>


                        <div className="mBodyElement">
                            <div className="mBodyElementTitle">
                                Contact Email:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._contact_email}
                            </div>
                        </div>
                        <br/>
                        <br/>


                        <div className="mBodyElementDescription">
                            <div className="mBodyElementTitle">
                                Description:
                            </div>
                            <div className="mBodyElementContent">
                                {this.state.l._description}
                            </div>
                        </div>
                        <br/>
                        <br/>
                    </Modal.Body>

                    <Modal.Footer className="mFoot">
                        <Button variant = "success" onClick ={this.handleShowColumn} size="sm">
                            Add to Compare Table
                        </Button>
                        <Button variant="info" onClick={this.handleShowFolders} size="sm">
                            Move to different Folder
                        </Button>
                        <Button variant="danger" onClick ={this.deleteListing} size="sm">
                            Remove from Folder
                        </Button>
                        <Button variant="dark" onClick={this.handleCloseListing}size="sm">
                            Close Window
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
            <div className="grid">
                <h1 className="title">{folderName}</h1>
                <DropdownButton className="sortBar" title="Sort By" id="bg-nested-dropdown" variant="outline-info">
                    <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                </DropdownButton>
                <p>{thumbnails}</p>
            </div>
        );
    }
}

export default DisplayFolderContent;

