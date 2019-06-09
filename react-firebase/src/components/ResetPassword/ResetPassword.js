import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import app from "../../base";
import "../Login/LoginComponents/LoginBackground.css"

/**
 * Handle reset password
 */
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };

    }

    /** Use Authentication API to send reset password email to user's email
     */
    sendEmail = async event => {
        event.preventDefault();
        this.props.history.push("/");
        app.auth().sendPasswordResetEmail(this.state.email)
            .then(function (user) {
                alert('Please check your email...')
            }).catch(function (e) {
                console.log(e)
            });
    };

    setEmail = async event => {
        this.setState({email:event.target.value});
    };

    render() {
        return (

            <div className="loginComponent">
                <form className="loginForm">

                    <div className="centerContainerL">

                        <div className="containerL">
                            <label htmlFor="uname"><b>Enter Email</b></label>
                            <input type="text" name = "email" placeholder="Enter Valid Email" onChange={this.setEmail}
                                   required className="inputLogin"/>

                            <button type="submit" className="loginButton" onClick={this.sendEmail}>Send Email</button>
                        </div>
                    </div>
                </form>
            </div>

        );
    };
}

export default withRouter(ResetPassword)