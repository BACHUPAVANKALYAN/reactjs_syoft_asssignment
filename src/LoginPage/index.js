import React from "react";
import { Component } from "react";
import { Route } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "../Home";

import "./index.css";

class Login extends Component {
  state = {
    userPassword: "",
    userEmail: "",
    errorMsg: "",
    errorOccurred: false,
  };

  onChangeUserEmail = (event) => {
    this.setState({ userEmail: event.target.value });
  };

  onChangeUserPassword = (event) => {
    this.setState({ userPassword: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/home",
    });
    history.replace("/home");
  };

  onSubmitFail = (err) => {
    this.setState({ errorMsg: err, errorOccurred: true });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { userEmail, userPassword } = this.state;
    const userDetails = { userEmail, userPassword };
    const url = "https://syoft.dev/Api/userlogin/api/userlogin";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
      <Home />;
    } else {
      console.log(data);
      this.onSubmitFail(data.error_msg);
    }
  };
  render() {
    const { userEmail, userPassword, errorOccurred, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === true) {
      return <Route to="/home" />;
    }

    return (
      <div className="signUp-container">
        <h1 className="heading">Login</h1>
        <form className="form" onSubmit={this.onSubmitForm}>
          <label className="form-label" htmlFor="name">
            USER EMAIL
          </label>
          <br />
          <input
            className="form-input"
            type="text"
            value={userEmail}
            onChange={this.onChangeUserEmail}
            id="name"
            placeholder="Enter your Email"
          />
          <br />
          <br />
          <label className="form-label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            className="form-input"
            type="password"
            value={userPassword}
            onChange={this.onChangeUserPassword}
            id="password"
            placeholder="Enter your Password"
          />
          <br />
          <br />
          <button className="form-submit-button" type="submit">
            Login
          </button>
          {errorOccurred && <p className="err">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}
export default Login;
