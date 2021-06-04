import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../actions/actionTypes';
import { APIUrls } from '../helpers/getUrl';
import { getFormBody } from '../helpers/utils';

export function startLogIn() {
  return {
    type: LOGIN_START,
  };
}

export function successLogIn(data) {
  return {
    type: LOGIN_SUCCESS,
    user: data,
  };
}

export function failedLogIn() {
  return {
    type: LOGIN_FAILED,
  };
}

export function login(email, password) {
  const url = APIUrls.login;
  return (dispatch) => {
    dispatch(startLogIn());
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(successLogIn(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
