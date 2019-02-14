import React, { Component } from 'react';

import { ProductStoreForm } from '../../../presentational/forms';

class NewProductStore extends Component {
  constructor(props) {
    super(props);

    const { storeId, product } = props;

    this.state = {
      grocery_store_id: storeId,
      item_id: product.id,
      price: null,
      targetId: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      price: e
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { storeId, productStoreActions } = this.props;
    productStoreActions.createProductStore(storeId, this.state);

    this.setState({
      targetId: this.state.item_id
    });
  }

  render() {
    const { storeId, product, errors } = this.props;
    const { targetId } = this.state;

    return (
      <ProductStoreForm 
        storeId={storeId} 
        product={product} 
        onSubmit={this.handleSubmit} 
        onChange={this.handleChange}
        errors={errors}
        targetId={targetId}
      />
    )
  }
}

export default NewProductStore;