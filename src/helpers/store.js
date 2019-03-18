import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import axios from 'axios';

import { refreshToken, history } from '../helpers';

axios.interceptors.response.use(null, function (error) {
  const { response } = error;

  if (response.status === 401) {
    const { data } = response;
    
    // Refresh Invalid Token
    if (data.message === 'Invalid or Expired Token.') {
      const expiredToken = localStorage.getItem('api_owner_token');
      
      refreshToken(expiredToken);

      history.push('/dashboard');
    }
  }

  return Promise.reject(error);
});


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

export default createStoreWithMiddleware(rootReducer);