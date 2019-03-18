import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SecuredRoute from './SecuredRoute';

import Login from '../components/container/login';
import { NotFound } from '../components/presentational/application';
import Dashboard from '../components/container/dashboard';
import Products from '../components/container/products/index';
import NewProduct from '../components/container/products/new';
import ShowProduct from '../components/container/products/show';
import Analytics from '../components/container/analytics/index';
import Stores from '../components/container/stores/index';
import NewStore from '../components/container/stores/new';
import ShowStore from '../components/container/stores/show';
import EditStore from '../components/container/stores/edit';
import Categories from '../components/container/categories/index';
import NewCategory from '../components/container/categories/new';
import ShowCategory from '../components/container/categories/show';

export const Routes = ({ isAuthenticated, errorMessage }) => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/' render={() =>(
          isAuthenticated ? (
            <Redirect to='/dashboard' />
            ) : (
              <Route path='/' render={() => <Login errorMessage={errorMessage} /> } />
            )
          )} 
        />
        <SecuredRoute 
          isAuthenticated={isAuthenticated} 
          component={Dashboard} 
          path='/dashboard' 
        />
        <SecuredRoute 
          isAuthenticated={isAuthenticated} 
          component={Analytics} 
          path='/analytics' 
        />
        <SecuredRoute 
          isAuthenticated={isAuthenticated} 
          component={Products} 
          path='/products' 
        />
        <SecuredRoute 
          isAuthenticated={isAuthenticated} 
          component={NewProduct} 
          path='/product/new' 
        />
        <SecuredRoute 
          isAuthenticated={isAuthenticated} 
          component={ShowProduct} 
          path='/product/show/:id' 
        />
        <SecuredRoute 
          isAuthenticated={isAuthenticated} 
          component={Stores} 
          path='/stores' 
        />
        <SecuredRoute 
          isAuthenticated={isAuthenticated} 
          component={NewStore} 
          path='/store/new' 
        />
        <SecuredRoute 
          isAuthenticated={isAuthenticated} 
          component={ShowStore} 
          path='/store/show/:id' 
        />
        <SecuredRoute 
          isAuthenticated={isAuthenticated} 
          component={EditStore} 
          path='/store/edit/:id' 
        />
        <SecuredRoute 
          isAuthenticated={isAuthenticated} 
          component={Categories} 
          path='/categories' 
        />
        <SecuredRoute 
          isAuthenticated={isAuthenticated} 
          component={NewCategory} 
          path='/category/new' 
        />
        <SecuredRoute 
          isAuthenticated={isAuthenticated} 
          component={ShowCategory} 
          path='/category/show/:id' 
        />
        <Route path="*" render={() =>(
          isAuthenticated ? (
            <Redirect to='/dashboard' />
            ) : (
              <Route path='*' render={() => <NotFound /> } />
            )
          )} 
        />
      </Switch>
    </Fragment>
  );
}
