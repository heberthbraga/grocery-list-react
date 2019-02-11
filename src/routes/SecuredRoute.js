import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { ApplicationLayout } from '../components/presentational/application';

export default ({component: Component, isAuthenticated, ...rest}) => (
  <Route 
    {...rest}
    render={props => isAuthenticated ? 
      (
        <ApplicationLayout pathName={props.location.pathname}>
          <Component {...props} isAuthenticated={isAuthenticated} />
        </ApplicationLayout>
      ) : 
      (
        <Redirect to='/' />
      )
    }
  />
);