import React from 'react';
import './registration.css';

class Registration extends React.Component {

    render() {

        return (

            <div className="registrationComponent">
                <form action='action_page.php'>
                    <div className="imgcontainer">
                        <img src="https://i.ibb.co/z4gWyqf/login-icon.png" alt="login-icon" alt="Avatar" className="avatar"/>
                    </div>

                    <div className="centerContainer">

                        <div className="container">
                            <label htmlFor="fname"><b>Enter Your First Name</b></label>
                            <input type="text" placeholder="" name="fname" required/>

                            <label htmlFor="lname"><b>Enter Your Last Name</b></label>
                            <input type="text" placeholder="" name="lname" required/>

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

export default Registration;