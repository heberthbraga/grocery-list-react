import _ from 'lodash';
import axios from 'axios';

import { config, refreshHistory } from '../helpers';
import { categoryConstants } from '../constants';

const CATEGORIES_URL = `${config.SECURED_API_URL}/categories`;
const PARENT_CATEGORIES_URL = `${config.SECURED_API_URL}/categories/fetch/parents`;

class PrivateCategoryActions {
  requestCategories = () => {
    return {
      type: categoryConstants.REQUEST_CATEGORIES
    }
  }

  receiveCategories = (data) => {
    return {
      type: categoryConstants.RECEIVE_CATEGORIES,
      payload: data
    }
  }

  createCategoryRequest = () => {
    return {
      type: categoryConstants.CREATE_CATEGORY.REQUEST
    }
  }

  createCategorySuccess = (data) => {
    return {
      type: categoryConstants.CREATE_CATEGORY.SUCCESS,
      payload: data
    }
  }

  createCategoryFailure = (errors) => {
    return {
      type: categoryConstants.CREATE_CATEGORY.FAILURE,
      payload: errors
    }
  }

  fetchCategorySuccess = (data) => {
    return {
      type: categoryConstants.FETCH_CATEGORY,
      payload: data
    }
  }

  deleteCategoryRequest = () => {
    return {
      type: categoryConstants.DELETE_CATEGORY.REQUEST
    }
  }

  deleteCategorySucccess = (id) => {
    return {
      type: categoryConstants.DELETE_CATEGORY.SUCCESS,
      paylod: id
    }
  }

  updateCategoryRequest = () => {
    return {
      type: categoryConstants.UPDATE_CATEGORY.REQUEST
    }
  }

  updateCategorySuccess = (data) => {
    return {
      type: categoryConstants.UPDATE_CATEGORY.SUCCESS,
      payload: data
    }
  }

  updateCategoryFailure = (errors) => {
    return {
      type: categoryConstants.UPDATE_CATEGORY.FAILURE,
      payload: errors
    }
  }

  fetchCategories = () => {
    return (dispatch) => {
      dispatch(this.requestCategories());

      const token = localStorage.getItem('api_owner_token');
      const request = axios.get(`${CATEGORIES_URL}?token=${token}`);

      return request.then(({data}) => {
        dispatch(this.receiveCategories(data)) 
      });
    }
  }

  fetchParents = () => {
    const token = localStorage.getItem('api_owner_token');
    const request = axios.get(`${PARENT_CATEGORIES_URL}?token=${token}`);

    return (dispatch) => {
      return request;
    }
  }

  shouldFetchCategories = (state) => {
    const { categories, isFetching } = state.category;

    if (_.isEmpty(categories)) {
      return true;
    } else if (isFetching) {
      return false;
    }
  }
}

const privateCategoryActions = new PrivateCategoryActions();

class PublicCategoryActions {
  fetchCategoriesIfNeeded = () => {
    return (dispatch, getState) => {
      if (privateCategoryActions.shouldFetchCategories(getState())) {
        return dispatch(privateCategoryActions.fetchCategories());
      }
    }
  }

  fetchParentCategories = () => {
    return privateCategoryActions.fetchParents();
  }

  createCategory = (values) => {
    return (dispatch) => {
      dispatch(privateCategoryActions.createCategoryRequest());

      const token = localStorage.getItem('api_owner_token');

      return axios.post(`${CATEGORIES_URL}?token=${token}`, values)
        .then(response => {
          const { data } = response;

          dispatch(privateCategoryActions.createCategorySuccess(data));

          refreshHistory.push('/categories');
        })
        .catch(error => {
          const { response : { data: { message } } } = error;

          const errors = JSON.parse(message);

          dispatch(privateCategoryActions.createCategoryFailure(errors));
        });
    }
  }

  fetchCategory = (id) => {
    const token = localStorage.getItem('api_owner_token');
    const request = axios.get(`${CATEGORIES_URL}/${id}?token=${token}`);
    
    return (dispatch) => {
      return request.then(({data}) => {
        dispatch(privateCategoryActions.fetchCategorySuccess(data));
      });
    }
  }

  deleteCategory = (id) => {
    return (dispatch) => {
      dispatch(privateCategoryActions.deleteCategoryRequest());

      const token = localStorage.getItem('api_owner_token');

      return axios.delete(`${CATEGORIES_URL}/${id}?token=${token}`)
        .then(response => {
          const { data } = response;

          dispatch(privateCategoryActions.deleteCategorySucccess(data.id));

          refreshHistory.push(`/categories`);
        });
    };
  }

  updateCategory = (categoryId, values) => {
    return (dispatch) => {
      dispatch(privateCategoryActions.updateCategoryRequest());

      const token = localStorage.getItem('api_owner_token');

      return axios.put(`${CATEGORIES_URL}/${categoryId}?token=${token}`, values)
        .then(response => {
          const { data } = response;

          dispatch(privateCategoryActions.updateCategorySuccess(data));

          refreshHistory.push('/categories');
        })
        .catch(error => {
          const { response : { data: { message } } } = error;

          const errors = JSON.parse(message);

          dispatch(privateCategoryActions.updateCategoryFailure(errors));
        });
    }
  }
}

export const actions = new PublicCategoryActions();