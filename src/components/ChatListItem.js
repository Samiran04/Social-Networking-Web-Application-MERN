import React from 'react';
import { connect } from 'react-redux';
import { getRoomName } from '../helpers/utils';
import { Chat } from './index';

class ChatListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      flag: false,
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    let { flag } = this.state;

    flag = !flag;

    this.setState({
      flag: flag,
    });
  };
  render() {
    const { flag } = this.state;
    return (
      <div>
        <div className="friends-item" onClick={this.handleClick}>
          <div className="friends-img">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt="user-pic"
            />
          </div>
          <div className="friends-name">{this.props.friend.email}</div>
        </div>
        {flag && (
          <Chat
            roomName={getRoomName(
              this.props.friend.email,
              this.props.user.email
            )}
          />
        )}
      </div>
    );
  }
}

function mapStoreToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStoreToProps)(ChatListItem);
