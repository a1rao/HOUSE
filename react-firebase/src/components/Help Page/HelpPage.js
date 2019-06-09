import React, {Component} from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './HelpPage.css';
import '../NavigationBar/NavigationBar.js';
import NavigationBar from "../NavigationBar/NavigationBar";

class HelpPage extends Component {
    render() {
        return (
            <div>
                <NavigationBar />

                <Jumbotron>
                        <h1 className="helpHeader">Help Page</h1>
                </Jumbotron>

                <b>Navigation Bar:</b>
                <p>
                    The Navigation Bar will be accessible from anywhere on the website once you are logged in.
                    It can be expanded by pressing the three horizontal lines in the top right corner of the page.
                    Once expanded, you will see a few items:
                </p>
                <p>
                    The first one, "Home", is right below your name. Pressing this will bring you to the home page.
                </p>
                <p>
                    The second, "Compare", will bring you to the comparison page, where you can compare multiple
                    listings side-by-side (see Comparing Listings).
                </p>
                <p>
                    Under that will be a dropdown called "My Folders". This can be used to view all your folders and
                    create new ones. When you click on one of your folders, it will bring you to the folder viewer
                    (see Folder Viewer).
                </p>
                <p>
                    Under this, you will see an option to "Enter Listing URL". Typing a valid URL into here and pressing
                    "Scrape" will allow you to see the information from a listing in the URL.
                </p>
                <p>
                    Lastly, you will see the "Need Help?" link, which brought you to this page, and the Logout button,
                    which will log you out of your account.

                </p>

                <b>Comparing Listings</b>
                <p>
                    Once you are on the Comparison Page (see Navigation Bar), you will be able to view listings side by
                    side in a table view. There are various different fields that will display in a grid-view. By
                    pressing the "Add New Listing" button, you will be able to add different listings to the table to
                    compare. You can then pick any listing in your folders. You can remove a listing from the comparison
                    by clicking "Remove Listing".
                </p>

                <b>Folder Viewer</b>
                <p>
                    Once you are in the Folder Viewer (see Navigation Bar), you will be able to see the listings in the
                    folder you selected. The listings that are in the folder will be viewable in small windows, showing
                    important info (ie price, square footage, etc.). You will be able to click the different "Sort By"
                    options to sort it by price, bedrooms, etc. In addition, you can click on the listings to see more
                    information.
                </p>
            </div>

        );
    }

}

export default HelpPage;