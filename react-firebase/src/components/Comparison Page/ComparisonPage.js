import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import NavigationBar from '../NavigationBar/NavigationBar';
import './ComparisonPage.css';
import Button from "react-bootstrap/Button";
import fetchData from "../Backend/Database/GetFromDb";
import Modal from "react-bootstrap/Modal";
import saveData from "../Backend/Database/SaveToDb";
import Image from 'react-bootstrap/Image';

var allFolders = '';
var allListings = '';

class ComparisonPage extends Component {

    constructor(props) {
        super(props);

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

        let getFolders = fetchData.getFolderNames.bind(this);
        getFolders();

        this._getIDs = fetchData.getIDs.bind(this);
        this._getListings = fetchData.getAllListings.bind(this);

        let first = fetchData.getComparisonID.bind(this);
        let second = fetchData.getListing.bind(this);
        this.handleClear = this.handleClear.bind(this);
        //fetchData.getID(fetchData.getListing(),1);
        //this.setState({currentColumn:'1'});
        first(second);
        // this.setState({currentColumn:'2'});
        // first(second, 2);
        // this.setState({currentColumn:'3'});
        // first(second, 3);
        // this.setState({currentColumn:'4'});
        // first(second, 4);

    }

    handleRemoveListing = async number => {
        saveData.removeCompare(number);
    };


    handleShowFolders = async number =>{
        this.setState({showFolders: true});
        const all = this.state.folders.map((eachFolder) =>
            <Button variant="outline-success" onClick={() => this.handleCloseFolders(number, eachFolder)}>{eachFolder}</Button>
        );
        allFolders = all;

        this.setState({ showMain: true });
    }

    handleCloseFolders = async (number, folder) =>{
        this.setState({showFolders: false});
        this.handleShowListings(number, folder);
    }

    handleCloseFetching = async event => {
        this.setState({showF:false})
    }
    handleCFolders = async event => {
        this.setState({showFolders: false});
    }

    handleShowListings = async (number, folder) => {
        console.log(folder);
        await this._getIDs(this._getListings, folder);


        setTimeout(() => {

            console.log(this.state.allIDs);
            console.log(this.state.eachListing);
            const all = this.state.eachListing.map((listing) =>
                <Button variant="outline-success" onClick={() => this.handleAddToTable(number, listing)}>{listing._title}</Button>
            );
            allListings = all;
            this.setState({showListings: true});
        }, 1000 + 100*this.state.allIDs.length);

    }

    handleCloseListings = async event => {
        this.setState({showListings: false});
    }
    handleClear = async  event => {
        await saveData.removeCompare();
        this.setState({listing1:''})
        this.setState({listing2:''})
        this.setState({listing3:''})
        this.setState({listing4:''})
        console.log("listing1: "  + this.state.listing1);
        console.log("listing2: "  + this.state.listing2);



    }

    handleAddToTable = async (number, listing) => {
        if(number === 1){
            this.setState({listing1: listing});
            saveData.saveToCompare('1',listing,listing._url);

        }
        else if(number === 2) {
            this.setState({listing2: listing});
            saveData.saveToCompare('2',listing,listing._url);
        }
        else if(number === 3) {
            this.setState({listing3: listing});
            saveData.saveToCompare('3',listing,listing._url);
        }
        else{
            this.setState({listing4: listing});
            saveData.saveToCompare('4',listing,listing._url);
        }
        console.log("we are able to select a specific listing : " + listing._address);
        this.handleCloseListings();
        this.setState({deleted: false})
    }


