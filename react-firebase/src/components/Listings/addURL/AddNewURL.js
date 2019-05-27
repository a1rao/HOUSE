import React, {Component} from "react";
import app from "../../../base";

// Save listing url from Add To Folder button

function SaveListing(){
    // Get user input
    var userInput = document.getElementById("insertURL");
    var url = userInput.elements[0].value;
    var selectedFolder = "TEST";

    // Push listing to folder specified by folder
    var uid = app.auth().currentUser.uid;
    var databaseref = app.database().ref('users/' + uid + '/folders/' + selectedFolder);
    var listingKey = databaseref.push().key;
    databaseref.child(listingKey).set({'id':listingKey});

    // Add listing to "listings" table
   databaseref = app.database().ref('listings/');
    databaseref.child(listingKey).set({
        'url' : url,
        'price': 0,
        'address': ""

    });

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
