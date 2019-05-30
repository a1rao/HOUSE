import React, {Component} from "react";
import app from "../../../base";
import saveData from '../../Backend/Database/SaveToDb.js';

// Save listing url from Add To Folder button

function SaveListing(){
    // Get user input
    var userInput = document.getElementById("insertURL");
    var url = userInput.elements[0].value;
    var selectedFolder = "TEST";

    // Call SaveToDb function to save listing to db
    const saveToDb = saveData.saveListing;
    saveToDb(selectedFolder, url);


    // Reset fields
    userInput.reset();

}

class AddNewURL extends Component {

    render() {

        return(
            <div>
                <form id = "insertURL">
                    <input
                        name="url"
                        type="text"
                        placeholder="Enter Listing URL"/>
                </form>
                <button onClick={SaveListing}>Add to folder</button>
            </div>
        );
    }

}

export default AddNewURL;
