import React, { Component } from "react";
import app from "../../base";
import AddNewURL from '../Listings/addURL/AddNewURL';
import NavigationBar from '../NavigationBar/NavigationBar';
import ViewFolder from '../ViewFolder/ViewFolderComponents/DisplayFolderContent.js';
import ListThumbnail from '../Listings/ListThumbnail/ListThumbnail';
import ListingCard from '../Listings/Listing Card/ListingCard';

class HomeView extends Component {


    render() {

        return (
            <div>

                {/*Navigation bar at the top of the screen. */}
                <NavigationBar/>

                {/*Code for adding a new listing. */}
                <AddNewURL/>

                {/*Test list thumbnail.
                <ListThumbnail />*/}

                {/*Test ViewFolder

                <ViewFolder/>*/}

            </div>
        );
    }
}

export default HomeView;

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

//<h4>{this.state.firstName}</h4>
