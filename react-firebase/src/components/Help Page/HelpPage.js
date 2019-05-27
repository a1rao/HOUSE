import React, {Component} from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './HelpPage.css';
import '../NavigationBar/NavigationBar.js';
import NavigationBar from "../NavigationBar/NavigationBar";

class HelpPage extends Component {
    render() {
        return (
            <div>
                <NavigationBar />

                <Jumbotron>
                        <h1 className="helpHeader">Help Page</h1>
                </Jumbotron>

                <p>
                    Hello, you must be Gary. I see you have navigated
                    to the help page.
                </p>
            </div>

        );
    }

}

export default HelpPage;