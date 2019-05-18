import React from "react";
import './login screen.css';
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Login from './components/loginComponent/login';
import BackGroundImage from './components/backgroundImageComponent/backgroundimage';

class LoginScreen extends React.Component {
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

                <Login className="login"/>

                <div className="bottom">
                    <Footer />
                </div>

            </div>
        );
    }





}

export default LoginScreen;

