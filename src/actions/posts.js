import { ADD_POSTS } from './actionTypes';
import { data } from '../data';

export function addPosts(data) {
  return {
    type: ADD_POSTS,
    posts: data,
  };
}

export function getPosts() {
  //api call has to be done

  return (dispatch) => {
    dispatch(addPosts(data));
  };
}
