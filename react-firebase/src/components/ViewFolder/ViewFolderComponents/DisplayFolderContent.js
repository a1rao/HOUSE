import React, {Component} from 'react';
import app from "../../../base";
import ListThumbnail from '../../Listings/ListThumbnail/ListThumbnail.js'
import '../../Listings/ListThumbnail/ListThumbnail.css';
import fetchData from "../../Backend/Database/GetFromDb";
//import ListImage from './components/ListImage';


// Display all listing thumbnails from folder that is currently selected
// For testing purposes, this folder is:  TEST

class DisplayFolderContent extends Component{


    constructor(props) {
        super(props);
        // Store user information
        this.state = {
            'allIDs': null,
            'eachListing': [],
            'done': 0
        };

    }

    getDataFromDb(){

        setTimeout(()=> {
                // Get listing id's
                let first = fetchData.getIDs.bind(this);

                // Get each listing info
                let second = fetchData.getAllListings.bind(this);

                // Make second function call after the first one is done
                first(second);
            },0);
    }


    componentDidMount() {
        this.getDataFromDb();
    }

    render(){


        // Make sure component one mounting
        if(this.state.done === 0){
            console.log("IS 0");
            return <div />
        }


            // display each listing in folder TODO
            // allListings is a list of saved listings in the user's folder
            // ERROR: only displays most recent listing with the className: "thumbnail"
        console.log("state DONEEE", this.state.done);
        console.log("render all ids", this.state.allIDs);
        console.log("each listing has: ", this.state.eachListing);
        console.log("render each listing", this.state.eachListing.length);
            /*const allListings = this.state.eachListing.map((listing) =>
                <div className="thumbnail">
                    <p>url: {listing.url}</p>
                    <p>price: {listing.price}</p>
                    <p>address: {listing.address}</p>
                </div>
            );*/

            //this.state.eachListing.push("Hey hey");
            //this.state.eachListing.push("yo yo");
            // WHY IS IT NOT SHOWING
            return (

                <div className="thumbnail">
                    {
                        /*this.state.eachListing.map((listing, index) => {
                            return (
                                <p key={index}>{listing}</p>
                            )
                        })*/
                        this.state.eachListing
                    }
                </div>

            );
    }





    /********



    componentWillUnmount() {
        app.database().off();
    }

    render(){
        console.log("in Display Folder Content");
        return(

            <ListThumbnail />
        );
        // display each listing in folder TODO

    } ****/

}

export default DisplayFolderContent;