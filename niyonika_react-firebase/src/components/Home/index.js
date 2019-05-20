import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../base";
import firebase from "firebase";

import HomeView from "./HomeView";

class HomeContainer extends Component {
    componentDidMount() {
        var uid = app.auth().currentUser.uid;
        var firstname = "lol";
        var lastname = "what";
        app.database().ref('users/' + uid).once('value').then(function(snapshot) {
            firstname = snapshot.child('/first').key;
            lastname = snapshot.child('/last').key;
        });
    }

    render() {
        return <HomeView />;
    }
}

//export default withRouter(HomeContainer);