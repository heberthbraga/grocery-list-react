import _ from 'lodash';

import React from 'react';

import { 
  List, Icon, Button
} from 'antd';

import NewProductStore from '../../../container/productStore/new';

const mapProducts = (storeId, products, visible) => {
  return _.map(products, (product) => {
    return ({
      storeId: storeId,
      product: product
    });
  }).slice(0, visible);
}

const loadMore = (onLoadMore, visible, products) => (
  visible < _.toArray(products).length &&
  <Button 
    onClick={onLoadMore} 
    style={{ margin: '10px auto', display: 'block' }}
  >
  Mais
  <Icon type="plus" />
  </Button>
);

const { Item } = List;

export default ( {storeId, products, onLoadMore, visible} ) => (
  <List 
    style={{ minWidth: 200 }}
    bordered
    itemLayout="horizontal"
    loadMore={loadMore(onLoadMore, visible, products)}
    dataSource={mapProducts(storeId, products, visible)}
    renderItem={response => (
      <Item key={response.product.id}>
        <NewProductStore storeId={response.storeId} product={response.product} />
      </Item>
    )}
  />
);