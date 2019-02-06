import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { List } from '../../../presentational/content/stores';

class Stores extends Component {

  componentDidMount() {
    if (!this.props.stores) {
      const { storeActions } = this.props;
      storeActions.fetchStoresIfNeeded();
    }
  }

  render() {
    const { store: { stores } } = this.props;

    return (
      <Loading loading={!stores}>
        <List stores={stores} />
      </Loading>
    )
  }
}

export default Stores;