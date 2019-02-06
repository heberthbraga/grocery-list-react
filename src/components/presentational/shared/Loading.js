import React, { Fragment } from 'react';

import Spinner from './Spinner';

export default ({ loading = false, children }) => (
  <Fragment>
    {loading ?
        <Spinner />
      :
        children
    }
  </Fragment>
);