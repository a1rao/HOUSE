import React, {Component} from 'react';
import app from "../../../base";
import ListThumbnail from '../../Listings/ListThumbnail/ListThumbnail.js'
import '../../Listings/ListThumbnail/ListThumbnail.css';
import fetchData from "../../Backend/Database/GetFromDb";
//import ListImage from './components/ListImage';


// Display all listing thumbnails from folder that is currently selected
// For testing purposes, this folder is:  TEST

allListings;

class DisplayFolderContent extends Component{

    constructor(props) {
        super(props);

        // Store user information
        this.state = {
            allIDs: null,
            eachListing: null,
            done: 0,
        };

        this.allListings = 0;

    }

    //componentWillMount() {

         getIDs = async event => {
            let uid = app.auth().currentUser.uid;
            let databaseref = app.database().ref('users/' + uid + '/folders/' + 'TEST')
            databaseref.on('value', dataSnapshot => {
                let items = [];
                dataSnapshot.forEach(childSnapshot => {
                    let item = childSnapshot.key;
                    items.push(item);
                });
                this.setState({allIDs: items});
                // Callback function
                cb();
            });

        }

         getInfo() = async event => {
            let items = [];
            console.log("allIDs:", this.state.allIDs);
            this.state.allIDs.forEach(id => {
                 app.database().ref('listings/' + id).on('value', dataSnapshot => {
                    let listing = dataSnapshot.val();
                    items.push(listing);
                });
            });
            //items.push("fckthisss");
            //items.push("killme");
            items.push("plswork");
            this.setState({eachListing: items});
            console.log("eachlisting in db:", this.state.eachListing.length);
            this.setState({done: true});
        }

        let first = getIDs.bind(this);
        let second = getInfo.bind(this);

        first(second);


        /* Get listing id's
        let first = fetchData.getIDs.bind(this);
        // Get each listing info
        let second = fetchData.getAllListings.bind(this);
        // Make second function call after the first one is done
        this.allListings = first(second);*/

    //}

    render(){

        if(this.state.done === 0){
            console.log("IS 0");
            return <div />
        }


        console.log("size id:", this.state.allIDs);
        console.log("size eachlist:", this.state.eachListing.length);
        this.state.eachListing.forEach(function(elem){
               console.log("print:", elem);
           });

        /*this.allListings = this.state.allIDs.map((listing) =>
            <li id = {listing}>{listing}</li>
        );*/

        const map = this.allListings.map((listing) =>
            <div className="thumbnail">
                <p>url: {listing.url}</p>
                <p>price: {listing.price}</p>
                <p>address: {listing.address}</p>
            </div>
        );


        console.log("allList", this.allListings);

            return (
                <div >
                    <p>{map}</p>
                </div>
            );
        }





    /*const allIDsmap = this.state.allIDs.map((id) =>
        <p>{id}</p>
    );*/

    /*<div className="thumbnail">
                <p>url: {listing.url}</p>
                <p>price: {listing.price}</p>
                <p>address: {listing.address}</p>
            </div>*/



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