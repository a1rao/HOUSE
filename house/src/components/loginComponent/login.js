import React from 'react';
import './login.css';

class Login extends React.Component {

    render() {

        return (

            <form action='action_page.php'>
                        <div className="imgcontainer">
                            <img src="https://i.ibb.co/4mtXX0X/House-logo.png" alt="Avatar" className="avatar"/>
                        </div>

                        <div className="container">
                            <label htmlFor="uname"><b>Username</b></label>
                            <input type="text" placeholder="Enter Username" name="uname" required/>

                                <label htmlFor="psw"><b>Password</b></label>
                                <input type="password" placeholder="Enter Password" name="psw" required/>

                                    <button type="submit">Login</button>

                                <label>
                                    <input type="checkbox" checked="checked" name="remember"/> Remember me
                                </label>
                            <button type="button" className="cancelbtn">Cancel</button>
                            <span className="psw">Forgot <a href="#">password?</a></span>
                        </div>
                </form>
        );
    }
}

export default Login;