import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../base";

import './LoginComponents/LoginMain.css';
import Login from './LoginComponents/LoginForm.js';
import BackGroundImage from './LoginComponents/LoginBackground.js';


/**
 * Container that renders all login components (logo, background, and
 */
class LoginContainer extends Component {

    /** Sign in user with Firebase Authentication API
     */
    handleSignIn = async event => {
        event.preventDefault();

        // Takes the elements in the form and saves it to email and password.
        const { email, password } = event.target.elements;

        try {

            // Authenticate the user and redirect them to the homepage.
            const user = await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            this.props.history.push("/");

        } catch (error) {
            alert(error);
        }
    }

    render() {

        return (


            // Contains the components inside the login screen including the image, form, and buttons.
            <div className="LoginScreen">
                <div className="houseLogoContainer">
                    <img src="https://github.com/a1rao/HOUSE/blob/master/react-firebase/src/components/NavigationBar/output-onlinepngtools.png?raw=true" alt="our logo" className="houseLogo"/>
                </div>

                <BackGroundImage className="imageContainer" />

                <Login className="login" onSubmit={this.handleSignIn}/>

            </div>

        );
    }
}


export default withRouter(LoginContainer);

