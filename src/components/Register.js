import React, { Component } from 'react';

let GRAPHQL_URL = 'http://localhost:5000';

class Register extends Component {
    constructor() {
        super();
        this.state = {name: '', username: '', password1: '', password2: '', email: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var self = this;

        if(self.state.password1 !== self.state.password2) {
            this.setState({errormessage: 'Passwords do not match'});
            return;
        }

        console.log(self.state.name);
        console.log(self.state.username);
        console.log(self.state.password1);
        console.log(self.state.email);

        this.sendRegistrationData(
            self.state.name,
            self.state.username, 
            self.state.email,
            self.state.password1
        ).then(res => {
            return res;
        });
                
    }

    changeHandler = (e)=> {
        let name = e.target.name;
        let val = e.target.value; 

        this.setState({[name]: val});
    } 

    sendRegistrationData = async (name, un, email, pw) => {
        let query = `mutation register($name: String!, $un: String!, $email: String!, $pw: String!) {
            register(name: $name, un: $un, email: $email, pw: $pw)
        }`;

        let response = await fetch(GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables: {name, un, email, pw}
            })
        });
        let r = await response.json();
        return r;
    }   

    render() {
        return (
            <div className="container" id="LoginFields">
                <div className="row">
                    <div className="col-md-12">
                        <h4>REGISTER FOR MY SITE</h4>
                    </div>
                </div>
                <div className='RegisterBackground'>
                <form>
                    <input
                        id='register'
                        type='text'
                        placeholder='name'
                        name='name'
                        onChange={this.changeHandler}
                    />
                    <br />
                    <input
                        id='register'
                        type='text'
                        placeholder='username'
                        name='username'
                        onChange={this.changeHandler}
                    />
                    <br/>
                     <input
                        id='register'
                        type='text'
                        placeholder = 'Email'
                        name='email'
                        onChange={this.changeHandler}
                    />
                    <br />         
                    <input
                        id='register'
                        type='text'
                        name='password1'
                        placeholder = 'Enter password'
                        onChange={this.changeHandler}
                    />
                    <br />
                    <input
                        id='register'
                        type='text'
                        placeholder = 'Re-enter password'
                        name='password2'
                        onChange={this.changeHandler}
                    />
                    {this.state.errormessage}
                    <br />                              
                </form>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Register</button>
                    </div>
                    <div className="col-md-2">
                        <a className="nav-link" href="/">Back to Login<span className="sr-only">(current)</span></a>
                    </div>
                </div>           
            </div>
        );
    }
}

export default Register;