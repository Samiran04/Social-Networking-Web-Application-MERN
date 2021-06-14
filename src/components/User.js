import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions/user';
import { APIUrls } from '../helpers/getUrl';
import { addFriendAction, removeFriendAction } from '../actions/friends';

class User extends Component {
  constructor() {
    super();

    this.state = {
      success: false,
      error: '',
      message: '',
    };
  }

  componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;

    const { userId } = params;

    dispatch(getUser(userId));
  }

  checkIfUserIsFriend() {
    const { friends, user } = this.props;

    const userId = user.user.id;

    const index = friends.map((friend) => friend.receiver._id).indexOf(userId);

    if (index !== -1) return true;
    else return false;
  }

  handleAddFriend = async () => {
    const { auth, user } = this.props;

    const email1 = auth.user.email;
    const email2 = user.user.email;

    const url = APIUrls.addFriend(email1, email2);

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    const { dispatch } = this.props;

    if (data.success) {
      this.setState({
        success: true,
        message: 'Your Friend has been added successfully',
      });

      dispatch(addFriendAction(data.data.friend));
    } else {
      this.setState({
        success: false,
        error: data.error,
      });
    }
  };

  handleRemoveFriend = async () => {
    const { auth, user } = this.props;

    const email1 = auth.user.email;
    const email2 = user.user.email;

    const url = APIUrls.removeFriend(email1, email2);

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    const { dispatch } = this.props;

    if (data.success) {
      this.setState({
        success: true,
        message: 'Your Friend has been removed successfully',
      });
      dispatch(removeFriendAction(data.data.friend));
    } else {
      this.setState({
        success: false,
        error: data.error,
      });
    }
  };
  render() {
    const { user, inProgress } = this.props.user;

    const isUserAFriend = this.checkIfUserIsFriend();

    const { success, error, message } = this.state;

    return (
      <div>
        {inProgress && (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
        <div className="settings">
          <div className="img-container">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt="user-dp"
            />
          </div>

          <div className="field">
            <div className="field-label">Email</div>
            <div className="field-value">{user.email}</div>
          </div>

          <div className="field">
            <div className="field-label">name</div>
            <div className="field-value">{user.name}</div>
          </div>

          <div className="btn-grp">
            {!isUserAFriend && (
              <button
                className="button save-btn"
                onClick={() => this.handleAddFriend()}
              >
                Send Request
              </button>
            )}
            {isUserAFriend && (
              <button
                className="button save-btn"
                onClick={() => this.handleRemoveFriend()}
              >
                Remove
              </button>
            )}
          </div>

          {success && <div className="alert success-dailog">{message}</div>}
          {error && <div className="alert error-dailog">{error}</div>}
        </div>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    user: state.user,
    friends: state.friends,
    auth: state.auth,
  };
}

export default connect(mapStatetoProps)(User);
