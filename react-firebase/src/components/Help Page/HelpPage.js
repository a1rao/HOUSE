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
                    The first one, "Home", is right below your name. Pressing this will bring you to the home page,
                    where you can enter new urls for the website to scrape (see Home Page).
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
                    search will allow you to see the information from a listing in the URL.
                </p>
                <p>
                    Lastly, you will see the "Need Help?" link, which brought you to this page, and the Logout button,
                    which will log you out of your account.

                </p>

                <b>Home Page</b>
                <p>
                    Once you are on the Home page, (see Navigation Bar)
                </p>

                <b>Comparing Listings</b>
                <p>
                    Once you are on the Comparison Page (see Navigation Bar), you will be able to view listings side by
                    side in a table view. The "Sort By" button will trigger a dropdown button, which will allow you to
                    sort the listings by different details of the listings. By pressing the "Add New Listing" button, you
                    will be able to add different listings to the table to compare.
                </p>

                <b>Folder Viewer</b>
                <p>
                    Once you are in the Folder Viewer (see Navigation Bar), you will be able to see the listings in the
                    folder you selected. The listings that are in the folder will be viewable in small windows, showing
                    important info (ie price, square footage, etc.).
                </p>
            </div>

        );
    }

}

export default HelpPage;