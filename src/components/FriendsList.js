import React from 'react';
import { FriendsListItem } from './index';

const FriendsList = (props) => {
  const { friends } = props;

  return (
    <div className="friends-list">
      <div className="header">Friends</div>

      {friends && friends.length === 0 && (
        <div className="no-friends">No friends found!</div>
      )}

      {friends &&
        friends.map((friend) => (
          <FriendsListItem friend={friend.receiver} key={friend._id} />
        ))}
    </div>
  );
};

export default FriendsList;
