import { ADD_POSTS, CREATE_POST, POST_LIKE_ACTION } from './actionTypes';
//import { data } from '../data';

import { APIUrls } from '../helpers/getUrl';
import { getFormBody } from '../helpers/utils';

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
        dispatch(addPosts(data.posts));
      });
  };
}

export function createPostAction(post) {
  return {
    type: CREATE_POST,
    post,
  };
}

export function createPost(content, userId) {
  const url = APIUrls.createPost();

  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ content, userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(createPostAction(data.data.post));
        }
      });
  };
}

export function postLikeAction(like, postId) {
  return {
    type: POST_LIKE_ACTION,
    like,
    postId,
  };
}

export function postLike(userId, postId) {
  const url = APIUrls.getLikePost(userId, postId, 'Post');
  console.log(url);

  return (dispatch) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(postLikeAction(data.like, postId));
        }
      });
  };
}
