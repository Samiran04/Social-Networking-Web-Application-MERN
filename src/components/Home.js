import React, { Component } from 'react';
import { PostsList } from './index';
import { FriendsList } from './index';

class Home extends Component {
  render() {
    const { posts, friends } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
        <FriendsList friends={friends} />
      </div>
    );
  }
}

export default Home;
