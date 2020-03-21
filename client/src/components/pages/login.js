import React, { Component } from "react";
import API from "../../utils/API";
import "./login.css"
import SignupModal from "../signupmodal";

class Login extends Component {

    state = {
        email: "",
        password: "",
        modalShow: false,
        new_email: "",
        new_password: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    newUser = (event) => {
        event.preventDefault();

        const newUser = {
            email: this.state.new_email,
            password: this.state.new_password
        }
        if (!newUser.email || !newUser.password) {
            return;
        }
        this.newUserSubmit(newUser)
        this.setState({
            new_email: "",
            new_password: ""
        });
    }

    newUserSubmit = (newUser) => {
        console.log("attempting to create new user")
        API.createUser({
            email: newUser.email,
            password: newUser.password
        })
            .then(res => {
                console.log("new user created!")
                window.location.replace("/manage");
            })
            .catch(err => console.log(err));
    }

    submitLogin = (event) => {
        event.preventDefault();
        const loginInfo = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(loginInfo)
        if (!loginInfo.email || !loginInfo.password) {
            return;
        }
        this.loginUser(loginInfo)
        this.setState({
            email: "",
            password: ""
        });

    }

    showModal = () => {
        this.setState({
            modalShow: true
        })
    }

    hideModal = () => {
        this.setState({
            modalShow: false
        })
    }

    loginUser = (info) => {
        console.log("this still works")
        API.loginUser({
            email: info.email,
            password: info.password
        })
            .then(res => {
                window.location.replace("/manage")
            })
            .catch(err => console.log(err));
    }

    getModal() {
        return (
            <div className="col-md-12">
                <button className="btn-sign" onClick={this.showModal}>Signup</button>
                <SignupModal
                    onChange={this.handleInputChange}
                    show={this.state.modalShow}
                    onHide={this.hideModal}
                    onClick={this.newUser}
                />
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form className="login-form">
                            <h1 className="lbl-login">Login</h1>
                            <label className="lbl-user">Email</label><br></br>
                            <input className="inp-un" type="text" name="email" value={this.state.email} onChange={this.handleInputChange}></input><br></br>
                            <label className="lbl-pw">Password</label><br></br>
                            <input className="inp-pw" type="text" name="password" value={this.state.password} onChange={this.handleInputChange}></input>
                            <button className="btn-login" onClick={this.submitLogin}>Login</button>
                            <h4 className="lbl-cont">Please contact admin for credentials</h4>
                        </form>
                        <div className="row">
                            <div className="col-md-12 text-center">
                                {this.getModal()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        );
    }

}

export default Login;
