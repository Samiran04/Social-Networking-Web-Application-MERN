import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions/posts';
import { Home, Navbar, Invalid404, SignIn } from './index';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

const SignUp = () => <div>Sign Up</div>;
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getPosts());
  }
  render() {
    const { posts } = this.props;

    //const { posts } = state.getState();

    return (
      <Router>
        <div className="App">
          <header className="App-header"></header>
          <Navbar />
          <ul>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </ul>
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
