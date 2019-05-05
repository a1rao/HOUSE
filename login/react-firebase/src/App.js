import React, {Component} from 'react';
import './App.css';
//import * as firebase from "firebase/app";
import firebase from 'firebase';

import Register from "./components/Register";
import Login from "./components/Login";

class App extends Component {
  constructor(props){
    super(props);

    // Initialize Firebase
    var firebaseConfig = {
      apiKey: "AIzaSyDNBMO0XY7lFl9vye30nmh8MNiyuo5lSZQ",
      authDomain: "houseapp-62b1b.firebaseapp.com",
      databaseURL: "https://houseapp-62b1b.firebaseio.com",
      projectId: "houseapp-62b1b",
      storageBucket: "houseapp-62b1b.appspot.com",
      messagingSenderId: "310216559573",
      appId: "1:310216559573:web:c64f960484dc297b"
    };

    //var database  = firebase.database();
    firebase.initializeApp(firebaseConfig);
  }

  render(){
    return (
        <div>
          <Register db={firebase}/>
          <Login db={firebase}/>
        </div>
    );
  }
}

export default App;
