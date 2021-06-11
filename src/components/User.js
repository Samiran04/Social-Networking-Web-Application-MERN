import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions/user';

class User extends Component {
  componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;

    const { userId } = params;

    dispatch(getUser(userId));
  }
  render() {
    const { user, inProgress } = this.props.user;

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
            <button
              className="button save-btn"
              onClick={() => this.handleChange('editMode', true)}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStatetoProps)(User);
