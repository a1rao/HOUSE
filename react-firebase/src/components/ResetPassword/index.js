import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../base";
import firebase from "firebase";

import '../Register/RegisterComponents/RegMain.css';
import Header from './ResetPasswordHeader.js';
import Footer from './ResetPasswordFooter.js';
import BackGroundImage from './ResetPasswordBackground.js';
import ResetPassword from "./ResetPassword";

class ResetPasswordContainer extends Component {

    render() {
        return(
            <div className="Registration">

                <div className="top">
                    <Header />
                </div>

                <div className="houseLogoContainer">
                    <img src="https://i.ibb.co/Gv2WHXK/House-logo-2.png" alt="our logo" className="houseLogo"/>
                </div>

                <BackGroundImage className="imageContainer" />

                <ResetPassword/>

                <div className="bottom">
                    <Footer />
                </div>

            </div>
        );
        //return <RegForm onSubmit={this.handleSignUp} />;
    }
}

export default withRouter(ResetPasswordContainer);