import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import fetchData from '../../Backend/Database/GetFromDb';

var allFolders = '';
var allListings = '';

class Table1 extends Component {

    constructor(props, context) {
        super(props, context);


        this.state = {
            tableNumber: '1',
            allIDs: [],
            folders: [],
            eachListing: [],
            showFolders: false,
            showListings: false,
        };

        let getFolders = fetchData.getFolderNames.bind(this);
        getFolders();

        this._getIDs = fetchData.getIDs.bind(this);
        this._getListings = fetchData.getAllListings.bind(this);
    }

    handleShowFolders = async event =>{
        this.setState({showFolders: true});
        const all = this.state.folders.map((eachFolder) =>
            <Button variant="outline-success" onClick={() => this.handleCloseFolders(null, eachFolder)}>{eachFolder}</Button>
        );
        allFolders = all;

        this.setState({ showMain: true });
    }

    handleCloseFolders = async (event, folder) =>{
        this.setState({showFolders: false});
        this.handleShowListings(folder);
    }

    handleCFolders = async event => {
        this.setState({showFolders: false});
    }

    handleShowListings = async folder => {
        console.log(folder);
        await this._getIDs(this._getListings, folder);


        setTimeout(() => {

            console.log(this.state.allIDs);
            console.log(this.state.eachListing);
            const all = this.state.eachListing.map((listing) =>
                    <Button variant="outline-success" onClick={() => this.handleAddToTable(listing)}>{listing._title}</Button>
            );
            allListings = all;
            this.setState({showListings: true});
    }, 1000 + 100*this.state.allIDs.length);

    }

    handleCloseListings = async event => {
        this.setState({showListings: false});
    }

    handleAddToTable = async event => {
        console.log("we are able to select a specific listing : " + event._address);
    }



    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShowFolders}> Add New Listing
                </Button>

                {/*<Modal show={this.state.show} onHide={this.handleClose}>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title>Table {this.state.tableNumber}</Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*</Modal>*/}

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


                    {/*// <Modal.Footer>*/}
                    {/*//     <Button variant="secondary" onClick={this.handleClose}>*/}
                    {/*//         Close*/}
                    {/*//     </Button>*/}
                    {/*//     <Button variant="primary" onClick={this.handleClose}>*/}
                    {/*//         Save Changes*/}
                    {/*//     </Button>*/}
                    {/*// </Modal.Footer>*/}
            </>
        );
    }
}

export default Table1;