import { func } from 'prop-types';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
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

export function startSignUp() {
  return {
    type: SIGNUP_START,
  };
}

export function successSignUp() {
  return {
    type: SIGNUP_SUCCESS,
  };
}

export function failedSignUp() {
  return {
    type: SIGNUP_FAILED,
  };
}

export function login(email, password) {
  const url = APIUrls.login();
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
        localStorage.setItem('token', data.data.token);
        dispatch(successLogIn(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function signup(name, email, password, confirm_password) {
  return (dispatch) => {
    const url = APIUrls.signup();
    console.log(url);
    dispatch(startSignUp());
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({
        email,
        password,
        confirm_password: confirm_password,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);

        dispatch(successSignUp());
      });
  };
}
