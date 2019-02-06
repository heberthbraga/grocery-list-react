import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { List } from '../../../presentational/content/categories';

class Categories extends Component {

  componentDidMount() {
    if (!this.props.categories) {
      const { categoryActions } = this.props;
      categoryActions.fetchCategoriesIfNeeded();
    }
  }

  render() {
    const { category: { categories } } = this.props;

    return (
      <Loading loading={!categories}>
        <List categories={categories} />
      </Loading>
    )
  }
}

export default Categories;