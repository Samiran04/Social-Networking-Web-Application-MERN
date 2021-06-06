import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

class Navbar extends Component {
  constructor() {
    super();
  }

  HandleLogOut = () => {
    localStorage.removeItem('token');

    this.props.dispatch(logout());
  };
  render() {
    const { logedIn, user } = this.props.auth;

    return (
      <div>
        <nav className="nav">
          <div className="left-div">
            <Link to="/">
              <img
                src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="search-container">
            <img
              className="search-icon"
              src="https://image.flaticon.com/icons/svg/483/483356.svg"
              alt="search-icon"
            />
            <input placeholder="Search" />

            <div className="search-results">
              <ul>
                <li className="search-results-row">
                  <img
                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                    alt="user-dp"
                  />
                  <span>John Doe</span>
                </li>
                <li className="search-results-row">
                  <img
                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                    alt="user-dp"
                  />
                  <span>John Doe</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="right-nav">
            {logedIn && (
              <div className="user">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                  id="user-dp"
                />
                <span>{user.name}</span>
              </div>
            )}
            <div className="nav-links">
              <ul>
                {!logedIn && (
                  <li>
                    <Link to="/sign-in">Log in</Link>
                  </li>
                )}
                {!logedIn && (
                  <li>
                    <Link to="/sign-up">Register</Link>
                  </li>
                )}
                {logedIn && (
                  <li onClick={() => this.HandleLogOut()}>Log Out</li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateTOProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateTOProps)(Navbar);
