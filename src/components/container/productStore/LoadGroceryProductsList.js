import _ from 'lodash';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { productStoreActions } from '../../../actions';

import { GroceryList } from '../../presentational/content/storeProducts';

const COUNT = 3;

class LoadGroceryProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      visible: COUNT
    }

    this.loadMore = this.loadMore.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(storeProductId) {
    const { productStoreActions, storeId  } = this.props;

    productStoreActions.deleteStoreProduct(storeId, storeProductId);
  }

  loadMore() {
    this.setState((prev) => {
      return {
        visible: prev.visible + COUNT
      };
    });
  }

  render() {
    const { items, visible, storeProductId } = this.state;
    
    if (storeProductId) {
      _.omit(items, storeProductId);
    }

    return (
      <GroceryList 
        groceryProducts={items} 
        onLoadMore={this.loadMore}
        visible={visible}
        onDelete={this.onDeleteClick}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  productStoreActions: bindActionCreators(productStoreActions, dispatch)
});

export default connect(state => state, mapDispatchToProps)(LoadGroceryProductsList);