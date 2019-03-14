import _ from 'lodash';

import { categoryConstants } from '../constants';

export default function(state={}, action) {
  switch(action.type) {
    case categoryConstants.REQUEST_CATEGORIES:
      return {
        ...state,
        isFetching: true
      }
    case categoryConstants.RECEIVE_CATEGORIES:
      return {
        ...state,
        isFetching: false,
        categories: _.mapKeys(action.payload, 'id')
      }
    case categoryConstants.CREATE_CATEGORY.REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case categoryConstants.CREATE_CATEGORY.SUCCESS:
      return {
        ...state,
        isFetching: false,
        [action.payload.id]: action.payload
      }
    case categoryConstants.CREATE_CATEGORY.FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.payload
      }
    case categoryConstants.FETCH_CATEGORY:
      return {
        ...state,
        isFetching: false,
        [action.payload.id]: action.payload
      }
    case categoryConstants.DELETE_CATEGORY.REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case categoryConstants.DELETE_CATEGORY.SUCCESS:
      return {
        isFetching: false,
        categoryId: action.payload
      }
  default:
    return state; 
  }
}