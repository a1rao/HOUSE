import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Table4 extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            tableNumber: '4',
        };
    }

    handleClose() {
        this.setState({ showMain: false });
    }

    handleShow() {
        this.setState({ showMain: true });
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}> Add New Listing
                </Button>

                <Modal show={this.state.showMain} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Table {this.state.tableNumber}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Table4;