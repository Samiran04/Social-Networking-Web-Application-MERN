import { GET_USER, GET_USER_LOADING, GET_USER_FAILED } from './actionTypes';
import { APIUrls } from '../helpers/getUrl';

export function userAction(user) {
  return {
    type: GET_USER,
    user,
  };
}

export function getUserProgress() {
  return {
    type: GET_USER_LOADING,
  };
}

export function getUserFailed(error) {
  return {
    type: GET_USER_FAILED,
    error: error,
  };
}

export function getUser(id) {
  const url = APIUrls.user(id);
  return (dispatch) => {
    dispatch(getUserProgress());
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('User Action', data);
        if (data.success) {
          dispatch(
            userAction({
              email: data.user.email,
              name: data.user.name,
            })
          );
        } else {
          dispatch(getUserFailed(data.message));
        }
      });
  };
}
