import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { Show } from '../../../presentational/content/products';

class ShowProduct extends Component {
  componentDidMount() {
    if (!this.props.product) {
      const { productActions, match: { params: { id } } } = this.props;
      productActions.fetchProduct(id);
    }
  }

  render() {
    const { product } = this.props;

    return (
      <Loading loading={!product}>
        <Show product={product} />
      </Loading>
    );
  }
}

export default ShowProduct;