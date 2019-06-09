import React, { Component } from "react";
import NavigationBar from '../NavigationBar/NavigationBar';
import './HomeView.css'

class HomeView extends Component {


    render() {

        return (
            <div>

                <NavigationBar />

                <div className="backgroundImageContainer">
                    <img src="https://github.com/a1rao/HOUSE/blob/master/react-firebase/src/components/Home/Background_Fixed_Saturation.jpg?raw=true" alt="a beautiful picture" className="backgroundImage"/>
                </div>



            </div>
        );
    }
}

export default HomeView;
