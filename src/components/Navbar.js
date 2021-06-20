import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { searchResultSuccess } from '../actions/search';

class Navbar extends Component {
  constructor() {
    super();
  }

  HandleLogOut = () => {
    localStorage.removeItem('token');

    this.props.dispatch(logout());
  };

  handleSearch = (e) => {
    const name = e.target.value;

    if (name) {
      this.props.dispatch(searchResultSuccess(name));
    }
  };
  render() {
    const { logedIn, user } = this.props.auth;
    const { results } = this.props;

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
            <input placeholder="Search" onChange={this.handleSearch} />
            {results.length && (
              <div className="search-results">
                <ul>
                  {results.map((user) => (
                    <li className="search-results-row" key={user._id}>
                      <Link to={`/users/${user._id}`}>
                        <img
                          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                          alt="user-dp"
                        />
                      </Link>
                      <span>{user.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="right-nav">
            {logedIn && (
              <div className="user">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                  id="user-dp"
                />
                <Link to="/settings">
                  <span>{user.name}</span>
                </Link>
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
    results: state.search.results,
  };
}

export default connect(mapStateTOProps)(Navbar);
