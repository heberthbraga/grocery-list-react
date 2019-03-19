import _ from 'lodash';

import { productConstants } from '../constants';

export default function(state={}, action) {
  switch(action.type) {
    case productConstants.REQUEST_PRODUCTS:
      return {
        ...state,
        isFetching: true
      }
    case productConstants.RECEIVE_PRODUCTS:
      return {
        ...state,
        isFetching: false,
        products: _.mapKeys(action.payload, 'id')
      }
    case productConstants.CREATE_PRODUCT.REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case productConstants.CREATE_PRODUCT.SUCCESS:
      return {
        ...state,
        isFetching: false,
        [action.payload.id]: action.payload
      }
    case productConstants.CREATE_PRODUCT.FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.payload
      }
    case productConstants.FETCH_PRODUCT:
      return {
        ...state,
        isFetching: false,
        [action.payload.id]: action.payload
      }
    case productConstants.REQUEST_HIGHLIGHTS:
      return {
        ...state,
        isFetching: true
      }
    case productConstants.RECEIVE_HIGHLIGHTS:
      return {
        ...state,
        isFetching: false,
        highlights: _.mapKeys(action.payload, 'id')
      }
    case productConstants.DELETE_PRODUCT.REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case productConstants.DELETE_PRODUCT.SUCCESS:
      return {
        isFetching: false,
        productId: action.payload 
      }
    case productConstants.UPDATE_PRODUCT.REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case productConstants.UPDATE_PRODUCT.SUCCESS:
      return {
        ...state,
        isFetching: false,
        [action.payload.id]: action.payload
      }
    case productConstants.UPDATE_PRODUCT.FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.payload
      }
  default:
    return state;
  }
}