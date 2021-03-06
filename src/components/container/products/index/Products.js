import _ from 'lodash';
import React, { Component } from 'react';

import { List } from '../../../presentational/content/products';
import { Loading } from '../../../presentational/shared';

class Products extends Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.products) {
      const { productActions } = this.props;
      productActions.fetchProductsIfNeeded();
    }
  }

  onDeleteClick = (productId) => {
    const { productActions } = this.props;

    productActions.deleteProduct(productId);
  }

  render() {
    const { product: { products, productId } } = this.props;
    
    if (productId) {
      _.omit(products, productId);
    }

    return (
      <Loading loading={!products}>
        <List 
          products={products} 
          onDeleteClick={this.onDeleteClick}
        />
      </Loading>
    )
  }
}

export default Products;