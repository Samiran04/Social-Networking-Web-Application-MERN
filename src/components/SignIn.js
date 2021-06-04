import { func } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      password: '',
      email: '',
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;

    const { email, password } = this.state;

    console.log(email);
    console.log(password);

    dispatch(login(email, password));
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  render() {
    const { inProgress, error } = this.props.auth;
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={this.handlePasswordChange}
          />
        </div>
        {inProgress ? (
          <div className="field">
            <button onClick={this.handleFormSubmit} disabled>
              Loading...
            </button>
          </div>
        ) : (
          <div className="field">
            <button onClick={this.handleFormSubmit}>Log In</button>
          </div>
        )}
      </form>
    );
  }
}

function mapStateTOProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateTOProps)(SignIn);
