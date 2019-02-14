import { productStoreConstants } from '../constants';

export default function(state={}, action) {
  switch(action.type) {
    case productStoreConstants.CREATE_PRODUCT_STORE.REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case productStoreConstants.CREATE_PRODUCT_STORE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        [action.payload.id]: action.payload
      }
    case productStoreConstants.CREATE_PRODUCT_STORE.FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.payload
      }
  default:
    return state;
  }
}