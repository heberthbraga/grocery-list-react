import _ from 'lodash';

import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { List } from '../../../presentational/content/stores';

class Stores extends Component {
  constructor(props) {
    super(props);

    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.stores) {
      const { storeActions } = this.props;
      storeActions.fetchStoresIfNeeded();
    }
  }

  onEditClick = (storeId) => {
    console.log(storeId);
  }

  onDeleteClick = (storeId) => {
    const { storeActions } = this.props;

    storeActions.deleteStore(storeId);
  }

  render() {
    const { store: { stores, storeId } } = this.props;

    if (storeId) {
      _.omit(stores, storeId);
    }

    return (
      <Loading loading={!stores}>
        <List 
          stores={stores} 
          onEditClick={this.onEditClick}
          onDeleteClick={this.onDeleteClick}
        />
      </Loading>
    )
  }
}

export default Stores;