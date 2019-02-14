import _ from 'lodash';

import React from 'react';

import { 
  List, Skeleton, Tag, Icon, Button
} from 'antd';

const mapGroceryProducts = (groceryProducts, visible) => {
  return _.map(groceryProducts, (groceryProduct) => {
    return ({
      id: groceryProduct.id,
      name: groceryProduct.item.name,
      price: groceryProduct.price
    });
  }).slice(0, visible);
}

const { Item, Item: { Meta } } = List;

const loadMore = (onLoadMore, visible, groceryProducts) => (
  visible < groceryProducts.length && 
  <Button 
    onClick={onLoadMore} 
    style={{ marginTop: 10 }}
  >
  Mais
  <Icon type="plus" />
  </Button>
);

export default ( {groceryProducts, onLoadMore, visible} ) => (
  <List 
    style={{marginTop: 40}}
    itemLayout="horizontal"
    loadMore={loadMore(onLoadMore, visible, groceryProducts)}
    dataSource={mapGroceryProducts(groceryProducts, visible)}
    renderItem={groceryProduct => (
      <Item
        actions={[<a><Icon type="close-circle" style={{ color: '#1890ff' }} /></a>]}
      >
        <Skeleton title={false} loading={false} active>
          <Meta style={{ textAlign: 'left' }} title={groceryProduct.name} />
          <Tag style={{ marginLeft: 5 }} color="red">R$ ${groceryProduct.price}</Tag>
        </Skeleton>
      </Item>
    )}
  />
);