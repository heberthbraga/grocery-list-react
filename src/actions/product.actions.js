import _ from 'lodash';

import axios from 'axios';

import { config, history } from '../helpers';
import { productConstants } from '../constants';

const PRODUCTS_URL = `${config.SECURED_API_URL}/items`;
const PRODUCTS_FETCH_URL = `${PRODUCTS_URL}/fetch`;

class PrivateProductActions {
  createProductRequest = () => {
    return {
      type: productConstants.CREATE_PRODUCT.REQUEST
    }
  }

  createProductSuccess = (data) => {
    return {
      type: productConstants.CREATE_PRODUCT.SUCCESS,
      payload: data
    }
  }

  createProductFailure = (errors) => {
    return {
      type: productConstants.CREATE_PRODUCT.FAILURE,
      payload: errors
    }
  }

  requestProducts = () => {
    return {
      type: productConstants.REQUEST_PRODUCTS
    }
  }

  receiveProducts = (data) => {
    return {
      type: productConstants.RECEIVE_PRODUCTS,
      payload: data
    }
  }

  fetchProductSuccess = (data) => {
    return {
      type: productConstants.FETCH_PRODUCT,
      payload: data
    }
  }

  fetchProducts = () => {
    return (dispatch) => {
      dispatch(this.requestProducts());

      const token = localStorage.getItem('api_owner_token');
      const request = axios.get(`${PRODUCTS_URL}?token=${token}`);

      return request.then(({data}) => {
        dispatch(this.receiveProducts(data));
      });
    }
  }

  shouldFetchProducts = (state) => {
    const { products, isFetching } = state.product;

    if (_.isEmpty(products)) {
      return true;
    } else if (isFetching) {
      return false;
    }
  }
}

const privateProductActions = new PrivateProductActions();

class PublicProductActions {

  fetchProductsIfNeeded = () => {
    return (dispatch, getState) => {
      if (privateProductActions.shouldFetchProducts(getState())) {
        return dispatch(privateProductActions.fetchProducts());
      }
    }
  }

  createProduct = (values) => {
    return (dispatch) => {
      dispatch(privateProductActions.createProductRequest());

      const token = localStorage.getItem('api_owner_token');

      return axios.post(`${PRODUCTS_URL}?token=${token}`, values)
        .then(response => {
          const { data } = response;

          dispatch(privateProductActions.createProductSuccess(data));

          history.push('/');
        })
        .catch(error => {
          const { response : { data: { message } } } = error;

          const errors = JSON.parse(message);

          dispatch(privateProductActions.createProductFailure(errors));
        });
    }
  }

  fetchProduct = (id) => {
    const token = localStorage.getItem('api_owner_token');
    const request = axios.get(`${PRODUCTS_FETCH_URL}/${id}?token=${token}`);

    return (dispatch) => {
      return request.then(({data}) => {
        dispatch(privateProductActions.fetchProductSuccess(data));
      });
    }
  }
}

export const actions = new PublicProductActions();