import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import app from '../../base';
import './NavigationBar.css';
import AddNewFolder from '../Folders/createNewFolder/AddNewFolder';
import fetchData from '../Backend/Database/GetFromDb.js';
import ListingCard from '../Listings/Listing Card/ListingCard';
import NavLink from "react-bootstrap/NavLink";


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

    }

    /*componentWillUnmount() {
        this.firebaseRef.off();
    }*/

    handleSignOut = async event => {
        event.preventDefault();
        try {
            app.auth()
                .signOut().then(function() {
                    console.log("signed out");
            });
        } catch (error) {
            alert(error);
        }
    };

    readURL = async event => {
        event.preventDefault();
        this.setState({url:event.target.value})
    }


    render() {
        // Create new drop down element for each folder
        const allFolders = this.state.folders.map((eachFolder) =>
            <NavDropdown.Item href="/folderView" >{eachFolder}</NavDropdown.Item>
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

                        <div className="searchBarWrapper">
                            <Form inline className="searchBar">
                                <FormControl type="text" name="url" placeholder="Enter Listing URL" onChange={this.readURL} className="mr-sm-2"/>
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


/*<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/

//eventKey={eachFolder} onSelect={k => this.handleSelect(k)}

export default NavigationBar;
