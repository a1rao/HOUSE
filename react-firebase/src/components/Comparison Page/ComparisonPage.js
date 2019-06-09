/* ComparisonPage.js
 * The code to handle the comparison table
 */
import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import NavigationBar from '../NavigationBar/NavigationBar';
import './ComparisonPage.css';
import Button from "react-bootstrap/Button";
import fetchData from "../Backend/Database/GetFromDb";
import Modal from "react-bootstrap/Modal";
import saveData from "../Backend/Database/SaveToDb";
import Image from 'react-bootstrap/Image';

// Global variable
var allFolders = '';    // Store all folders
var allListings = '';   // Store all listing in the folders


class ComparisonPage extends Component {

    constructor(props) {
        super(props);

        // listing information
        this.state = {
            allIDs: [],
            showF: true,
            compareIDS: [],
            folders: [],
            eachListing2: [],
            eachListing: [],
            listing1: '',
            listing2: '',
            listing3: '',
            listing4: '',
            showFolders: false,
            showListings: false,
            deleted: false,
        };

        // Get all folders of users form db
        let getFolders = fetchData.getFolderNames.bind(this);
        getFolders();

        // Get folder ID
        this._getIDs = fetchData.getIDs.bind(this);
        // Get listings from folders
        this._getListings = fetchData.getAllListings.bind(this);

        // Get ID of listings to be compared
        let first = fetchData.getComparisonID.bind(this);
        // Get listing fo the ID retrieved
        let second = fetchData.getListing.bind(this);
        this.handleClear = this.handleClear.bind(this);

        // Call second after first
        first(second);
    }

    handleRemoveListing = async number => {
        saveData.removeCompare(number);
    };

    // State to show folders
    handleShowFolders = async number =>{
        this.setState({showFolders: true});
        const all = this.state.folders.map((eachFolder) =>
            <Button variant="outline-success" onClick={() => this.handleCloseFolders(number, eachFolder)}>{eachFolder}</Button>
        );
        allFolders = all;
        this.setState({ showMain: true });
    }

    // Close the folder selection page
    handleCloseFolders = async (number, folder) =>{
        this.setState({showFolders: false});
        this.handleShowListings(number, folder);
    }

    // Close the fetch window
    handleCloseFetching = async event => {
        this.setState({showF:false})
    }

    // Handle folder confirmation
    handleCFolders = async event => {
        this.setState({showFolders: false});
    }

    // Show the listings to users
    handleShowListings = async (number, folder) => {
        await this._getIDs(this._getListings, folder);

        // Make sure alllistings are retrieved
        setTimeout(() => {

            const all = this.state.eachListing.map((listing) =>
                <Button variant="outline-success" onClick={() => this.handleAddToTable(number, listing)}>{listing._title}</Button>
            );
            // Store all listings
            allListings = all;
            this.setState({showListings: true});
        }, 1000 + 100*this.state.allIDs.length);

    }

    // Close the listing window
    handleCloseListings = async event => {
        this.setState({showListings: false});
    }

    // Clear the comparison pages
    handleClear = async  event => {
        await saveData.removeCompare();
        this.setState({listing1:''})
        this.setState({listing2:''})
        this.setState({listing3:''})
        this.setState({listing4:''})
    }

    // Add to column in the table
    handleAddToTable = async (number, listing) => {
        // Column 1
        if(number === 1){
            this.setState({listing1: listing});
            saveData.saveToCompare('1',listing,listing._url);
        }

        // Column 2
        else if(number === 2) {
            this.setState({listing2: listing});
            saveData.saveToCompare('2',listing,listing._url);
        }

        // Column 3
        else if(number === 3) {
            this.setState({listing3: listing});
            saveData.saveToCompare('3',listing,listing._url);
        }

        // Column 4
        else{
            this.setState({listing4: listing});
            saveData.saveToCompare('4',listing,listing._url);
        }

        this.handleCloseListings();
        this.setState({deleted: false})
    }


