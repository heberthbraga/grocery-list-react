import _ from 'lodash';
import React, { Component } from 'react';

import { List } from '../../../presentational/content/products';
import { Loading } from '../../../presentational/shared';

class Products extends Component {
  constructor(props) {
    super(props);

    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.products) {
      const { productActions } = this.props;
      productActions.fetchProductsIfNeeded();
    }
  }

  onEditClick = (productId) => {
    console.log(productId);
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
          onEditClick={this.onEditClick}
          onDeleteClick={this.onDeleteClick}
        />
      </Loading>
    )
  }
}

export default Products;