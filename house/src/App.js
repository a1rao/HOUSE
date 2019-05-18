import React from 'react';
import './App.css';
import LoginScreen from './login screen/login screen';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Route from 'react-router-dom/Route';
import RegistrationScreen from "./registration screen/registration screen";


class App extends React.Component {
  render() {

    return (

        <div className="houseApp">

            <Router>

                <Route path="/login" exact={true} render={ /*Login window.*/
                    () => {
                        return(
                            <div className="LS">
                                <LoginScreen/>
                            </div>
                        );
                    }
                }>

                </Route>

                <Route path="/register" exact={true} render={ /*Register window.*/
                    () => {
                        return(
                            <div className="RS">
                                <RegistrationScreen/>
                            </div>
                        );
                    }
                }>

                </Route>

            </Router>

        </div>
   );

  }
}

export default App;
