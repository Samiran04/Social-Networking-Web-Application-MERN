import {
  GET_FRIENDS_LIST_SUCCESS,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from '../actions/actionTypes';

const inititalState = [];

export default function friends(state = inititalState, action) {
  switch (action.type) {
    case GET_FRIENDS_LIST_SUCCESS:
      return [...action.friends];
    case ADD_FRIEND:
      return state.concat(action.friendship);
    case REMOVE_FRIEND:
      const newArr = state.filter(
        (friend) => friend._id !== action.friendship._id
      );

      return newArr;
    default:
      return state;
  }
}
