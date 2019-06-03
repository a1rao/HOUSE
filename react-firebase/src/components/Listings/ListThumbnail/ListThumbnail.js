import React, {Component} from 'react';
import './ListThumbnail.css';
import fetchData from "../../Backend/Database/GetFromDb";
import app from "../../../base";
//import ListImage from './components/ListImage';

class ListThumbnail extends Component {

    constructor(props) {
        super(props);

        // Store user information
        this.state = {
            'allIDs': [],
            'eachListing' : []
        };

        // Get listing id's

        let first = fetchData.getIDs.bind(this);

        // Get each listing info

        let second = fetchData.getAllListings.bind(this);

        // Make second function call after the first one is done
        first(second);

    }

  //  componentWillUnmount()
  //      app.database().off();
  //  }

    render(){
        // display each listing in folder TODO
        // allListings is a list of saved listings in the user's folder
        // ERROR: only displays most recent listing with the className: "thumbnail"
        const allListings = this.state.eachListing.map((listing) =>
            <div>
                <p>url: {listing.url}</p>
                <p>price: {listing.price}</p>
                <p>address: {listing.address}</p>
            </div>
        );

        return(
            <div>
                <p>{allListings}</p>
            </div>
        );
    }


    render() {

        return (
            <div className="thumbnail">
                <ol>

                </ol>
            </div>
        );
    }
}

export default ListThumbnail;