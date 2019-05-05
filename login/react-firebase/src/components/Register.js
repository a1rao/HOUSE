import React, {Component} from 'react';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            username:''
        };
        this.firebaseRef = this.props.db.database().ref("userInfo");
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    pushToFirebase(event) {
        const {email, password, username} = this.state;
        const userID = 12345;
        event.preventDefault();
        this.firebaseRef.child(username).set({email, password, username});
            /*email: this.state.email,
            password: this.state.password,
            username: this.state.username
        });*/
        this.setState({email: '', password: '', username:''});
    }

    render(){
        return(
            <div>
                <label>Email</label>
                <input onChange = {e => this.setState({email:e.target.value})} />
                <br />
                <label>Password</label>
                <input type = "password" onChange = {e => this.setState({password:e.target.value})} />
                <br />
                <label>Username</label>
                <input onChange = {e => this.setState({username:e.target.value})} />
                <br />
                <button onClick={this.pushToFirebase.bind(this)}>Register</button>
            </div>
        );
    }
}

export default Register;