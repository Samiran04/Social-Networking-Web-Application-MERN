import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions/posts';
import { Home, Navbar, Invalid404, SignIn, SignUp } from './index';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { authenticate } from '../actions/auth';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getPosts());

    const token = localStorage.getItem('token');

    if (token) {
      const user = jwt_decode(token);
      this.props.dispatch(
        authenticate({
          name: user.name,
          id: user._id,
          email: user.email,
        })
      );
    }
  }
  render() {
    const { posts } = this.props;

    //const { posts } = state.getState();

    return (
      <Router>
        <div className="App">
          <header className="App-header"></header>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            ></Route>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route component={Invalid404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStoreToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStoreToProps)(App);
