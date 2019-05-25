import React, { Component } from "react";
import app from "../../base";

var database = app.database();

function CreateFolder(){
    // Get user input
    var userInput = document.getElementById("insertName");
    var uid = app.auth().currentUser.uid;

    // Add folder to database
    var folderName = userInput.elements[0].value;
    database.ref('users/'+ uid + '/folders/'+ folderName).set({
        "listing1" : ""
    });

    // Reset fields
    userInput.reset();
}

// Todo
function SaveListing(){
}


class HomeView extends Component {
    constructor(props) {
        super(props);

        // Store user information
        this.state = {
            firstName:'',
            lastName:'',
            folders: []
        };

        // Load user first and last name from database (Does not work)
        let uid = app.auth().currentUser.uid;
        console.log("THISSS", uid);
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

    /*async componentDidMount() {
        // Load user first and last name from database (Does not work)
        let uid = app.auth().currentUser.uid;
        console.error(uid);
        await app.database().ref('users/' + uid).once('value').then(dataSnapshot => {
            const userObject = dataSnapshot.val();
            console.log(userObject);
            //this.fn = userObject.first;
            //this.ln = userObject.last;
            this.setState({firstName: userObject.first});
            //this.state.lastname=userObject.last;
        });

        this.setState({firstName: 'KILL ME'});
    }*/

    render() {
        const allFolders = this.state.folders.map((eachFolder) =>
            <li key = {eachFolder}>
                {eachFolder}
            </li>
        );

        return (
            <div>
                <h4>{this.state.firstName} {this.state.lastName}</h4>
                <h4>Folders: <ul>{allFolders}</ul></h4>
                <form id="insertName">
                    <input
                        name="folderName"
                        type="text"
                        placeholder="Enter Folder Name"/>
                </form>
                <button onClick={CreateFolder}>Create folder</button>
                <form id="insertURL">
                    <input
                        name="url"
                        type="text"
                        placeholder="Enter Listing URL"/>
                </form>
                <button onClick={SaveListing}>Add to folder</button>
            </div>
        );
    }

};
//<h4>{this.state.firstName}</h4>
/*<tbody> {records} </tbody>*/
/*        const records = this.state.items.map(items =>
            <tr key={items.uid}>
                <td style={{width: '200px', textAlign: 'center'}}>{items.first}</td>
                <td style={{width: '200px', textAlign: 'center'}}>{items.last}</td>
            </tr>
        );*/
export default HomeView;