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
      <Col sm={12}>
        <Link to="/stores" className="btn btn-outline-success pull-left">
          <Button type="primary">
            <Icon type="left" />Voltar
          </Button>
        </Link>
      </Col>
      <Col sm={12} align="bottom">
        <ProductColumnTitle>Produtos Disponíveis</ProductColumnTitle>
      </Col>
    </Row>
    <Row>
      <Col sm={10} align="middle" >
        <Card
          style={{ minWidth: 200 }}
          cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          actions={[<Icon type="delete" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
          <Meta 
            title={store.name}
            description={<a href={`http://${store.website}`} target='_blank' rel='noopener noreferrer' >{store.website}</a>}
          />
          <LoadGroceryProductsList storeId={store.id} items={store.grocery_items} />
        </Card>
      </Col>
      <Col sm={12} style={{marginLeft: 50}}>
        <MatchedProducts 
          storeId={store.id} 
          products={products} 
        />
      </Col>
    </Row>
  </Container>
);