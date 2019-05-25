import React from 'react';
import {Link} from "react-router-dom";
import './LoginForm.css';

const LoginForm = ({ onSubmit }) => {
    //render() {

        return (

            <div className="loginComponent">
                <form onSubmit={onSubmit} className="loginForm">
                    <div className="imgcontainer">
                        <img src="https://i.ibb.co/z4gWyqf/login-icon.png" alt="login-icon"  className="avatar"/>
                    </div>

                    <div className="centerContainer">

                        <div className="container">
                            <label htmlFor="uname"><b>Email</b></label>
                            <input type="text" name = "email" placeholder="Enter Valid Email"  required className="inputLogin"/>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password"  name="password" placeholder="Enter Password"  required className="inputLogin"/>

                            <button type="submit" className="loginButton">Login</button>

                            <div className="wrapRButton">
                                <a href="/register" className="rButton"> New User? </a>

                            </div>

                            <span className="psw">Forgot <a href="#">password?</a></span>
                        </div>
                    </div>
                </form>
            </div>

        )
};/*
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                </label>
                <label>
                    Password
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                </label>
                <button type="submit">Login</button>
            </form>
            <h4> Don't have an account? <Link to='/register'> Register now</Link></h4>
        </div>
    );
};*/




export default LoginForm;