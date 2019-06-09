import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../base";

import './LoginComponents/LoginMain.css';
import Login from './LoginComponents/LoginForm.js';
import BackGroundImage from './LoginComponents/LoginBackground.js';


class LoginContainer extends Component {
    // Sign in user with Firebase Authentication API
    handleSignUp = async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
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

            <div className="LoginScreen">
                <div className="houseLogoContainer">
                    <img src="https://github.com/a1rao/HOUSE/blob/master/react-firebase/src/components/NavigationBar/output-onlinepngtools.png?raw=true" alt="our logo" className="houseLogo"/>
                </div>

                <BackGroundImage className="imageContainer" />

                <Login className="login" onSubmit={this.handleSignUp}/>

            </div>

        );
    }
}


export default withRouter(LoginContainer);

