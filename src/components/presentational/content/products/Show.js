import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';

import { 
  Row, Col, Card, Button, Icon, Tag
} from 'antd';

import styled from 'styled-components';

import { renderCategories } from '../../../../helpers';

import './products.css';

const Container = styled.div`
  padding: 30px;
`

const ProductColumnTitle = styled.h1`
  font-size: 1.5em;
  text-align: left;
`;

const renderPricesPerStore = (pricesPerStore) => {
  return (
    _.map(pricesPerStore, (response, index) => {
      return (
        <Col 
          key={index}
          sm={8} 
          style={{padding: 5}}>
          <Card 
            title={response.store}
            extra={<Icon type="tag" />}
          >
            <Tag color={index & 1 ? 'green' : 'red'}>
              R$ {response.price}
            </Tag>
          </Card>
        </Col>
      )
    })
  );
}

export default ({ product }) => (
  <Container>
    <Row>
      <Col sm={12}>
        <Link to="/products" className="btn btn-outline-success pull-left">
          <Button type="primary">
            <Icon type="left" />Voltar
          </Button>
        </Link>
      </Col>
    </Row>
    <Row style={{marginTop: 20}}>
      <Col sm={4}>
        <img alt="example" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" className="logo-large" />
      </Col>
      <Col sm={8} style={{marginLeft: 10}}>
        <Row>
          <ProductColumnTitle>{product.name}</ProductColumnTitle>
        </Row>
        <Row>
          {renderCategories(product.categories)}
        </Row>
        <Row style={{marginTop: 10}}>
          {renderPricesPerStore(product.prices_per_store)}
        </Row>
      </Col>
    </Row>
  </Container>
);