import React, {Component} from 'react';
import './App.css';
import firebase from 'firebase';
import 'firebase/auth';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Register from './components/Register/index.js';
import Login from './components/Login/index.js';
import Home from './components/Home/HomeView';
import HelpPage from './components/Help Page/HelpPage';
import ComparisonPage from './components/Comparison Page/ComparisonPage';
import FolderView from './components/ViewFolder/index.js'
import ResetPassword from './components/ResetPassword/index.js';
import PrivateRoute from './PrivateRoute';
import app from './base';


class App extends Component {

    // Default state when user opens website
    state = {loading:true, authenticated:false, user:null};

    // Check whether user has signed up or not
  componentWillMount() {
      app.auth().onAuthStateChanged(user=> {
          if(user){
              this.setState({authenticated: true, currentUser:user, loading:false});
          } else {
              this.setState({authenticated:false, currentUser:null, loading:false});
          }
      });
  }

    render(){
      const {authenticated, loading} = this.state;
      if(loading){
          return <p>Loading...</p>;
      }

      return (
        // Set page depending on authentication
         <Router >
                <div>
                    <PrivateRoute exact path = '/' component = {Home} authenticated={authenticated}/>
                    <Route exact path = '/login' component = {Login}/>
                    <Route exact path = '/register' component = {Register}/>
                    <Route exact path = '/help' component = {HelpPage} />
                    <Route exact path = '/compare' component = {ComparisonPage} />
                    <Route exact path = '/folderView' component = {FolderView} />
                    <Route exact path = '/resetPassword' component = {ResetPassword} />
                </div>
         </Router>
      );
  }
}

//this.state.authenticated} />

export default App;
