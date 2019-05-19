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
                            <input type="text" placeholder="Enter First Name" name="fname" required/>

                            <label htmlFor="lname"><b>Enter Your Last Name</b></label>
                            <input type="text" placeholder="Enter Last Name" name="lname" required/>

                            <label htmlFor="campus"><b>Enter Your College Campus</b></label>
                            <input type="text" placeholder="Enter College Campus" name="campus" required/>

                            <label htmlFor="email"><b>Enter Valid Email Address</b></label>
                            <input type="text" placeholder="Enter Email" name="email" required/>

                            <label htmlFor="pword"><b>Enter Password</b></label>
                            <input type="password" placeholder="Enter Password" name="pword" required/>

                            <label htmlFor="repeatPword"><b>Re-Enter Password</b></label>
                            <input type="password" placeholder="Re-Enter Password" name="repeatPword" required/>

                            <button type="submit">Register</button>

                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default Registration;