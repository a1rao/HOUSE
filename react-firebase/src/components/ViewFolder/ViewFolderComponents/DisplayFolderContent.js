import React, {Component} from 'react';
import app from "../../../base";
import NavDropdown from "react-bootstrap/NavDropdown";
import fetchData from '../../Backend/Database/GetFromDb.js';


// Display all listing thumbnails from folder that is currently selected
// For testing purposes, this folder is:  TEST

class DisplayFolderContent extends Component{




    componentWillUnmount() {
        app.database().off();
    }

    render(){
        return(
            <h1></h1>
        );
        // display each listing in folder TODO

    }



}

export default DisplayFolderContent;