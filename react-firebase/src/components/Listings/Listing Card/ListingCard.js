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
                this.handleShow();
                setTimeout(function(){

                    console.log("after scraping: " + listingInfo.price);
                    that.setState({image: listingInfo.photo});
                    that.setState({title: listingInfo.title});
                    that.setState({address: listingInfo.address});
                    that.setState({price: listingInfo.price});
                    that.setState({bed: listingInfo.bed});
                    that.setState({bath: listingInfo.address});
                    that.setState({area: listingInfo.area});
                    that.setState({type: listingInfo.type});
                    that.setState({distance_to_campus: listingInfo.distance_to_campus});
                    that.setState({contact_name: listingInfo.contact_name});
                    that.setState({contact_number: listingInfo.contact_number});
                    that.setState({lease_policy: listingInfo._lease_period});
                    that.setState({deposit: listingInfo.deposit});
                    that.setState({address: listingInfo.address});
                    that.setState({parking: listingInfo.parking});
                    that.setState({smoking: listingInfo.smoking});
                    that.setState({pet: listingInfo.pet});
                    that.setState({description: listingInfo._description});
                    that.setState({address: listingInfo.address});

                    },6000);

            }
    };

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
                    <Modal.Body>
                        URL : {this.state.url}
                        <br/>
                        PHOTO: {this.state.image}
                        <br/>
                        TITLE: {this.state.title}
                        <br/>
                        ADDRESS:{this.state.address}
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