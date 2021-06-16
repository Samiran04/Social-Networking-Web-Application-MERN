import { ADD_COMMENT } from './actionTypes';
import { APIUrls } from '../helpers/getUrl';
import { getFormBody } from '../helpers/utils';

export function addCommentAction(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addComment(userId, postId, content) {
  const url = APIUrls.createComment();

  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ userId, postId, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addCommentAction(data.data.comment));
      });
  };
}
