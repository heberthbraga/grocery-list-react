import axios from 'axios';

import { config } from './config';

const REFRESH_TOKEN_URL = `${config.API_URL}/auth/refresh_token`;

export const refreshToken = (expiredToken) => {
  return axios.post(`${REFRESH_TOKEN_URL}`, { expired_token: expiredToken })
    .then(response => {
      const { data: { token } } = response;

      localStorage.setItem('api_owner_token', token);
    }).catch(error => {
      const { response : { data } } = error;
      console.log('Error refreshing token');
      console.log(data);
    });
}