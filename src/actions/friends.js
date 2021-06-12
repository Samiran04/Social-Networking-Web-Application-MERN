import { GET_FRIENDS_LIST_SUCCESS } from './actionTypes';

export function getFreinds(friends) {
  return {
    type: GET_FRIENDS_LIST_SUCCESS,
    friends,
  };
}
