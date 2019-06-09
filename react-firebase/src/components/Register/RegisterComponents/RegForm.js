import React from 'react';
import "./RegForm.css"

/** Take user input needed for registration */
const RegForm = ({ onSubmit }) => {
    return (
        <div className="registrationComponent">
            <form onSubmit={onSubmit} className="registerForm">


                <div className="centerContainer">

                    <div className="container">
                        <label htmlFor="fname" className="labels"><b>First Name</b></label>
                        <input type="text" name="fname"  placeholder="Enter First Name" required className="inputRegister"/>

                        <label htmlFor="lname" className="labels"><b>Last Name</b></label>
                        <input type="text" name="lname" placeholder="Enter Last Name" required className="inputRegister"/>

                        <label htmlFor="campus" className="labels"><b>College Campus</b></label>
                        <input type="text" name="campus" placeholder="Enter College Campus" required className="inputRegister"/>

                        <label htmlFor="email" className="labels"><b>Email Address</b></label>
                        <input type="text" name="email" placeholder="Enter Email"  required className="inputRegister"/>

                        <label htmlFor="pword" className="labels"><b>Password</b></label>
                        <input type="password" name="password" placeholder="Enter Password"  required className="inputRegister"/>

                        <label htmlFor="repeatPword" className="labels"><b>Re-Enter Password</b></label>
                        <input type="password" name="password2" placeholder="Re-Enter Password"  required className="inputRegister"/>

                        <button type="" className="placeholderButton"></button>

                        <button type="submit" className="registerButton">Register</button>

                    </div>
                </div>
            </form>
        </div>

    );
};


export default RegForm;