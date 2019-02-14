import React, { Component } from 'react';

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
  }

  loadMore() {
    this.setState((prev) => {
      return {
        visible: prev.visible + COUNT
      };
    });
  }

  render() {
    const { items, visible } = this.state;

    return (
      <GroceryList 
        groceryProducts={items} 
        onLoadMore={this.loadMore}
        visible={visible}
      />
    )
  }
}

export default LoadGroceryProductsList;