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
  default:
    return state;
  }
}