import { GET_USER } from '../actions/actionTypes';

const initialUserState = {
  user: {},
};

export default function user(state = initialUserState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return {
        ...state,
      };
  }
}
