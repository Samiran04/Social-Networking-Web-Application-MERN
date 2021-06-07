import {
  LOGIN_SUCCESS,
  LOGIN_START,
  LOGIN_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTHENTICATED_USER,
  LOG_OUT,
  REMOVE_ERROR,
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
    case SIGNUP_START:
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
    case SIGNUP_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        inProgress: false,
        error: null,
      };
    case AUTHENTICATED_USER:
      return {
        ...state,
        user: action.user,
        logedIn: true,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {},
        logedIn: false,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
