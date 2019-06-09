import React, { Component } from "react";
import { withRouter } from "react-router";

import '../Register/RegisterComponents/RegMain.css';
import Header from './ResetPasswordHeader.js';
import BackGroundImage from './ResetPasswordBackground.js';
import ResetPassword from "./ResetPassword";

/**
 * Render all ResetPassword components (header, logo, background, resetPassword form)
 */
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

            </div>
        );
    }
}

export default withRouter(ResetPasswordContainer);