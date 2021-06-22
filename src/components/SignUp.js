import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      password: '',
      confirm_password: '',
    };
  }

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

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleCPasswordChange = (e) => {
    this.setState({
      confirm_password: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;

    const { name, email, password, confirm_password } = this.state;

    dispatch(signup(name, email, password, confirm_password));
  };
  render() {
    const { inProgress, error, logedIn, signup } = this.props.auth; //Modify It

    const { from } = this.props.location.state || {
      from: { pathname: '/sign-in' },
    };

    if (logedIn) {
      return <Redirect to="/" />;
    } else if (signup) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <form className="login-form">
          <span className="login-signup-header">Sign Up</span>
          <div className="field">
            <input
              type="text"
              placeholder="Name"
              required
              onChange={this.handleNameChange}
            />
          </div>
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
          <div className="field">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              onChange={this.handleCPasswordChange}
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
              <button onClick={this.handleFormSubmit}>Sign Up</button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SignUp);
