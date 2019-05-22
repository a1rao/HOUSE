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
        "listing1" : folderName
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

        /*this.state = {
            firstName:'',
            lastName:''
        };*/

        /* Load user first and last name from database (Does not work)
        let uid = app.auth().currentUser.uid;
        console.error(uid);
        app.database().ref('users/' + uid).on('value', dataSnapshot=> {
            const userObject = dataSnapshot.val();
            //let firstName = userObject.first;
            this.setState({firstName: 'WHY'});
            //this.state.lastName=userObject.last;
        });*/



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
        const records = this.state.items.map(items =>
            <tr key={items.first}>
                <td style={{width: '200px', textAlign: 'center'}}>{items.first}</td>
                <td style={{width: '200px', textAlign: 'center'}}>{items.last}</td>
            </tr>
        );
        return (
            <div>
                <tbody>
                {records}
                </tbody>
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
export default HomeView;