import React, {Component} from "react";
import app from '../../../base';



// Contains the frontend for the create folder functionality.
class AddNewFolder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.firebaseRef = app.database().ref('users/');
        this.firebaseRef.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['.key'] = childSnapshot.key;
                items.push(item);
            });
            this.setState({items});
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
                <button onClick={CreateFolder}>Create folder</button>
            </div>
        );
    };


}


export default AddNewFolder;



