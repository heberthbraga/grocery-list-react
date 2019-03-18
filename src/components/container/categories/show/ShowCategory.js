import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { Show } from '../../../presentational/content/categories';

class ShowCategory extends Component {
  componentDidMount() {
    if (!this.props.category) {
      const { categoryActions, match: { params: { id } } } = this.props;
      categoryActions.fetchCategory(id)
    }
  }

  render() {
    const { category } = this.props;
    
    return (
      <Loading loading={!category}>
        <Show category={category} />
      </Loading>
    );
  }
}

export default ShowCategory;