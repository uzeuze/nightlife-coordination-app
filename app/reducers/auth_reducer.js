import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  CLEAR_AUTH_ERROR,
  AUTH_MODAL,
  HIDE_AUTH_MODAL,
} from '../actions/types';

const INITIAL_STATE = {
  authenticated: false,
  error: '',
  modal: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, modal: '' };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case UNAUTH_USER:
      return INITIAL_STATE;
    case CLEAR_AUTH_ERROR:
      return { ...state, error: '' };
    case AUTH_MODAL:
      return { ...state, modal: action.payload };
    case HIDE_AUTH_MODAL:
      return { ...state, modal: '' };
    default:
      return state;
  }
};
