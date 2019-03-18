import _ from 'lodash';
import axios from 'axios';

import { config, refreshHistory } from '../helpers';
import { storeConstants } from '../constants';

const STORES_URL = `${config.SECURED_API_URL}/stores`;

class PrivateStoreActions {
  requestStores = () => {
    return {
      type: storeConstants.REQUEST_STORES
    }
  }

  receiveStores = (data) => {
    return {
      type: storeConstants.RECEIVE_STORES,
      payload: data
    }
  }

  createStoreRequest = () => {
    return {
      type: storeConstants.CREATE_STORE.REQUEST
    }
  }

  createStoreSuccess = (data) => {
    return {
      type: storeConstants.CREATE_STORE.SUCCESS,
      payload: data
    }
  }

  createStoreFailure = (errors) => {
    return {
      type: storeConstants.CREATE_STORE.FAILURE,
      payload: errors
    }
  }

  fetchStoreSuccess = (data) => {
    return {
      type: storeConstants.FETCH_STORE,
      payload: data
    }
  }

  deleteStoreRequest = () => {
    return {
      type: storeConstants.DELETE_STORE.REQUEST
    }
  }

  deleteStoreSuccess = (id) => {
    return {
      type: storeConstants.DELETE_STORE.SUCCESS,
      payload: id
    }
  }

  updateStoreRequest = () => {
    return {
      type: storeConstants.UPDATE_STORE.REQUEST
    }
  }

  updateStoreSuccess = (data) => {
    return {
      type: storeConstants.UPDATE_STORE.SUCCESS,
      payload: data
    }
  }

  updateStoreFailure = (errors) => {
    return {
      type: storeConstants.UPDATE_STORE.FAILURE,
      payload: errors
    }
  }

  fetchStores = () => {
    return (dispatch) => {
      dispatch(this.requestStores());

      const token = localStorage.getItem('api_owner_token');
      const request = axios.get(`${STORES_URL}?token=${token}`);

      return request.then(({data}) => {
        dispatch(this.receiveStores(data)) 
      });
    }
  }

  shouldFetchStores = (state) => {
    const { stores, isFetching } = state.store;
    
    if (_.isEmpty(stores)) {
      return true;
    } else if (isFetching) {
      return false;
    }
  }
}

const privateStoreActions = new PrivateStoreActions();

class PublicStoreActions {
  fetchStoresIfNeeded = () => {
    return (dispatch, getState) => {
      if (privateStoreActions.shouldFetchStores(getState())) {
        return dispatch(privateStoreActions.fetchStores());
      }
    }
  }

  fetchStore = (id) => {
    const token = localStorage.getItem('api_owner_token');
    const request = axios.get(`${STORES_URL}/${id}?token=${token}`);

    return (dispatch) => {
      return request.then(({data}) => {
        dispatch(privateStoreActions.fetchStoreSuccess(data));
      }).catch();
    }
  }

  createStore = (values) => {
    return (dispatch) => {
      dispatch(privateStoreActions.createStoreRequest());

      const token = localStorage.getItem('api_owner_token');
      
      return axios.post(`${STORES_URL}?token=${token}`, values)
        .then(response => {
          const { data } = response;

          dispatch(privateStoreActions.createStoreSuccess(data));

          refreshHistory.push('/stores');
        })
        .catch(error => {
          const { response : { data: { message } } } = error;

          const errors = JSON.parse(message);

          dispatch(privateStoreActions.createStoreFailure(errors));
        });
    }
  }

  updateStore = (storeId, values) => {
    return (dispatch) => {
      dispatch(privateStoreActions.updateStoreRequest());

      const token = localStorage.getItem('api_owner_token');
      
      return axios.put(`${STORES_URL}/${storeId}?token=${token}`, values)
        .then(response => {
          const { data } = response;

          dispatch(privateStoreActions.updateStoreSuccess(data));

          refreshHistory.push('/stores');
        })
        .catch(error => {
          const { response : { data: { message } } } = error;

          const errors = JSON.parse(message);

          dispatch(privateStoreActions.updateStoreFailure(errors));
        });
    }
  }

  deleteStore = (id) => {
    return (dispatch) => {
      dispatch(privateStoreActions.deleteStoreRequest());

      const token = localStorage.getItem('api_owner_token');

      return axios.delete(`${STORES_URL}/${id}?token=${token}`)
        .then(response => {
          const { data } = response;

          dispatch(privateStoreActions.deleteStoreSuccess(data.id));

          refreshHistory.push(`/stores`);
        });
    };
  }
}

export const actions = new PublicStoreActions();