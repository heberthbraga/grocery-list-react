import _ from 'lodash';

import axios from 'axios';

import { config, refreshHistory } from '../helpers';
import { productConstants } from '../constants';

const PRODUCTS_URL = `${config.SECURED_API_URL}/items`;
const PRODUCTS_FETCH_URL = `${PRODUCTS_URL}/fetch`;
const FETCH_HIGHLIGHTS_URL = `${PRODUCTS_URL}/highlights`;
const PRODUCTS_FETCH_NOT_MATCHED_STORE_URL = `${PRODUCTS_URL}/fetch/not_matched_store`;
const SEARCH_PRODUCTS_URL = `${PRODUCTS_URL}/search`;

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

  requestHighlights = () => {
    return {
      type: productConstants.REQUEST_HIGHLIGHTS
    }
  }

  receiveHighlights = (data) => {
    return {
      type: productConstants.RECEIVE_HIGHLIGHTS,
      payload: data
    }
  }

  fetchProductSuccess = (data) => {
    return {
      type: productConstants.FETCH_PRODUCT,
      payload: data
    }
  }

  deleteProductRequest = () => {
    return {
      type: productConstants.DELETE_PRODUCT.REQUEST
    }
  }

  deleteProductSuccess = (id) => {
    return {
      type: productConstants.DELETE_PRODUCT.SUCCESS,
      payload: id
    }
  }

  updateProductRequest = () => {
    return {
      type: productConstants.UPDATE_PRODUCT.REQUEST
    }
  }

  updateProductSuccess = (data) => {
    return {
      type: productConstants.UPDATE_PRODUCT.SUCCESS,
      payload: data
    }
  }

  updateProductFailure = (errors) => {
    return {
      type: productConstants.UPDATE_PRODUCT.FAILURE,
      payload: errors
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

  fetchHighlights = () => {
    return (dispatch) => {
      dispatch(this.requestHighlights());

      const token = localStorage.getItem('api_owner_token');
      const request = axios.get(`${FETCH_HIGHLIGHTS_URL}?token=${token}`);

      return request.then(({data}) => {
        dispatch(this.receiveHighlights(data));
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

  shouldFetchHighlights = (state) => {
    const { highlights, isFetching } = state.product;

    if (_.isEmpty(highlights)) {
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

          refreshHistory.push('/products');
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

  fetchProductsNotMatchedStore = (store_id) => {
    const token = localStorage.getItem('api_owner_token');
    const request = axios.get(`${PRODUCTS_FETCH_NOT_MATCHED_STORE_URL}/${store_id}?token=${token}`);

    return (dispatch) => {
      dispatch(privateProductActions.requestProducts());
      
      return request.then(({ data }) => {
        dispatch(privateProductActions.receiveProducts(data));
      });
    };
  }

  fetchHighglightsIfNeeded = () => {
    return (dispatch, getState) => {
      if (privateProductActions.shouldFetchHighlights(getState())) {
        return dispatch(privateProductActions.fetchHighlights());
      }
    }
  }

  searchProducts = (keyword) => {
    const token = localStorage.getItem('api_owner_token');
    const request = axios.post(`${SEARCH_PRODUCTS_URL}?token=${token}`, {keyword: keyword});

    return (dispatch) => {
      return request;
    }
  }

  deleteProduct = (id) => {
    return (dispatch) => {
      dispatch(privateProductActions.deleteProductRequest());

      const token = localStorage.getItem('api_owner_token');

      return axios.delete(`${PRODUCTS_URL}/${id}?token=${token}`)
        .then(response => {
          const { data } = response;

          dispatch(privateProductActions.deleteProductSuccess(data.id));

          refreshHistory.push(`/products`);
        });
    };
  }

  updateProduct = (productId, values) => {
    return (dispatch) => {
      dispatch(privateProductActions.updateProductRequest());

      const token = localStorage.getItem('api_owner_token');

      return axios.put(`${PRODUCTS_URL}/${productId}?token=${token}`, values)
        .then(response => {
          const { data } = response;

          dispatch(privateProductActions.updateProductSuccess(data));

          refreshHistory.push('/products');
        })
        .catch(error => {
          const { response : { data: { message } } } = error;

          const errors = JSON.parse(message);

          dispatch(privateProductActions.updateProductFailure(errors));
        });
    }
  }
}

export const actions = new PublicProductActions();