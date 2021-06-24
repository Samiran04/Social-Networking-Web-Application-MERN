import React, { Component } from 'react';
import { PostsList } from './index';
import { FriendsList, Chat, ChatList } from './index';

class Home extends Component {
  render() {
    const { posts, friends, logedIn } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
        <div className="chat-friends-wrapper">
          {logedIn && <FriendsList friends={friends} />}
          {logedIn && <ChatList friends={friends} />}
        </div>
      </div>
    );
  }
}

export default Home;
