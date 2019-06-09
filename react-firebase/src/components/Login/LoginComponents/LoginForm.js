import React from 'react';
import {Link} from "react-router-dom";
import './LoginForm.css';
import app from "../../../base";


// Sends the email and password to the login event in index.js.
const LoginForm = ({ onSubmit }) => {
        return (

            // Contains the login form components.
            <div className="loginComponent">
                <form onSubmit={onSubmit} className="loginForm">

                    <div className="centerContainerL">

                        <div className="containerL">
                            <label htmlFor="uname" className="labels"><b>Email</b></label>
                            <input type="text" name = "email" placeholder="Enter Valid Email" required pattern="\S+" required className="inputLogin"/>

                            <label htmlFor="psw" className="labels"><b>Password</b></label>
                            <input type="password"  name="password" placeholder="Enter Password"  required className="inputLogin"/>

                            <button type="submit" className="loginButton">Login</button>

                            <span className="createAccount"><a href="/register">Create Account</a></span>
                            <span className="psw"><a href="/resetPassword">Forgot password?</a></span>
                        </div>
                    </div>
                </form>
            </div>

        )
};

export default LoginForm;