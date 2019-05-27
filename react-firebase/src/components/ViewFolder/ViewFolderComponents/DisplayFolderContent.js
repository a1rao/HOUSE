import React, {Component} from 'react';
import app from "../../../base";

function getListings(){


}

class DisplayFolderContent extends Component{

    constructor(props) {
        super(props);

        // Store user information
        this.state = {
            'allIDs': [],
            'eachListing' : []
        };


        function getIDs(cb) {
            // Get listing id's
            let uid = app.auth().currentUser.uid;
            const prom1 = app.database().ref('users/' + uid + '/folders/' + 'TEST').on('value', dataSnapshot => {
                //const userObject = dataSnapshot.val();
                let items = [];
                dataSnapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    console.log("id", item);
                    items.push(item);
                });
                this.setState({allIDs: items});
                console.log("state: ", this.state.allIDs);

                cb();

            });
        }

        let lol = getIDs.bind(this);

        function getInfo() {
            // Get each listing info
            let items = [];
            console.log("should be after", this.state.allIDs);
            this.state.allIDs.forEach(id => {
                app.database().ref('listings/' + id).once('value', dataSnapshot => {
                    let listing = dataSnapshot.val();
                    items.push(listing);
                    console.log("info:", listing);
                });
            });
            this.setState({eachListing: items});
        }

        let lol2 = getInfo.bind(this);




        lol(lol2);

    }

    componentWillUnmount() {
        //this.firebase.off();
    }

    render(){
        return(
            <h1> is anything here </h1>
        );
    }



}

export default DisplayFolderContent;