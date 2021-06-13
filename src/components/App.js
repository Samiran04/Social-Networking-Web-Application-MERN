import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions/posts';
import { getFreinds } from '../actions/friends';
import {
  Home,
  Navbar,
  Invalid404,
  SignIn,
  SignUp,
  Settings,
  User,
} from './index';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { authenticate } from '../actions/auth';

const PrivateRoute = (PrivateRouteProps) => {
  const { logedIn, component: Component, path } = PrivateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return logedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getPosts());

    const token = localStorage.getItem('token');

    if (token) {
      const user = jwt_decode(token);

      this.props.dispatch(getFreinds(user.friends));

      this.props.dispatch(
        authenticate({
          name: user.name,
          id: user._id,
          email: user.email,
          password: user.password,
        })
      );
    }
  }
  render() {
    const { posts, auth, friends } = this.props;
    const { logedIn } = auth;

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
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    logedIn={logedIn}
                  />
                );
              }}
            />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <PrivateRoute
              logedIn={logedIn}
              component={Settings}
              path="/settings"
            />
            <PrivateRoute
              logedIn={logedIn}
              component={User}
              path="/users/:userId"
            />
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
    auth: state.auth,
    friends: state.friends,
  };
}

export default connect(mapStoreToProps)(App);
