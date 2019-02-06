import React, { Component } from 'react';

import { List } from '../../../presentational/content/products';
import { Loading } from '../../../presentational/shared';

class Products extends Component {

  componentDidMount() {
    if (!this.props.products) {
      const { productActions } = this.props;
      productActions.fetchProductsIfNeeded();
    }
  }

  render() {
    const { product: { products } } = this.props;
    
    return (
      <Loading loading={!products}>
        <List products={products} />
      </Loading>
    )
  }
}

export default Products;