    render() {

        return (

            <div>

                <Modal show={this.state.showF} onHide={this.handleCloseFetching}>
                    <Modal.Header>
                        <Modal.Title>Fetching your Listing</Modal.Title>
                    </Modal.Header>
                </Modal>
                <Modal show={this.state.showFolders} onHide={this.handleCFolders}>

                    <Modal.Header closeButton>
                        <Modal.Title>Select a Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {allFolders}
                    </Modal.Body>
                </Modal>


                <Modal show={this.state.showListings} onHide={this.handleCloseListings}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select a Listing</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {allListings}
                    </Modal.Body>
                </Modal>

                <NavigationBar/>

                {/*<Table striped bordered hover size="lg">*/}
                {/*    <thead>*/}
                {/*    <th>*/}
                {/*        <tr>Key</tr>*/}
                {/*        <tr>Name</tr>*/}
                {/*    </th>*/}

                {/*    <th>{this.state.t1}</th>*/}

                {/*    </thead>*/}
                {/*</Table>*/}

                <Table striped bordered hover size="lg">
                    <thead>
                    <tr>
                            <th>
                                <div className="buttonParent">
                                    <Button variant={"secondary"} onClick={this.handleClear}
                                            className="buttonz"> Clear Table </Button>
                                </div>
                            </th>

                            <th>
                                <div className="buttonParent">
                                    <Button variant="primary" onClick={() => this.handleShowFolders(1)}
                                            className="buttonz"> Change Listing </Button>
                                </div>
                            </th>
                            <th>
                                <div className="buttonParent">
                                    <Button variant="primary" onClick={() => this.handleShowFolders(2)}
                                            className="buttonz"> Change Listing </Button>
                                </div>
                            </th>

                            <th>
                                <div className="buttonParent">
                                    <Button variant="primary" onClick={() => this.handleShowFolders(3)}
                                            className="buttonz"> Change Listing </Button>
                                </div>
                            </th>
                            <th>
                                <div className="buttonParent">
                                    <Button variant="primary" onClick={() => this.handleShowFolders(4)}
                                            className="buttonz"> Change Listing </Button>
                                </div>
                            </th>





                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="tableHead">Image</td>
                        <td><div className = "mBodyElementImage">
                            <Image src={this.state.listing1._photo_ref} height={200} width={200}/>
                        </div>
                            {/*<Image src={this.state.listing1._photo_ref}/> */}
                        </td>
                        <td>
                            <div className = "mBodyElementImage">
                                <Image src={this.state.listing2._photo_ref} height={200} width={200}/>
                            </div>
                            {/*<Image src={this.state.listing2._photo_ref}/>*/}
                        </td>
                        <td>
                            <div className = "mBodyElementImage">
                                <Image src={this.state.listing3._photo_ref} height={200} width={200}/>
                            </div>
                            {/*<Image src={this.state.listing3._photo_ref}/>*/}
                        </td>
                        <td>
                            <div className = "mBodyElementImage">
                                <Image src={this.state.listing4._photo_ref} height={200} width={200} />
                            </div>
                            {/*<Image src={this.state.listing4._photo_ref}/>*/}
                        </td>
                    </tr>
                    <tr>
                        <td className="tableHead">Name</td>
                        <td>{this.state.listing1._title}</td>
                        <td>{this.state.listing2._title}</td>
                        <td>{this.state.listing3._title}</td>
                        <td>{this.state.listing4._title}</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Address</td>
                        <td>{this.state.listing1._address}</td>
                        <td>{this.state.listing2._address}</td>
                        <td>{this.state.listing3._address}</td>
                        <td>{this.state.listing4._address}</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Price</td>
                        <td>{this.state.listing1._price}</td>
                        <td>{this.state.listing2._price}</td>
                        <td>{this.state.listing3._price}</td>
                        <td>{this.state.listing4._price}</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Distance to Campus</td>
                        <td>{this.state.listing1._distance_to_campus}</td>
                        <td>{this.state.listing2._distance_to_campus}</td>
                        <td>{this.state.listing3._distance_to_campus}</td>
                        <td>{this.state.listing4._distance_to_campus}</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Number of Bedrooms</td>
                        <td>{this.state.listing1._bed}</td>
                        <td>{this.state.listing2._bed}</td>
                        <td>{this.state.listing3._bed}</td>
                        <td>{this.state.listing4._bed}</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Number of Bathrooms</td>
                        <td>{this.state.listing1._bath}</td>
                        <td>{this.state.listing2._bath}</td>
                        <td>{this.state.listing3._bath}</td>
                        <td>{this.state.listing4._bath}</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Square Footage</td>
                        <td>{this.state.listing1._area}</td>
                        <td>{this.state.listing2._area}</td>
                        <td>{this.state.listing3._area}</td>
                        <td>{this.state.listing4._area}</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Type</td>
                        <td>{this.state.listing1._type}</td>
                        <td>{this.state.listing2._type}</td>
                        <td>{this.state.listing3._type}</td>
                        <td>{this.state.listing4._type}</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Parking Policy</td>
                        <td>{this.state.listing1._parking}</td>
                        <td>{this.state.listing2._parking}</td>
                        <td>{this.state.listing3._parking}</td>
                        <td>{this.state.listing4._parking}</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Lease Period</td>
                        <td>{this.state.listing1._lease_period}</td>
                        <td>{this.state.listing2._lease_period}</td>
                        <td>{this.state.listing3._lease_period}</td>
                        <td>{this.state.listing4._lease_period}</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Smoking Policy</td>
                        <td>{this.state.listing1._smoking}</td>
                        <td>{this.state.listing2._smoking}</td>
                        <td>{this.state.listing3._smoking}</td>
                        <td>{this.state.listing4._smoking}</td>
                    </tr>

                    <tr>
                        <td className="tableHead">Pets Policy</td>
                        <td>{this.state.listing1._pets}</td>
                        <td>{this.state.listing2._pets}</td>
                        <td>{this.state.listing3._pets}</td>
                        <td>{this.state.listing4._pets}</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Nearby Grocery Stores</td>
                        <td>{this.state.listing1._grocery_stores}</td>
                        <td>{this.state.listing2._grocery_stores}</td>
                        <td>{this.state.listing3._grocery_stores}</td>
                        <td>{this.state.listing4._grocery_stores}</td>
                    </tr>
                    {/*<tr>*/}
                    {/*    <td className="tableHead">Distance to Bus Stop</td>*/}
                    {/*    <td>{this.state.selected._}</td>*/}

                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <td className="tableHead">Driving Time to Campus</td>*/}

                    {/*</tr>*/}

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