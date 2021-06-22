import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Comment } from './index';
import { addComment } from '../actions/comments';
import { connect } from 'react-redux';
import { postLike } from '../actions/posts';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      comment: '',
      flag: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  handleAddComment = (e) => {
    if (e.key === 'Enter') {
      const { comment } = this.state;
      const { dispatch, post, auth } = this.props;

      dispatch(addComment(auth.user.id, post._id, comment));

      this.setState({
        comment: '',
      });
    }
  };

  handleLike = (e) => {
    e.preventDefault();
    const { post, auth, dispatch } = this.props;

    const { logedIn } = auth;

    if (logedIn) {
      dispatch(postLike(auth.user.id, post._id));
    }
  };

  handleOpenComment = (e) => {
    e.preventDefault();

    let { flag } = this.state;

    flag = !flag;

    this.setState({
      flag: flag,
    });
  };
  render() {
    const { post, auth } = this.props;
    const { comment, flag } = this.state;

    const { logedIn } = this.props.auth;

    const user = auth.user;

    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt="user-pic"
            />
            <div>
              {user.email === post.user.email ? (
                <Link to="/settings">
                  <span className="post-author">{post.user.name}</span>
                </Link>
              ) : (
                <Link to={`/users/${post.user._id}`}>
                  <span className="post-author">{post.user.name}</span>
                </Link>
              )}
              <span className="post-time">a minute ago</span>
            </div>
          </div>
          <div className="post-content">{post.content}</div>

          <div className="post-actions">
            <div className="post-like" onClick={this.handleLike}>
              <img
                src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                alt="likes-icon"
              />
              <span>{post.likes.length}</span>
            </div>

            <div
              className="post-comments-icon"
              onClick={this.handleOpenComment}
            >
              <img
                src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          {logedIn && (
            <div className="post-comment-box">
              <input
                placeholder="Start typing a comment"
                onChange={this.handleChange}
                onKeyPress={this.handleAddComment}
                value={comment}
              />
            </div>
          )}

          <div className="post-comments-list">
            {flag &&
              post.comments.map((comment) => (
                <Comment
                  comment={comment}
                  key={comment._id}
                  postId={post._id}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Post);
