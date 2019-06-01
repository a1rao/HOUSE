import React, {Component} from "react";
import app from '../../../base';


// Add new folder to database
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
            <div className="newFolder">
                <form id="insertName">
                    <input
                        name="folderName"
                        type="text"
                        placeholder="Enter Folder Name"/>
                </form>
                <button onClick={CreateFolder}>Create New Folder</button>
            </div>
        );
    };


}


export default AddNewFolder;



