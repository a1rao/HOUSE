import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.firebaseRef = this.props.db.database().ref("userInfo");
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
                <input  onChange = {e => this.setState({password:e.target.value})} />
                <br />
                <label>Username</label>
                <input type = "password" onChange = {e => this.setState({username:e.target.value})} />
                <br />
                <button onClick={this.pushToFirebase.bind(this)}>Register</button>
            </div>
        );
    }
}

export default Login;