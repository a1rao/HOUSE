import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../base";

import './LoginComponents/LoginMain.css';
import Header from './LoginComponents/LoginHeader.js';
import Footer from './LoginComponents/LoginFooter.js';
import Login from './LoginComponents/LoginForm.js';
import BackGroundImage from './LoginComponents/LoginBackground.js';


class LoginContainer extends Component {
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
    };

    render() {

        return (

            <div className="LoginScreen">

                <div className="top">
                    <Header />
                </div>

                <div className="houseLogoContainer">
                    <img src="https://i.ibb.co/Gv2WHXK/House-logo-2.png" alt="our logo" className="houseLogo"/>
                </div>

                <BackGroundImage className="imageContainer" />

                <Login className="login" onSubmit={this.handleSignUp}/>

                <div className="bottom">
                    <Footer />
                </div>

            </div>

        );
    }
}

export default withRouter(LoginContainer);

