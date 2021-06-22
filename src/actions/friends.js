import {
  GET_FRIENDS_LIST_SUCCESS,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from './actionTypes';

import { APIUrls } from '../helpers/getUrl';

export function getFreinds(friends) {
  return {
    type: GET_FRIENDS_LIST_SUCCESS,
    friends,
  };
}

export function getFreindsAction(userId) {
  return (dispatch) => {
    const url = APIUrls.getFreinds(userId);
    console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data.friends && data.data.friends.length > 0) {
          dispatch(getFreinds(data.data.friends));
        }
      });
  };
}

export function addFriendAction(friendship) {
  return {
    type: ADD_FRIEND,
    friendship,
  };
}

export function removeFriendAction(friendship) {
  return {
    type: REMOVE_FRIEND,
    friendship,
  };
}
