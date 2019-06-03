import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import fetchData from '../../Backend/Database/GetFromDb';

var allFolders = '';

class Table1 extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            tableNumber: '1',
            folders: [],
            showFolders: false,
        };

        let getFolders = fetchData.getFolderNames.bind(this);
        getFolders();
    }

    handleClose() {
        this.setState({ showMain: false });
    }

    handleCloseFolders= async event=>{
        this.setState({showFolders: false});
    }

    handleShow() {
<<<<<<< HEAD
        this.setState({ show: true });

    }

    handleChooseFolders = async event=>{
        this.setState({showFolders: true});
        const all = this.state.folders.map((eachFolder) =>
            <Button variant="outline-success" onClick={() => this.handlePush(eachFolder)}>{eachFolder}</Button>
        );
        allFolders = all;
=======
        this.setState({ showMain: true });
>>>>>>> a0fa4313e8710401c1b506413f26f7a32d1b30af
    }



    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleChooseFolders}> Add New Listing
                </Button>

<<<<<<< HEAD
                {/*<Modal show={this.state.show} onHide={this.handleClose}>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title>Table {this.state.tableNumber}</Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*</Modal>*/}

                <Modal show={this.state.showFolders} onHide={this.handleCloseFolders}>
=======
                <Modal show={this.state.showMain} onHide={this.handleClose}>
>>>>>>> a0fa4313e8710401c1b506413f26f7a32d1b30af
                    <Modal.Header closeButton>
                        <Modal.Title>Select a Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {allFolders}
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