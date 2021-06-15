import { ADD_POSTS, CREATE_POST } from '../actions/actionTypes';

export default function posts(state = [], action) {
  switch (action.type) {
    case ADD_POSTS:
      return action.posts;
    case CREATE_POST:
      return [action.post, ...state];
    default:
      return state;
  }
}
