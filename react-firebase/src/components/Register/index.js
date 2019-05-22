import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../base";
import firebase from "firebase";

import RegisterView from "./RegisterView";

class RegisterContainer extends Component {
    handleSignUp = async event => {
        event.preventDefault();
        const { email, password, fname, lname } = event.target.elements;
        try {
            const user = await app.auth().createUserWithEmailAndPassword(email.value, password.value);
            var uid = app.auth().currentUser.uid;
            app.database().ref('users/'+uid).set({
                'email' : email.value,
                'first' : fname.value,
                'last' : lname.value,
                'campus' : 'University of California San Diego',
                'userID' : uid
            });
            this.props.history.push("/");
        } catch (error) {
            alert(error);
        }
    };

    render() {
        return <RegisterView onSubmit={this.handleSignUp} />;
    }
}

export default withRouter(RegisterContainer);