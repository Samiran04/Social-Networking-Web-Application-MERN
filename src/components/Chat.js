import React, { Component } from 'react';
import '../chat.css';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { fetchMessages } from '../actions/chat';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // {content: 'some message', self: true}
      typedMessage: '',
    };

    this.socket = io.connect('http://localhost:5000');
    this.userEmail = props.user.email;

    if (this.userEmail) {
      this.setUpConnections();
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchMessages(this.props.roomName));
  }

  setUpConnections = () => {
    const socketConnection = this.socket;
    const self = this;

    this.socket.on('connect', function () {
      console.log('Connection Established');

      socketConnection.emit('join_room', {
        user_email: self.userEmail,
        roomName: self.props.roomName,
      });

      socketConnection.on('user_joined', function (data) {
        console.log('NEW USER JOINED', data);
      });

      socketConnection.on('receive_message', function (data) {
        const { messages } = self.state;

        const messageObject = {};

        messageObject.message = data.message;

        if (data.user_email === self.userEmail) {
          messageObject.self = true;
        } else {
          messageObject.self = false;
        }

        self.setState({
          messages: [...messages, messageObject],
          typedMessage: '',
        });
      });
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { typedMessage } = this.state;
    const self = this;

    this.socket.emit('send_message', {
      roomName: self.props.roomName,
      user_email: self.userEmail,
      message: typedMessage,
    });
  };
  render() {
    const { typedMessage, messages } = this.state;
    const { messages: msg, inProgress } = this.props.chat;

    return (
      <div className="chat-container">
        {inProgress && (
          <div>
            <h2>Loading</h2>
          </div>
        )}
        <div className="chat-header">
          Chat
          <img
            src="https://www.iconsdb.com/icons/preview/white/minus-5-xxl.png"
            alt=""
            height={17}
          />
        </div>
        <div className="chat-messages">
          {msg &&
            msg.map((message) => (
              <div
                className={
                  message.email === this.props.user.email
                    ? 'chat-bubble self-chat'
                    : 'chat-bubble other-chat'
                }
              >
                {message.message}
              </div>
            ))}
          {messages &&
            messages.map((message) => (
              <div
                className={
                  message.self
                    ? 'chat-bubble self-chat'
                    : 'chat-bubble other-chat'
                }
              >
                {message.message}
              </div>
            ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    chat: state.chat,
  };
}

export default connect(mapStateToProps)(Chat);
