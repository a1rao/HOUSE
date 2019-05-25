import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../base";
import firebase from "firebase";

import './RegisterComponents/RegMain.css';
import Header from './RegisterComponents/RegHeader.js';
import Footer from './RegisterComponents/RegFooter.js';
import Registration from './RegisterComponents/RegForm.js';
import BackGroundImage from './RegisterComponents/RegBackground.js';

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
        return(
            <div className="Registration">

                <div className="top">
                    <Header />
                </div>

                <div className="houseLogoContainer">
                    <img src="https://i.ibb.co/Gv2WHXK/House-logo-2.png" alt="our logo" className="houseLogo"/>
                </div>

                <BackGroundImage className="imageContainer" />s

                <Registration className="registrationScreen" onSubmit={this.handleSignUp}/>

                <div className="bottom">
                    <Footer />
                </div>

            </div>
        );
    }
}

export default withRouter(RegisterContainer);