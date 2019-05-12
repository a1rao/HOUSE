import React, {Component} from 'react';
import './App.css';
import firebase from 'firebase';
import 'firebase/auth';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Register from './components/Register/index.js';
import Login from './components/Login/index.js';
import Home from './components/Home';
import PrivateRoute from './PrivateRoute';
import app from './base';


class App extends Component {

    state = {loading:true, authenticated:false, user:null};

  componentWillMount() {
      app.auth().onAuthStateChanged(user=> {
          if(user){
              //console.log("user is logged in");
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
      /*if(!this.state.currentUser){
          return <h1>yes user</h1>;
      }*/
      return (
          /*<div>
            <RegisterView db={firebase}/>
             <Login db={firebase}/>
            </div>*/
         <Router>
                <div>
                    <PrivateRoute exact path = '/' component = {Home} authenticated={authenticated} />
                    <Route exact path = '/login' component = {Login}/>
                    <Route exact path = '/register' component = {Register}/>
                </div>
         </Router>
      );
  }
}

export default App;
