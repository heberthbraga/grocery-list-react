import axios from 'axios';

import { config, history } from '../helpers';

import { productStoreConstants } from '../constants';

const PRODUCT_STORE_URL = `${config.SECURED_API_URL}/grocery_items`;

class PrivateProductStoreActions {
  createProductStoreRequest = () => {
    return {
      type: productStoreConstants.CREATE_PRODUCT_STORE.REQUEST
    }
  }

  createProductStoreSuccess = (data) => {
    return {
      type: productStoreConstants.CREATE_PRODUCT_STORE.SUCCESS,
      payload: data
    }
  }

  createProductStoreFailure = (errors) => {
    return {
      type: productStoreConstants.CREATE_PRODUCT_STORE.FAILURE,
      payload: errors
    }
  }

}

const privateProductStoreActions = new PrivateProductStoreActions();

class PublicProductStoreActions {
  createProductStore = (storeId, values) => {
    return (dispatch) => {
      dispatch(privateProductStoreActions.createProductStoreRequest());

      const token = localStorage.getItem('api_owner_token');

      return axios.post(`${PRODUCT_STORE_URL}?token=${token}`, values)
        .then(response => {
          const { data } = response;

          dispatch(privateProductStoreActions.createProductStoreSuccess(data));

          history.push(`/store/show/${storeId}`);
        })
        .catch(error => {
          const { response : { data: { message } } } = error;

          const errors = JSON.parse(message);

          dispatch(privateProductStoreActions.createProductStoreFailure(errors));
        });
    }
  }
}

export const actions = new PublicProductStoreActions();