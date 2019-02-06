import { authConstants } from '../constants';

export default function(state = {
  isFetching: false, 
  isAuthenticated: localStorage.getItem('api_owner_token') ? true : false
}, action) {
  switch (action.type) {
    case authConstants.SIGNIN.REQUEST:
      return {
        isFetching: action.payload.isFetching,
        isAuthenticated: action.payload.isAuthenticated
      };
    case authConstants.SIGNIN.SUCCESS:
      return { 
        isFetching: action.payload.isFetching,
        isAuthenticated: action.payload.isAuthenticated,
        errorMessage: null
      };
    case authConstants.SIGNIN.FAILURE:
      return {
        isFetching: action.payload.isFetching,
        isAuthenticated: action.payload.isAuthenticated,
        errorMessage: action.payload.message
      };
    case authConstants.SIGNOUT.SUCCESS:
      return {
        isFetching: action.payload.isFetching,
        isAuthenticated: action.payload.isAuthenticated
      };
  default:
    return state;
  }
};