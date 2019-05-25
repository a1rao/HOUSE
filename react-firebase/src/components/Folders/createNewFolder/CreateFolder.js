import app from "../../../base";

var database = app.database();

// Creates the folder for the user.
function CreateFolder(){
    // Get user input
    var userInput = document.getElementById("insertName");
    var uid = app.auth().currentUser.uid;

    // Add folder to database
    var folderName = userInput.elements[0].value;
    database.ref('users/'+ uid + '/folders/'+ folderName).set({
        "listing1" : folderName
    });

    // Reset fields
    userInput.reset();
}

export default CreateFolder;