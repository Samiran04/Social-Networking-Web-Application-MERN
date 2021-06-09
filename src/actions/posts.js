import { ADD_POSTS } from './actionTypes';
//import { data } from '../data';

import { APIUrls } from '../helpers/getUrl';

export function addPosts(data) {
  return {
    type: ADD_POSTS,
    posts: data,
  };
}

export function getPosts() {
  return (dispatch) => {
    let url = APIUrls.posts();
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API CALL', data.posts);
        dispatch(addPosts(data.posts));
      });
  };
}
