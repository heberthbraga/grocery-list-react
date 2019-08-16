import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { Show } from '../../../presentational/content/analytics';

class Analytics extends Component {

  componentDidMount() {
    if (!this.props.itemsHistory) {
      const { categoryActions } = this.props;
      categoryActions.fetchItemsHistory();
    }
  }

  render() {
    const { category: { itemsHistory } } = this.props;

    return (
      <Loading loading={!itemsHistory}>
        <Show 
          itemsHistory={itemsHistory}
        />
      </Loading>
    )
  }
}

export default Analytics;