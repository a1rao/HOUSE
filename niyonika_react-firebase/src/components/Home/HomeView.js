import React, { Component } from "react";
import app from "../../base";

function CreateFolder(){
    // Get user input
    var x = document.getElementById("insertName");
    var uid = app.auth().currentUser.uid;

    // Add folder to database
    app.database().ref('users/'+ uid + '/folders/'+ x.elements[0].value).set({
        //"listing1" : x.elements[0].value
    });

    // Reset fields
    x.reset();
}

//const HomeView = () =>{
class HomeView extends Component {
    constructor(props) {
        super(props);

        this.state = { items:[]};

        var uid = app.auth().currentUser.uid;
        app.database().ref('users/' + uid).on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['.key'] = childSnapshot.key;
                items.push(item);
            });
            this.setState({items});
        });

        /* My shitty code
        var uid = app.auth().currentUser.uid;
        var ref = app.database().ref('users/' + uid);
        ref.once('value').then(function (snapshot) {
            firstname = snapshot.child('/first').key;
            lastname = snapshot.child('/last').key;
        });*/

    }

    render() {
        const records = this.state.items.map(items =>
            <tr key={items.first}>
                <td style={{width: '200px', textAlign: 'center'}}>{items.first}</td>
                <td style={{width: '200px', textAlign: 'center'}}>{items.last}</td>
            </tr>
        );

        return (
            <div>
                /*<h4>Welcome, {this.state.items.first} {this.state.items.last}</h4>*/
                <tbody>records: {records}</tbody>
                <h1>Insert URL:</h1>
                <form id="insertName">
                    Enter Folder Name:
                    <input
                        name="folderName"
                        type="folderName"
                        placeholder="Enter Folder Name"/>
                </form>
                <button onClick={CreateFolder}>Create folder</button>
                <button>Add to folder</button>
            </div>
        );
    }

};

export default HomeView;