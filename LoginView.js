import React from 'react';
import {Link} from "react-router-dom";
import './LoginStyle.css';

const LoginView = ({ onSubmit }) => {
    //render() {

        return (

            <div className="loginComponent">
                <form onSubmit={onSubmit} >
                    <div className="imgcontainer">
                        <img src="https://i.ibb.co/z4gWyqf/login-icon.png" alt="login-icon" alt="Avatar" className="avatar"/>
                    </div>

                    <div className="centerContainer">

                        <div className="container">
                            <label htmlFor="uname"><b>Email</b></label>
                            <input type="email" name="email" placeholder="Enter Valid Email"  required/>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password"  name="password" placeholder="Enter Password"  required/>

                            <button type="submit">Login</button>

                            <div className="wrapRButton">
                                <a href="/register" className="rButton"> New User? </a>

                            </div>

                            <span className="psw">Forgot <a href="#">password?</a></span>
                        </div>
                    </div>
                </form>
            </div>

        )
};


export default LoginView;