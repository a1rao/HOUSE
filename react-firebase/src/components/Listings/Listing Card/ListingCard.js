import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NavigationBar from '../../NavigationBar/NavigationBar';
import FormControl from "react-bootstrap/FormControl";

const scrape = require('../../../Main_Scraper/scrape');


class ListingCard extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            url:''
        };
    }

    readURL = async event => {
        event.preventDefault();
        this.setState({url:event.target.value})
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleScrape = async event => {

            let url = this.state.url + "";

            console.log("The passed in variable: " + this.state.url);

            console.log("The local variable: " + url);

            if(url.length > 0) {
                console.log("scraping from " + this.state.url);
                const temp = await scrape(this.state.url);
                this.handleShow();
            }
    }

    render() {
        return (
            <div>
                <FormControl type="text" name="url" placeholder="Enter Listing URL" onChange={this.readURL} className="mr-sm-2"/>

                <Button variant="outline-success" onClick={this.handleScrape}>
                    Search
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }


}

export default ListingCard;