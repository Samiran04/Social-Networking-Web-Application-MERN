import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTHENTICATED_USER,
  LOG_OUT,
  REMOVE_ERROR,
  UPDATE_FAILED,
  UPDATE_SUCCESS,
} from '../actions/actionTypes';
import { APIUrls } from '../helpers/getUrl';
import { getFormBody, getAuthTokenFromLocalStorage } from '../helpers/utils';
import jwt_decode from 'jwt-decode';
import { getFreinds } from './friends';

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

export function failedLogIn(data) {
  return {
    type: LOGIN_FAILED,
    error: data.error,
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

export function authenticate(user) {
  return {
    type: AUTHENTICATED_USER,
    user,
  };
}

export function logout() {
  return {
    type: LOG_OUT,
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}

export function updateSuccess(data) {
  return {
    type: UPDATE_SUCCESS,
    data: data,
  };
}

export function updateFailed(error) {
  return {
    type: UPDATE_FAILED,
    error: error,
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
        if (!data.data) {
          dispatch(failedLogIn({ error: 'Invalid UserId/Password' }));
        } else {
          localStorage.setItem('token', data.data.token);
          const user = jwt_decode(data.data.token);
          dispatch(getFreinds(user.frinds));
          dispatch(
            successLogIn({
              name: user.name,
              id: user.id,
              email: user.email,
              password: user.password,
            })
          );
        }
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
        console.log(data);
        dispatch(successSignUp());
      });
  };
}

export function updateUser(name, password, confirm_password, id) {
  return (dispatch) => {
    const url = APIUrls.update();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password,
        id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);

        if (data.success) {
          localStorage.setItem('token', data.data.token);

          dispatch(updateSuccess(data.data.user));
        } else {
          dispatch(updateFailed(data.error));
        }
      });
  };
}
