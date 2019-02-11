import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { Show } from '../../../presentational/content/stores';

class ShowStore extends Component {
  componentDidMount() {
    if (!this.props.store) {
      const { storeActions, productActions, match: { params: { id } } } = this.props;

      storeActions.fetchStore(id);
      productActions.fetchProductsNotMatchedStore(id);
    }
  }

  render() {
    const { store, products } = this.props;

    return (
      <Loading loading={!store}>
        <Loading loading={!products}>
          <Show 
            store={store} 
            products={products} 
          />
        </Loading>
      </Loading>
    );
  }
}

export default ShowStore;