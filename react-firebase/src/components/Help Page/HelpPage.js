import React, {Component} from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './HelpPage.css';
import '../NavigationBar/NavigationBar.js';
import NavigationBar from "../NavigationBar/NavigationBar";
/* HelpPage.js
 * Description on how the app can be used
 */

class HelpPage extends Component {
    render() {
        return (
            <div>
                {/*Display navigation bar*/}
                <NavigationBar />

                <Jumbotron>
                        <h1 className="helpHeader">Help Page</h1>
                </Jumbotron>

                <b>Navigation Bar</b>

                <p>
                    The Navigation Bar is accessible from anywhere on the website once you are logged in.
                    The help page below will cover the details of the website and its usage by going through each
                    component in the Navigation Bar and explaining each part:
                </p>

                <b>Home Screen</b>

                <p>
                    The Home Screen can be accessed through the Home button on the Navigation Bar and is the default
                    screen when you login. The Home Screen contains the group of acceptable websites to scrape from that
                    our app supports (<a href="https://www.rent.com/">rent.com</a>, <a href="https://www.rentals.com/">rentals.com</a>, <a href="https://www.trulia.com/">trulia.com</a>, and <a href="https://www.apartments.com/">apartments.com</a>).
                </p>

                <b>My Folders</b>
                <p>
                    In the My Folders dropdown menu on the Navigation Bar, all of the folders that the user has created
                    can be viewed there. A folder is a user named and generated spot where the user can save housing
                    listings to store and use for later. At first when a user signs up for HOUSE, nothing will appear in
                    the dropdown menu besides an area to create a new folder. To create a new blank folder, simply type
                    in the name of the folder in the text box at the bottom of the My Folders tab. Then to create the
                    folder, simply hit the "Create New Folder" button. When the user clicks one of the folders that is
                    available to them on the dropdown menu, it will take them into the folder viewer where they can view
                    their listings. To add listings into the folders, see the Scrape Listings tab just below.

                </p>

                <b>Scrape Listings</b>
                <p>
                    In the middle of the navigation bar, the user can input a URL from one of the websites listed in the
                    Home Page to get a list of details regarding the listing that is scraped. When this happens, the
                    user can either choose to save the listing into a folder that they have previously created, a folder
                    that they can create at the time of the listing, or they can close the listing if they choose not to
                    submit it. To add the folder, just simply select the folder desired, otherwise create a new folder
                    with the create new folder tool provided below, or close the listing by hitting the close button or
                    clicking outside the popup window.
                </p>

                <b>Logout</b>
                <p>
                    To logout of your account, simply hit the logout button at the top right of the Navigation Bar.
                </p>
            </div>

        );
    }

}

export default HelpPage;