import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  CLEAR_AUTH_ERROR,
  HIDE_AUTH_MODAL,
  AUTH_MODAL,
} from './types';

const API_URL = 'http://localhost:3000';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function loginUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${API_URL}/api/signin`, { email, password })
      .then((response) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/profile');
      })
      .catch(() => {
        dispatch(authError('Incorrect password or email'));
      });
  };
}

export function signUpUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${API_URL}/api/signup`, { email, password })
      .then((response) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/profile');
      })
      .catch((err) => {
        dispatch(authError(err.response.data.error));
      });
  };
}


export function signOutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function clearAuthError() {
  return { type: CLEAR_AUTH_ERROR };
}

export function showAuthModal(modalName) {
  return { type: AUTH_MODAL, payload: modalName };
}

export function hideAuthModal() {
  return { type: HIDE_AUTH_MODAL };
}
