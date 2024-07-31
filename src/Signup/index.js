import React from "react";

import { Component } from "react";

import "./index.css";
import Login from "../LoginPage";

class Signup extends Component {
  state = {
    fullNameInput: "",
    showFullNameError: false,
    emailInput: "",
    passwordInput: "",
    showEmailError: false,
    showPasswordError: false,
    isFormSubmitted: false,
  };

  onBlurFullName = () => {
    const isValidFullName = this.validateFullName();
    this.setState({ showFullNameError: !isValidFullName });
  };

  onChangeFullName = (event) => {
    const { target } = event;
    const { value } = target;

    this.setState({ fullNameInput: value });
  };

  renderFullNameField = () => {
    const { showFullNameError, fullNameInput } = this.state;
    const className = showFullNameError
      ? "name-input-field error-field"
      : "name-input-field";

    return (
      <div className="input">
        <label className="input-label2" htmlFor="name">
          Full name
        </label>
        <input
          className={className}
          type="text"
          id="name"
          value={fullNameInput}
          onBlur={this.onBlurFullName}
          onChange={this.onChangeFullName}
          placeholder="Enter your Full name"
        />
      </div>
    );
  };

  onBlurEmail = () => {
    const isValidEmail = this.validateEmail();
    this.setState({ showEmailError: !isValidEmail });
  };

  onChangeEmail = (event) => {
    const { target } = event;
    const { value } = target;
    this.setState({ emailInput: value });
  };

  renderEmailField = () => {
    const { emailInput, showEmailError } = this.state;
    const className = showEmailError
      ? "name-input-field error-field"
      : "name-input-field";

    return (
      <div className="input">
        <label className="input-label2" htmlFor="email">
          Email address
        </label>
        <input
          className={className}
          value={emailInput}
          onChange={this.onChangeEmail}
          onBlur={this.onBlurEmail}
          type="email"
          id="email"
          placeholder="Enter your Email"
        />
      </div>
    );
  };

  onBlurPassword = () => {
    const isValidPassword = this.validatePassword();
    this.setState({ showPasswordError: !isValidPassword });
  };

  onChangePassword = (event) => {
    const { target } = event;
    const { value } = target;
    this.setState({ passwordInput: value });
  };

  renderPasswordField = () => {
    const { passwordInput, showPasswordError } = this.state;
    const className = showPasswordError
      ? "name-input-field error-field"
      : "name-input-field";

    return (
      <div className="input">
        <label className="input-label2" htmlFor="password">
          Password
        </label>
        <input
          className={className}
          value={passwordInput}
          onChange={this.onChangePassword}
          onBlur={this.onBlurPassword}
          type="password"
          id="password"
          placeholder="Enter your Password"
        />
      </div>
    );
  };

  validateFullName = () => {
    const { fullNameInput } = this.state;
    return fullNameInput !== "";
  };

  validateEmail = () => {
    const { emailInput } = this.state;
    return emailInput !== "";
  };

  validatePassword = () => {
    const { passwordInput } = this.state;
    return passwordInput !== "";
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const isValidFullName = this.validateFullName();
    const isValidEmail = this.validateEmail();
    const isValidPassword = this.validatePassword();

    if (isValidFullName && isValidEmail && isValidPassword) {
      this.setState({ isFormSubmitted: true });
    } else {
      this.setState({
        showFullNameError: !isValidFullName,
        showEmailError: !isValidEmail,
        showPasswordError: !isValidPassword,
        isFormSubmitted: false,
      });
    }
  };

  renderSignUpForm = () => {
    const { showEmailError, showFullNameError, showPasswordError } = this.state;

    return (
      <form onSubmit={this.onSubmitForm} className="form-container">
        {this.renderFullNameField()}
        {showFullNameError && <p className="error-message">Required</p>}
        {this.renderEmailField()}
        {showEmailError && <p className="error-message">Required</p>}
        {this.renderPasswordField()}
        {showPasswordError && <p className="error-message">Required</p>}

        <label className="input-label2" htmlFor="company">
          Company
        </label>
        <div>
          <input
            className="input-label"
            type="text"
            id="company"
            placeholder="Enter your company name"
          />
        </div>
        <button type="submit" class="btn btn-success">
          Create your free account
        </button>
        <div className="login">
          <p className="des">
            Already have an account ?
            <button type="submit" class="btn btn-primary">
              Log in
            </button>
          </p>
        </div>
      </form>
    );
  };

  renderSubmissionSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p>Submitted Successfully</p>
      <Login />
    </>
  );
  render() {
    const { isFormSubmitted } = this.state;

    return (
      <div className="registration-form-container">
        <h1 className="heading">Sign Up</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderSignUpForm()}
        </div>
      </div>
    );
  }
}
export default Signup;
