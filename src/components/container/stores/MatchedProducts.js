import React, { Component } from 'react';

import { MatchedProductsList } from '../../presentational/content/stores';

const COUNT = 8;

class MatchedProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: this.props.products,
      visible: COUNT
    }

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return {
        visible: prev.visible + COUNT
      }
    });
  }

  render() {
    const { storeId } = this.props;
    const { products, visible } = this.state;

    return (
      <MatchedProductsList 
        storeId={storeId}
        products={products}
        onLoadMore={this.loadMore}
        visible={visible}
      />
    );
  }
}

export default MatchedProducts;