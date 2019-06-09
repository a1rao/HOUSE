/*  AddNewFolder.js
 *  Create a new folders and add listings in it
 */
import React, {Component} from "react";
import app from '../../../base';
import './AddNewFolder.css';


/** Add new folder to database*/
function CreateFolder(){
    // Get user input
    let userInput = document.getElementById("insertName");
    let uid = app.auth().currentUser.uid;

    // Add folder to database
    let folderName = userInput.elements[0].value;

    if(folderName.length > 0) {
        app.database().ref('users/'+ uid + '/folders/'+ folderName).set({
            "listing1" :  ""
        });
    }
    // Reset fields
    userInput.reset();
}

// Contains the frontend for the create folder functionality.
class AddNewFolder extends Component {

       render() {

        return(
            // Record the name of folder from user
            <div className="newFolder">
                <form id="insertName"  className={"enterNameForm"}>
                    <input
                        name="folderName"
                        type="text"
                        placeholder="Enter Folder Name"/>
                </form>
                <button onClick={CreateFolder} className="addNewButton">Create New Folder</button>
            </div>
        );
    };


}


export default AddNewFolder;



