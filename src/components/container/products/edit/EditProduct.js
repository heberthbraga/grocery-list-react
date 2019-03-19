import _ from 'lodash';

import React, { Component } from 'react';

import { ProductForm } from '../../../presentational/forms';
import { Loading } from '../../../presentational/shared';

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category_ids: null,
      name: null,
      picture: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.categories) {
      const { categoryActions } = this.props;
      categoryActions.fetchCategoriesIfNeeded();
    }

    if(!this.props.product) {
      const { productActions, match: { params: { id } } } = this.props;
      productActions.fetchProduct(id);
    }
  }

  handleChange = (e) => {      
    if (e.target) {
      const { name, value } = e.target;
      this.setState({ [name]: value })
    } else {
      this.setState({ category_ids: _.map(e).join(',') });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { productActions, match: { params: { id } } } = this.props;

    const formData = new FormData(e.target);
    let storeCopy = Object.assign({}, this.state);

    for (let entry of formData.entries()) {
      storeCopy[entry[0]] = entry[1];
    }

    productActions.updateProduct(id, storeCopy);
  }

  render() {
    const { categories, errors, existingProduct } = this.props;

    return (
      <Loading loading={!categories}>
        <Loading loading={!existingProduct}>
          <ProductForm 
            categories={categories}
            onSubmit={this.handleSubmit} 
            onChange={this.handleChange}
            errors={errors}
            existingProduct={existingProduct}
          />
        </Loading>
      </Loading>
    );
  }
}

export default EditProduct;