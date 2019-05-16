import React from 'react';
import './login.css';

class Login extends React.Component {

    render() {

        return (

            <div className="loginComponent">
                <form action='action_page.php'>
                    <div className="imgcontainer">
                        <img src="https://i.ibb.co/z4gWyqf/login-icon.png" alt="login-icon" alt="Avatar" className="avatar"/>
                    </div>

                    <div className="centerContainer">

                        <div className="container">
                            <label htmlFor="uname"><b>Email</b></label>
                            <input type="text" placeholder="Enter Valid Email" name="uname" required/>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="psw" required/>

                            <button type="submit">Login</button>

                            <button type="button" className="cancelbtn">New User?</button>
                            <span className="psw">Forgot <a href="#">password?</a></span>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default Login;