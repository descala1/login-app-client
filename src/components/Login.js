import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';

let GRAPHQL_URL = 'http://localhost:5000';

class Login extends Component {
    constructor() {
        super();
        this.state = {username: '', password: '', redirect: '/'};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        var self = this;

        console.log(self.state.username);
        console.log(self.state.password);

        let res = await this.sendLoginData(self.state.username, self.state.password);
        if(res === "SUCCESS") {
            this.setState({ redirect: "/home" });            
        }else {
            this.error();
        }
    }

    error = () => {
        toast.error("Login attempt failed.");
    }

    sendLoginData = async (un, pw) => {
        let query = `query login($un: String!, $pw: String!) {
            login(un: $un, pw: $pw)
        }`;

        let response = await fetch(GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables: {un, pw}
            })
        });
        let r = await response.json();
        return r.data.login;
    } 

    unChange = (e) => {
        this.setState({ username: e.target.value });
    }

    pwChange = (e) => {
        this.setState({ password: e.target.value });
    }

    // renderLogin = () => {
    //     if(this.state.entry){            
    //         return <div className="row"><h2>You Are Logged In</h2><a href="/">Logout</a></div>
    //     }else {
    //         console.log("Login Attempt Failed.");
    //     } 
    // }

    //{ this.renderLogin() }

    render() {
        if(this.state.redirect === '/home') {
            return <Redirect to={this.state.redirect} />
        }
        return (                  
            <div className="container" id="LoginFields">
                <ToastContainer position="top-center" toastClassName="warning" />
                <div className="row">
                    <div className="col-md-12">
                        <h4>LOGIN TO MY SITE</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 .offset-md-4 justify-content-center">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Username</span>
                            </div>
                            <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" username={this.state.username} onChange={this.unChange}></input>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 .offset-md-4 justify-content-center">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                            </div>
                            <input type="password" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" password={this.state.password} onChange={this.pwChange}></input>
                        </div>                        
                    </div>                                   
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Login</button>
                    </div>
                    <div className="col-md-2">
                        <a className="nav-link" href="/register">Register<span className="sr-only">(current)</span></a>
                    </div>
                </div>                   
            </div>
        );
    }
}

export default Login;