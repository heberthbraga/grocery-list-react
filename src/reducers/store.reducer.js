import _ from 'lodash';
import { storeConstants } from '../constants';

export default function(state={}, action) {
  switch(action.type) {
    case storeConstants.REQUEST_STORES:
      return {
        ...state,
        isFetching: true
      }
    case storeConstants.RECEIVE_STORES:
      return {
        ...state,
        isFetching: false,
        stores: _.mapKeys(action.payload, 'id')
      }
    case storeConstants.CREATE_STORE.REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case storeConstants.CREATE_STORE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        [action.payload.id]: action.payload
      }
    case storeConstants.CREATE_STORE.FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.payload
      }
    case storeConstants.FETCH_STORE:
      return { 
        ...state, 
        isFetching: false, 
        [action.payload.id]: action.payload 
      }
    case storeConstants.DELETE_STORE.REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case storeConstants.DELETE_STORE.SUCCESS:
      return {
        isFetching: false,
        storeId: action.payload
      }
  default:
    return state;
  }
}