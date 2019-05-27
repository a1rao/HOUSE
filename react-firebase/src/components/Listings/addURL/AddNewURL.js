import React, {Component} from "react";
import app from "../../../base";

// To Do
function SaveListing(){
    // Get user input
    var userInput = document.getElementById("insertURL");
    var url = userInput.elements[0].value;
    var selectedFolder = "TEST";

    // Add listing to "listings" table
    var databaseref = app.database().ref('listings/');
    console.log(url);
    var listingKey = databaseref.push().key;
    databaseref.child(listingKey).set({
        'url' : url,
        'price': 2700

    });

    // Add listing to folder specified by folder
    var uid = app.auth().currentUser.uid;
    databaseref = app.database().ref('users/' + uid + '/folders/' + selectedFolder);
    databaseref.set({
        'listing' : listingKey
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
