import React, { Component } from 'react';
import { PostsList } from './index';
import { FriendsList, Chat } from './index';

class Home extends Component {
  render() {
    const { posts, friends, logedIn } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
        {logedIn && <FriendsList friends={friends} />}
        {logedIn && <Chat />}
      </div>
    );
  }
}

export default Home;
