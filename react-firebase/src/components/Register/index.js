import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../base";

import RegisterView from "./RegisterView";

class RegisterContainer extends Component {
    handleSignUp = async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            const user = await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            this.props.history.push("/");
        } catch (error) {
            alert(error);
        }
    };

    render() {
        return <RegisterView onSubmit={this.handleSignUp} />;
    }
}

export default withRouter(RegisterContainer);