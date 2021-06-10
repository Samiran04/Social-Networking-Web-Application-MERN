import { GET_USER } from './actionTypes';
import { APIUrls } from '../helpers/getUrl';

export function userAction(user) {
  return {
    type: GET_USER,
    user,
  };
}

export function getUser(id) {
  const url = APIUrls.user(id);
  return (dispatch) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('User Action', data);

        dispatch(
          userAction({
            email: data.user.email,
            name: data.user.name,
          })
        );
      });
  };
}
