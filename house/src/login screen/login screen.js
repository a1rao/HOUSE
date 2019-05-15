import React from 'react';
import './login screen.css';
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Login from './components/loginComponent/login';

class LoginScreen extends React.Component {
  render() {

    return (
        <div className="LoginScreen">

            <Header />

            <Login className="login"/>

          <div className="bottom">
            <Footer />
          </div>

        </div>
    );

  }
}

export default LoginScreen;
