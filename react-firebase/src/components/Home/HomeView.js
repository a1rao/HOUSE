import React, { Component } from "react";
import app from "../../base";
import AddNewURL from '../Listings/addURL/AddNewURL';
import NavigationBar from '../NavigationBar/NavigationBar';
import ViewFolder from '../ViewFolder/ViewFolderComponents/DisplayFolderContent.js';
import ListThumbnail from '../Listings/ListThumbnail/ListThumbnail';
import ListingCard from '../Listings/Listing Card/ListingCard';
import '../Login/LoginComponents/LoginBackground.css';

class HomeView extends Component {


    render() {

        return (
            <div>

                {/*Navigation bar at the top of the screen. */}
                <NavigationBar/>

                <div className="backgroundImageContainer">
                    {/*<img src="./Background_smallerlogo.jpg" alt="a beautiful picture" className="backgroundImage"/>*/}
                    <img src="https://graphicriver.img.customer.envatousercontent.com/files/246062449/preview.jpg?auto=format&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=25ef6f5f977ada803a462772880e04c6" alt="Pic blurry" className="backgroundImage" />
                </div>

                {/*Code for the list thumbnail.
                    <ListThumbnail/>*/}
              {/*Test list thumbnail.
                <ListThumbnail />*/}


                {/*Test ViewFolder

                <ViewFolder/>*/}


            </div>
        );
    }
}

export default HomeView;
