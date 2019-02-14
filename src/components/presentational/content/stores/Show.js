import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { 
  Row, Col, Button, Icon, Card
} from 'antd';

import LoadGroceryProductsList from '../../../container/productStore/LoadGroceryProductsList';
import MatchedProducts from '../../../container/stores/MatchedProducts';

const Container = styled.div`
  padding: 30px;
`
const { Meta } = Card;

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
            style={{ width: 580 }}
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            actions={[<Icon type="delete" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          >
            <Meta 
              title={store.name}
              description={<a href={`http://${store.website}`} target='_blank' rel='noopener noreferrer' >{store.website}</a>}
            />
            <LoadGroceryProductsList items={store.grocery_items} />
          </Card>
        </Row>
        <Row>
          {store.address.street}<br/>
          {store.address.city} - {store.address.state}, {store.address.zip}
        </Row>
      </Col>
      <Col span={12}>
        <MatchedProducts 
          storeId={store.id} 
          products={products} 
        />
      </Col>
    </Row>
  </Container>
);