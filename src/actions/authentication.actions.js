import axios from 'axios';

import { config, history } from '../helpers';
import { authConstants } from '../constants';

const AUTH_URL = `${config.API_URL}/auth`;
const LOGIN_URL = `${AUTH_URL}/login`;

class PrivateAuthActions {
  signInRequest = () => {
    return {
      type: authConstants.SIGNIN.REQUEST,
      payload: {
        isFetching: true,
        isAuthenticated: false,
      }
    };
  }

  signInSuccess = (token) => {
    return {
      type: authConstants.SIGNIN.SUCCESS,
      payload: {
        isFetching: true,
        isAuthenticated: true,
        token: token
      }
    };
  }

  signInFailure = (message) => {
    return {
      type: authConstants.SIGNIN.FAILURE,
      payload: {
        isFetching: false,
        isAuthenticated: false,
        message
      }
    };
  }

  signOutRequest = () => {
    return {
      type: authConstants.SIGNOUT.REQUEST,
      payload: {
        isFetching: true,
        isAuthenticated: true,
      }
    };
  }

  signOutSuccess = () => {
    return {
      type: authConstants.SIGNOUT.SUCCESS,
      payload: {
        isFetching: false,
        isAuthenticated: false,
      }
    }
  }
}

const privateActions = new PrivateAuthActions();

class PublicAuthActions {
  signIn = (values) => {
    return dispatch => {
      dispatch(privateActions.signInRequest());

      return axios.post(`${LOGIN_URL}`, values)
        .then(response => {
          const { data: { token } } = response;

          localStorage.setItem('api_owner_token', token);

          dispatch(privateActions.signInSuccess(token));

          history.push('/dashboard');
        })
        .catch(error => {
          const { response : { data: { message } } } = error;
          
          dispatch(privateActions.signInFailure(message));
        });
    };
  }

  signOut = () => {
    return dispatch => {
      dispatch(privateActions.signOutRequest());

      localStorage.removeItem('api_owner_token');

      dispatch(privateActions.signOutSuccess());

      history.push('/');
    };
  }
}

export const actions = new PublicAuthActions();