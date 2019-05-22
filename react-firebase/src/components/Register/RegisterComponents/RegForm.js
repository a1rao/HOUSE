import React from 'react';
import "./RegForm.css"

const RegForm = ({ onSubmit }) => {
    return (
        <div className="registrationComponent">
            <form onSubmit={onSubmit}>
                <div className="imgcontainer">
                    <img src="https://i.ibb.co/z4gWyqf/login-icon.png" alt="login-icon"  className="avatar"/>
                </div>

                <div className="centerContainer">

                    <div className="container">
                        <label htmlFor="fname"><b>Enter Your First Name</b></label>
                        <input type="text" name="fname"  placeholder="Enter First Name" required/>

                        <label htmlFor="lname"><b>Enter Your Last Name</b></label>
                        <input type="text" name="lname" placeholder="Enter Last Name" required/>

                        <label htmlFor="campus"><b>Enter Your College Campus</b></label>
                        <input type="text" name="campus" placeholder="Enter College Campus" required/>

                        <label htmlFor="email"><b>Enter Valid Email Address</b></label>
                        <input type="text" name="email" placeholder="Enter Email"  required/>

                        <label htmlFor="pword"><b>Enter Password</b></label>
                        <input type="password" name="password" placeholder="Enter Password"  required/>

                        <label htmlFor="repeatPword"><b>Re-Enter Password</b></label>
                        <input type="password" name="password2" placeholder="Re-Enter Password"  required/>

                        <button type="submit">Register</button>

                    </div>
                </div>
            </form>
        </div>

    );
};


/*<div>
    <h1>Register</h1>
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
        <button type="submit">Register</button>
    </form>
</div>*/


export default RegForm;