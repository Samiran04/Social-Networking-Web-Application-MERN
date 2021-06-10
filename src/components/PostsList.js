import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { User } from './index';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

const PrivateUserRoute = (PrivateRouteProps) => {
  const { logedIn, component: Component, path, id } = PrivateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return logedIn ? (
          <Component {...props} id={id} />
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

class PostsList extends Component {
  render() {
    const posts = this.props.posts.state;

    return (
      <Router>
        <div className="posts-list">
          {this.props.posts.state.length > 0 &&
            posts.map((post) => (
              <div className="post-wrapper" key={post._id}>
                <div className="post-header">
                  <div className="post-avatar">
                    <img
                      src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                      alt="user-pic"
                    />
                    <div>
                      <Switch>
                        <PrivateUserRoute
                          logedIn={true}
                          component={User}
                          path="/users"
                          id={post.user._id}
                        />
                      </Switch>
                      <Link to="/users">
                        <span className="post-author">{post.user.name}</span>
                      </Link>
                      <span className="post-time">a minute ago</span>
                    </div>
                  </div>
                  <div className="post-content">{post.content}</div>

                  <div className="post-actions">
                    <div className="post-like">
                      <img
                        src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                        alt="likes-icon"
                      />
                      <span>{post.likes.length}</span>
                    </div>

                    <div className="post-comments-icon">
                      <img
                        src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                        alt="comments-icon"
                      />
                      <span>{post.comments.length}</span>
                    </div>
                  </div>
                  <div className="post-comment-box">
                    <input placeholder="Start typing a comment" />
                  </div>

                  <div className="post-comments-list">
                    <div className="post-comments-item">
                      <div className="post-comment-header">
                        <span className="post-comment-author">Bill</span>
                        <span className="post-comment-time">a minute ago</span>
                        <span className="post-comment-likes">22</span>
                      </div>

                      <div className="post-comment-content">Random comment</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Router>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
