/* NavigationBar.js
 * Contains the code and styling for the top navigation bar
 */
import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import app from '../../base';
import './NavigationBar.css';
import AddNewFolder from '../Folders/createNewFolder/AddNewFolder';
import fetchData from '../Backend/Database/GetFromDb.js';
import ListingCard from '../Listings/Listing Card/ListingCard';
import { withRouter } from 'react-router-dom';

let folderName;     // Global variable to store folder's name

/**
 * Displays the navigation bar that contains path to Home page, Comparison page, Folder page, Search bar, and Logout
 */
class NavigationBar extends Component {

    constructor(props) {
        super(props);

        // Store user information
        this.state = {
            firstName:'',
            lastName:'',
            folders: [],
            url:'',
            allIDs: null,
            eachListing: null,
            done: 0,
        };

        // Get user first and last name from database
        let getName = fetchData.getName.bind(this);
        getName();


        // Get folders
        let getFolders = fetchData.getFolderNames.bind(this);
        getFolders();
        this.saveName = this.saveName.bind(this);
        this.returnName = this.returnName.bind(this);

    }

    // Save the name of a folder into database and set folderName
    saveName(folder) {
        localStorage.setItem("viewFolderName", folder);
        folderName =  folder;
    }

    // Return name of folder
    returnName() {
        return folderName;
    }

    // Handle sign out using Authentication API
    handleSignOut = async event => {
        event.preventDefault();
        // Force user to return to login page
        this.props.history.push("/login");
        window.location.reload();

        // Sign out from the system
        try {
            app.auth()
                .signOut().then(function() {
            });
        } catch (error) {
            alert(error);
        }
    };


    render() {
        // Create new drop down element for each folder
        const allFolders = this.state.folders.map((eachFolder) =>
            <NavDropdown.Item onClick= {() => this.saveName(eachFolder)} href="/folderView/">{eachFolder}</NavDropdown.Item>
        );

        return (

            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">{this.state.firstName} {this.state.lastName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/compare">Compare</Nav.Link>
                            <NavDropdown title="My Folders" id="basic-nav-dropdown" role="button">
                                {allFolders}
                                <NavDropdown.Divider />
                                <AddNewFolder />
                            </NavDropdown>
                        </Nav>

                        <div className="bgImage">
                            <img src="https://i.ibb.co/6yF4X0H/output-onlinepngtools-1.png"
                                 alt="output-onlinepngtools-1" width={100} height={65} />
                        </div>

                        <div className="searchBarWrapper">
                            <Form inline className="searchBar">
                                <ListingCard />
                            </Form>
                        </div>

                        <div className="help">
                            <Nav.Link href="/help">Need Help?</Nav.Link>
                        </div>

                        <div className="logoutButton">
                            <Button variant="outline-info" onClick={this.handleSignOut}>Logout</Button>
                        </div>

                    </Navbar.Collapse>
                </Navbar>
            </div>
            );
        }
        }


export default withRouter(NavigationBar);
export {folderName};
