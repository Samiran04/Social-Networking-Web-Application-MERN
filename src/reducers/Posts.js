import { ADD_POSTS, CREATE_POST, ADD_COMMENT } from '../actions/actionTypes';

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
    default:
      return state;
  }
}
