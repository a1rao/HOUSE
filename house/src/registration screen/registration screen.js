import React from 'react';
import './registration screen.css';
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Registration from './components/registrationComponent/registration';
import BackGroundImage from './components/backgroundImageComponent/backgroundimage';

class RegistrationScreen extends React.Component {
  render() {

    return (
        <div className="Registration">

            <div className="top">
                <Header />
            </div>

            <div className="houseLogoContainer">
                <img src="https://i.ibb.co/Gv2WHXK/House-logo-2.png" alt="our logo" className="houseLogo"/>
            </div>

            <BackGroundImage className="imageContainer" />

            <Registration className="registrationScreen"/>

          <div className="bottom">
            <Footer />
          </div>

        </div>
    );

  }
}

export default RegistrationScreen;
