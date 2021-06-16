import React, { Component } from 'react';
import { CreatePost, Post } from './index';
import PropTypes from 'prop-types';

class PostsList extends Component {
  render() {
    const { posts } = this.props;

    return (
      <div className="posts-list">
        <CreatePost />
        {this.props.posts.length > 0 &&
          posts.map((post) => <Post post={post} key={post._id} />)}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
