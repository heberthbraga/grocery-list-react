import _ from 'lodash';

import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { List } from '../../../presentational/content/categories';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.categories) {
      const { categoryActions } = this.props;
      categoryActions.fetchCategoriesIfNeeded();
    }
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
          onDeleteClick={this.onDeleteClick}
        />
      </Loading>
    )
  }
}

export default Categories;