import {
  LOGIN_SUCCESS,
  LOGIN_START,
  LOGIN_FAILED,
} from '../actions/actionTypes';

const initialAuthState = {
  user: {},
  inProgress: false,
  error: null,
  logedIn: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        inProgress: false,
        user: action.user,
        logedIn: true,
        error: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    default:
      return state;
  }
}
