import _ from 'lodash';

import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { List } from '../../../presentational/content/categories';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.categories) {
      const { categoryActions } = this.props;
      categoryActions.fetchCategoriesIfNeeded();
    }
  }

  onEditClick = (categoryId) => {
    console.log(categoryId);
  }

  onDeleteClick = (categoryId) => {
    const { categoryActions } = this.props;

    categoryActions.deleteCategory(categoryId);
  }

  render() {
    const { category: { categories, categoryId } } = this.props;

    if (categoryId) {
      _.omit(categories, categoryId);
    }

    return (
      <Loading loading={!categories}>
        <List 
          categories={categories} 
          onEditClick={this.onEditClick}
          onDeleteClick={this.onDeleteClick}
        />
      </Loading>
    )
  }
}

export default Categories;