import React from 'react';
import './LoginForm.css';

/** Front end for login form
 */
const LoginForm = ({ onSubmit }) => {
        return (

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