    render() {

        return (

            <div>
                {/*Loading modal*/}
                <Modal show={this.state.showF} onHide={this.handleCloseFetching}>
                    <Modal.Header>
                        <Modal.Title>Fetching your Listing</Modal.Title>
                    </Modal.Header>
                </Modal>

                {/*Close button for folder selection modal*/}
                <Modal show={this.state.showFolders} onHide={this.handleCFolders}>

                    <Modal.Header closeButton>
                        <Modal.Title>Select a Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {allFolders}
                    </Modal.Body>
                </Modal>

                {/*Modal to select listing */}
                <Modal show={this.state.showListings} onHide={this.handleCloseListings}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select a Listing</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {allListings}
                    </Modal.Body>
                </Modal>

                <NavigationBar/>

                {/*Comparison table*/}
                <Table striped bordered hover size="lg">
                    <thead>
                        <tr>
                            <th>
                                {/*Clear table*/}
                                <div className="buttonParent">
                                    <Button variant={"secondary"} onClick={this.handleClear}
                                            className="buttonz"> Clear Table </Button>
                                    </div>
                            </th>

                            {/*CHange listing of column 1*/}
                            <th>
                                <div className="buttonParent">
                                    <Button variant="primary" onClick={() => this.handleShowFolders(1)}
                                            className="buttonz"> Change Listing </Button>
                                </div>
                            </th>

                            {/*Change listing of column 2*/}
                            <th>
                                <div className="buttonParent">
                                    <Button variant="primary" onClick={() => this.handleShowFolders(2)}
                                            className="buttonz"> Change Listing </Button>
                                </div>
                            </th>

                            {/*Change listing of column 3*/}
                            <th>
                                <div className="buttonParent">
                                    <Button variant="primary" onClick={() => this.handleShowFolders(3)}
                                            className="buttonz"> Change Listing </Button>
                                </div>
                            </th>

                            {/*Change listing of column 4*/}
                            <th>
                                <div className="buttonParent">
                                    <Button variant="primary" onClick={() => this.handleShowFolders(4)}
                                            className="buttonz"> Change Listing </Button>
                                </div>
                            </th>

                    </tr>

                    </thead>

                    {/*Populate table*/}
                    <tbody>

                    {/*Image for each column*/}
                    <tr>
                        <td className="tableHead">Image</td>
                        <td><div className = "mBodyElementImage">
                            <Image src={this.state.listing1._photo_ref} height={200} width={200}/>
                        </div>
                        </td>
                        <td>
                            <div className = "mBodyElementImage">
                                <Image src={this.state.listing2._photo_ref} height={200} width={200}/>
                            </div>
                        </td>
                        <td>
                            <div className = "mBodyElementImage">
                                <Image src={this.state.listing3._photo_ref} height={200} width={200}/>
                            </div>
                        </td>
                        <td>
                            <div className = "mBodyElementImage">
                                <Image src={this.state.listing4._photo_ref} height={200} width={200} />
                            </div>
                        </td>
                    </tr>

                    {/*Listing title field for each column*/}
                    <tr>
                        <td className="tableHead">Name</td>
                        <td>{this.state.listing1._title}</td>
                        <td>{this.state.listing2._title}</td>
                        <td>{this.state.listing3._title}</td>
                        <td>{this.state.listing4._title}</td>
                    </tr>

                    {/*listing address for each column*/}
                    <tr>
                        <td className="tableHead">Address</td>
                        <td>{this.state.listing1._address}</td>
                        <td>{this.state.listing2._address}</td>
                        <td>{this.state.listing3._address}</td>
                        <td>{this.state.listing4._address}</td>
                    </tr>

                    {/*Listing price field for each column*/}
                    <tr>
                        <td className="tableHead">Price</td>
                        <td>{this.state.listing1._price}</td>
                        <td>{this.state.listing2._price}</td>
                        <td>{this.state.listing3._price}</td>
                        <td>{this.state.listing4._price}</td>
                    </tr>

                    {/*Listing's distance to campus for each column*/}
                    <tr>
                        <td className="tableHead">Distance to Campus</td>
                        <td>{this.state.listing1._distance_to_campus}</td>
                        <td>{this.state.listing2._distance_to_campus}</td>
                        <td>{this.state.listing3._distance_to_campus}</td>
                        <td>{this.state.listing4._distance_to_campus}</td>
                    </tr>

                    {/*listing's bedroom detail for each column*/}
                    <tr>
                        <td className="tableHead">Number of Bedrooms</td>
                        <td>{this.state.listing1._bed}</td>
                        <td>{this.state.listing2._bed}</td>
                        <td>{this.state.listing3._bed}</td>
                        <td>{this.state.listing4._bed}</td>
                    </tr>

                    {/*Listing's bath detail for each column*/}
                    <tr>
                        <td className="tableHead">Number of Bathrooms</td>
                        <td>{this.state.listing1._bath}</td>
                        <td>{this.state.listing2._bath}</td>
                        <td>{this.state.listing3._bath}</td>
                        <td>{this.state.listing4._bath}</td>
                    </tr>

                    {/*Listing's square footage field for each column*/}
                    <tr>
                        <td className="tableHead">Square Footage</td>
                        <td>{this.state.listing1._area}</td>
                        <td>{this.state.listing2._area}</td>
                        <td>{this.state.listing3._area}</td>
                        <td>{this.state.listing4._area}</td>
                    </tr>

                    {/*listing's type field for each column*/}
                    <tr>
                        <td className="tableHead">Type</td>
                        <td>{this.state.listing1._type}</td>
                        <td>{this.state.listing2._type}</td>
                        <td>{this.state.listing3._type}</td>
                        <td>{this.state.listing4._type}</td>
                    </tr>

                    {/*Listing's parking field for each column*/}
                    <tr>
                        <td className="tableHead">Parking Policy</td>
                        <td>{this.state.listing1._parking}</td>
                        <td>{this.state.listing2._parking}</td>
                        <td>{this.state.listing3._parking}</td>
                        <td>{this.state.listing4._parking}</td>
                    </tr>

                    {/*Listing's lease period for each column*/}
                    <tr>
                        <td className="tableHead">Lease Period</td>
                        <td>{this.state.listing1._lease_period}</td>
                        <td>{this.state.listing2._lease_period}</td>
                        <td>{this.state.listing3._lease_period}</td>
                        <td>{this.state.listing4._lease_period}</td>
                    </tr>

                    {/*listing's smoking policy for each column*/}
                    <tr>
                        <td className="tableHead">Smoking Policy</td>
                        <td>{this.state.listing1._smoking}</td>
                        <td>{this.state.listing2._smoking}</td>
                        <td>{this.state.listing3._smoking}</td>
                        <td>{this.state.listing4._smoking}</td>
                    </tr>

                    {/*Listing's pets policy for each column*/}
                    <tr>
                        <td className="tableHead">Pets Policy</td>
                        <td>{this.state.listing1._pets}</td>
                        <td>{this.state.listing2._pets}</td>
                        <td>{this.state.listing3._pets}</td>
                        <td>{this.state.listing4._pets}</td>
                    </tr>

                    {/*Listing's grocery store for each column*/}
                    <tr>
                        <td className="tableHead">Nearby Grocery Stores</td>
                        <td>{this.state.listing1._grocery_stores}</td>
                        <td>{this.state.listing2._grocery_stores}</td>
                        <td>{this.state.listing3._grocery_stores}</td>
                        <td>{this.state.listing4._grocery_stores}</td>
                    </tr>

                    {/*Listing's transit time to campus*/}
                    <tr>
                        <td className="tableHead">Transit Time to Campus</td>
                        <td>{this.state.listing1._travel_time}</td>
                        <td>{this.state.listing2._travel_time}</td>
                        <td>{this.state.listing3._travel_time}</td>
                        <td>{this.state.listing4._travel_time}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ComparisonPage;