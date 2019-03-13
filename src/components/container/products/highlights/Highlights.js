import React, { Component } from 'react';

import { ListHighlights } from '../../../presentational/content/products';
import { Loading } from '../../../presentational/shared';

class Highlights extends Component {

  componentDidMount() {
    if (!this.props.highlights) {
      const { productActions } = this.props;
      productActions.fetchHighglightsIfNeeded();
    }
  }

  render() {
    const { product: { highlights } } = this.props;

    return (
      <Loading loading={!highlights}>
        <ListHighlights highlights={highlights} />
      </Loading>
    );
  }
}

export default Highlights;