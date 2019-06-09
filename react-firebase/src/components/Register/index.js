import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../base";

import './RegisterComponents/RegMain.css';
import Registration from './RegisterComponents/RegForm.js';
import BackGroundImage from './RegisterComponents/RegBackground.js';

class RegisterContainer extends Component {
    handleSignUp = async event => {
        // Register user using Firebase Authentication API
        event.preventDefault();
        const { email, password, fname, lname } = event.target.elements;
        try {
            // Create user with email and password, push to database
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
        return(
            <div className="Registration">

                <div className="houseLogoContainer">
                    <img src="https://github.com/a1rao/HOUSE/blob/master/react-firebase/src/components/NavigationBar/output-onlinepngtools.png?raw=true" alt="our logo" className="houseLogo"/>
                </div>

                <BackGroundImage className="imageContainer" />

                <Registration className="registrationScreen" onSubmit={this.handleSignUp}/>


            </div>
        );
    }
}

export default withRouter(RegisterContainer);