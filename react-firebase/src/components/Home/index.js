import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../base";
import firebase from "firebase";

import HomeView from "./HomeView";

class HomeContainer extends Component {

    /*componentDidMount() {
        let uid = app.auth().currentUser.uid;
        console.error(uid);
        this.dbref.ref('users/' + uid).once('value').then(dataSnapshot => {
            const userObject = dataSnapshot.val();
            console.log(userObject);
            this.fn = userObject.first;
            this.ln = userObject.last;
            //this.setState({firstName: userObject.first});
            //this.state.lastname=userObject.last;
        });
    }*/

    render() {
        //return <HomeView />;
    }
}

//export default withRouter(HomeContainer);