import _ from 'lodash';
import React, { Component } from 'react';

import { ProductForm } from '../../../presentational/forms';
import { Loading } from '../../../presentational/shared';

class NewProduct extends Component {
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
  }

  handleChange = (e) => {      
    if (e.target) {
      const { name, value } = e.target;
      this.setState({ [name]: value })
    } else {
      console.log(e);
      this.setState({ category_ids: _.map(e).join(',') });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { productActions } = this.props;

    productActions.createProduct(this.state);
  }

  render() {
    const { categories, errors } = this.props;

    return (
      <Loading loading={!categories}>
        <ProductForm 
          categories={categories}
          onSubmit={this.handleSubmit} 
          onChange={this.handleChange}
          errors={errors}
        />
      </Loading>
    );
  }
}

export default NewProduct;