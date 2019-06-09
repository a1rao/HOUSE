/* AddNewURL.js
 * Save listing url from Add to Folder Button
 */
import React, {Component} from "react";
import saveData from '../../Backend/Database/SaveToDb.js';

/**
 * Make calls to the database to save the listing to the database
 * @constructor
 */
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
                {/*Add Listing to folder clicked*/}
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

