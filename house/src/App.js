import React from 'react';
import './App.css';
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Login from './components/loginComponent/login';

class App extends React.Component {
  render() {

    return (
        <div className="App">

          <div className="top">
            <Header />
          </div>

          <div className="login">
            <Login />
          </div>

          <div className="bottom">
            <Footer />
          </div>

        </div>
    );

  }
}

export default App;
