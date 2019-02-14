import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import app from './app.reducer';
import auth from './authentication.reducer';
import product from './product.reducer';
import store from './store.reducer';
import category from './category.reducer';
import productStore from './productStore.reducer';

const rootReducer = combineReducers({
  form: formReducer,
  app,
  auth,
  product,
  store,
  category,
  productStore
});

export default rootReducer;