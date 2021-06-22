import React, { Component } from 'react';
import { CreatePost, Post } from './index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PostsList extends Component {
  render() {
    const { posts, logedIn } = this.props;

    return (
      <div className="posts-list">
        {logedIn && <CreatePost />}
        {this.props.posts.length > 0 &&
          posts.map((post) => <Post post={post} key={post._id} />)}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    logedIn: state.auth.logedIn,
  };
}

export default connect(mapStateToProps)(PostsList);
