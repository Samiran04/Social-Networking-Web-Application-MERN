import React from 'react';
import { ChatListItem } from './';

const ChatList = (props) => {
  const { friends } = props;
  return (
    <div className="chat-list">
      <div className="header">Chat List</div>

      {friends && friends.length === 0 && (
        <div className="no-friends">No friends found!</div>
      )}

      {friends &&
        friends &&
        friends.map((friend) => (
          <ChatListItem friend={friend.receiver} key={friend._id} />
        ))}
    </div>
  );
};

export default ChatList;
