import { GET_FRIENDS_LIST_SUCCESS } from '../actions/actionTypes';

const inititalState = [];

export default function friends(state = inititalState, action) {
  switch (action.type) {
    case GET_FRIENDS_LIST_SUCCESS:
      return [...action.friends];
    default:
      return state;
  }
}
