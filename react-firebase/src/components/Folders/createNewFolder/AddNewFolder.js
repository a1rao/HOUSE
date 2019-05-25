import React, {Component} from "react";
import CreateFolder from "./CreateFolder";
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


    componentWillUnmount() {
        this.firebaseRef.off();
    }

       render() {

           const records = this.state.items.map(items =>
               <tr key={items.first}>
                   <td style={{width: '200px', textAlign: 'center'}}>{items.first}</td>
                   <td style={{width: '200px', textAlign: 'center'}}>{items.last}</td>
               </tr>
           );

        return(
            <div className="newFolder">
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
            </div>
        );
    };


}


export default AddNewFolder;



