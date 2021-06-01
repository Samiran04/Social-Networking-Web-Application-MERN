import { ADD_POSTS } from '../actions/actionTypes';

export default function posts(state = [], action) {
  switch (action.type) {
    case ADD_POSTS:
      return {
        state: action.posts,
      };
    default:
      return {
        state,
      };
  }
}
