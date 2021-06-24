import {
  GET_USER_CHAT,
  SUCCESS_USER_CHAT,
  ADD_MESSAGE,
} from '../actions/actionTypes';

const initialUserChatState = {
  messages: [],
  inProgress: false,
};

export default function chat(state = initialUserChatState, action) {
  switch (action.type) {
    case GET_USER_CHAT:
      return {
        ...state,
        inProgress: true,
      };
    case SUCCESS_USER_CHAT:
      return {
        ...state,
        inProgress: false,
        messages: action.messages,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    default:
      return {
        ...state,
      };
  }
}
