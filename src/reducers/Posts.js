import {
  ADD_POSTS,
  CREATE_POST,
  ADD_COMMENT,
  POST_LIKE_ACTION,
} from '../actions/actionTypes';

export default function posts(state = [], action) {
  switch (action.type) {
    case ADD_POSTS:
      return action.posts;
    case CREATE_POST:
      return [action.post, ...state];
    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.comment.post) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }

        return post;
      });
      return newPosts;
    case POST_LIKE_ACTION:
      const newPostsForLike = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [action.like._id, ...post.likes],
          };
        }

        return post;
      });
      return newPostsForLike;
    default:
      return state;
  }
}
