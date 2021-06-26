import { GET_USER_CHAT, ADD_MESSAGE, SUCCESS_USER_CHAT } from './actionTypes';
import { APIUrls } from '../helpers/getUrl';

export function successUserChat(messages) {
  return {
    type: SUCCESS_USER_CHAT,
    messages,
  };
}

export function getUserChat() {
  return {
    type: GET_USER_CHAT,
  };
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message,
  };
}

export function fetchMessages(roomName) {
  const url = APIUrls.chatUrl(roomName);
  return (dispatch) => {
    dispatch(getUserChat());
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(successUserChat(data.data.chat.messages));
        }
      });
  };
}
