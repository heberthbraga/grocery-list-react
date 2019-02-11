import React, { Component } from 'react';

import { ProductStoreForm } from '../../../presentational/forms';

class NewProductStore extends Component {
  constructor(props) {
    super(props);

    const { storeId, product } = props;

    this.state = {
      grocery_store_id: storeId,
      item_id: product.id,
      price: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    console.log(e);
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { storeId, product } = this.props;

    return (
      <ProductStoreForm 
        storeId={storeId} 
        product={product} 
        onSubmit={this.handleSubmit} 
        onChange={this.handleChange}
      />
    )
  }
}

export default NewProductStore;