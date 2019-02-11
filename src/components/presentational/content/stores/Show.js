import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { 
  Row, Col, Button, Icon, Card, List
} from 'antd';

import InfiniteScrolling from '../../../container/navigation/InfiniteScrolling';
import NewProductStore from '../../../container/productStore/new';

const Container = styled.div`
  padding: 30px;
`
const { Meta } = Card;

const renderProduct = (storeId, product) =>  {
  return (
    <List.Item key={product.id}>
      <NewProductStore storeId={storeId} product={product} />
    </List.Item>
  );
}

const renderProducts = (storeId, products) => {
  const productsArr = _.toArray(products);

  return (
    <InfiniteScrolling 
      data={productsArr} 
      size={productsArr.length}>
      <List
        bordered
        dataSource={_.map(products)}
        renderItem={product => renderProduct(storeId, product)}
      />
    </InfiniteScrolling>
  );
}

const ProductColumnTitle = styled.h1`
  font-size: 1.5em;
  text-align: left;
`;

export default ({ store, products }) => (
  <Container>
    <Row style={{paddingBottom: 50}}>
      <Col span={12}>
        <Link to="/stores" className="btn btn-outline-success pull-left">
          <Button type="primary">
            <Icon type="left" />Voltar
          </Button>
        </Link>
      </Col>
      <Col span={12} align="bottom">
        <ProductColumnTitle>Produtos Disponíveis</ProductColumnTitle>
      </Col>
    </Row>
    <Row>
      <Col span={12} align="middle" >
        <Row>
          <Card
            style={{ width: 500 }}
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            actions={[<Icon type="delete" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          >
            <Meta 
              title={store.name}
              description={<a href={`http://${store.website}`} target='_blank' rel='noopener noreferrer' >{store.website}</a>}
            />
            <p style={{marginTop: 15}}>
              Content
            </p>
          </Card>
        </Row>
        <Row>
          {store.address.street}<br/>
          {store.address.city} - {store.address.state}, {store.address.zip}
        </Row>
      </Col>
      <Col span={12}>
        {renderProducts(store.id, products)}
      </Col>
    </Row>
  </Container>
);