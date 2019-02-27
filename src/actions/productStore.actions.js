import axios from 'axios';

import { config, refreshHistory } from '../helpers';

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

  deleteProductStoreRequest = () => {
    return {
      type: productStoreConstants.DELETE_PRODUCT_STORE.REQUEST
    }
  }

  deleteProductStoreSuccess = (id) => {
    return {
      type: productStoreConstants.DELETE_PRODUCT_STORE.SUCCESS,
      payload: id
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

          refreshHistory.push(`/store/show/${storeId}`);
        })
        .catch(error => {
          const { response : { data: { message } } } = error;

          const errors = JSON.parse(message);

          dispatch(privateProductStoreActions.createProductStoreFailure(errors));
        });
    }
  }

  deleteStoreProduct = (storeId, id) => {
    return (dispatch) => {
      dispatch(privateProductStoreActions.deleteProductStoreRequest());

      const token = localStorage.getItem('api_owner_token');

      return axios.delete(`${PRODUCT_STORE_URL}/${id}?token=${token}`)
      .then(response => {
        const { data } = response;

        dispatch(privateProductStoreActions.deleteProductStoreSuccess(data.id));

        refreshHistory.push(`/store/show/${storeId}`);
      });
    };
  }
}

export const actions = new PublicProductStoreActions();