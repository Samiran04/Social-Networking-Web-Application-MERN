import {
  GET_USER,
  GET_USER_FAILED,
  GET_USER_LOADING,
} from '../actions/actionTypes';

const initialUserState = {
  user: {},
  inProgress: false,
  error: null,
  success: null,
};

export default function user(state = initialUserState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
        error: null,
        inProgress: false,
        success: true,
      };
    case GET_USER_LOADING:
      return {
        ...state,
        error: null,
        inProgress: true,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
        success: null,
      };
    default:
      return {
        ...state,
      };
  }
}
