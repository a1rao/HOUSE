import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import fetchData from '../../Backend/Database/GetFromDb';

var allFolders = '';

class Table1 extends Component {

    constructor(props, context) {
        super(props, context);


        this.state = {
            tableNumber: '1',
            folders: [],
            showFolders: false,
            showListings: false,
        };

        let getFolders = fetchData.getFolderNames.bind(this);
        getFolders();
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

        this.setState({showListings: true});

    }

    handleCloseListings = async event => {
        this.setState({showListings: false});
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
                        Hello
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