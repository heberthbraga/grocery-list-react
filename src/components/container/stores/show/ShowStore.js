import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { Show } from '../../../presentational/content/stores';

class ShowStore extends Component {
  componentDidMount() {
    if (!this.props.store) {
      const { storeActions, match: { params: { id } } } = this.props;
      storeActions.fetchStore(id);
    }
  }

  render() {
    const { store } = this.props;

    return (
      <Loading loading={!store}>
        <Show store={store} />
      </Loading>
    );
  }
}

export default ShowStore;