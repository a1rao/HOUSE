import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../base";

import LoginView from "../Login/LoginView";

class LoginContainer extends Component {
    handleSignUp = async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            const user = await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            this.props.history.push("/");
        } catch (error) {
            alert(error);
        }
    };

    render() {
        return <LoginView onSubmit={this.handleSignUp} />;
    }
}

export default withRouter(LoginContainer);

/*class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input_user: '',
            input_password: '',
            items: []
        };

        this.firebaseRef = this.props.db.database().ref("userInfo/" + input_user);
        this.firebaseRef.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['.key'] = childSnapshot.key;
                items.push(item);
            });
            this.setState({items});
        });

    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {
        return (
            <div>
                <label>Login</label>
                <br />
                <label>Username</label>
                <input  onChange = {e => this.setState({input_user:e.target.value})} />
                <br />
                <label>Password</label>
                <input type = "password" onChange = {e => this.setState({input_password:e.target.value})} />
                <br />
                <button onClick={this.pushToFirebase.bind(this)}>Register</button>
            </div>
        );
    }
}**/

//export default Login;