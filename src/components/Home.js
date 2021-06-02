import React, { Component } from 'react';
import { PostsList } from './index';

class Home extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div>
        <PostsList posts={posts.state} />
      </div>
    );
  }
}

export default Home;
