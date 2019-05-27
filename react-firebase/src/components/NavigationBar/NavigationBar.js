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



class NavigationBar extends Component {

    constructor(props) {
        super(props);

        // Store user information
        this.state = {
            firstName:'',
            lastName:'',
            folders: []
        };

        // Get user first and last name from database
        let uid = app.auth().currentUser.uid;
        this.firebase = app.database().ref('users/' + uid);
        this.firebase.on('value', dataSnapshot=> {
            const userObject = dataSnapshot.val();
            this.setState({
                firstName: userObject.first,
                lastName: userObject.last
            });
        });

        // Get folders
        this.firebase = app.database().ref('users/' + uid + '/folders/')
        this.firebase.on('value', dataSnapshot => {
            let items =[];
            console.log(dataSnapshot);
            dataSnapshot.forEach(childSnapshot => {
                items.push(childSnapshot.key);
                console.log(childSnapshot.key);
            })
            this.setState({folders: items})
        })

    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }


    render() {
        // Create new drop down element for each folder
        const allFolders = this.state.folders.map((eachFolder) =>
            <NavDropdown.Item href="#action/3.1">{eachFolder}</NavDropdown.Item>
        );

        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">{this.state.firstName} {this.state.lastName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#link">Compare</Nav.Link>
                            <NavDropdown title="My Folders" id="basic-nav-dropdown">
                                {allFolders}
                                <NavDropdown.Divider />
                                <AddNewFolder />
                            </NavDropdown>
                        </Nav>

                        <div className="searchBarWrapper">
                            <Form inline className="searchBar">
                                <FormControl type="text" placeholder="Enter Listing URL" className="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </div>

                        <div className="help">
                            <Nav.Link href="/help">Need Help?</Nav.Link>
                        </div>

                        <div className="logoutButton">
                            <Button onClick="#">Logout</Button>
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

export default NavigationBar;