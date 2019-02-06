import React from 'react';
import { Link } from 'react-router-dom';

import { 
  Row, Col, Card
} from 'antd';

import styled from 'styled-components';

import { renderCategories } from '../../../../helpers';

const Container = styled.div`
  padding: 30px;
`

const { Meta } = Card;

export default ({ product }) => (
  <Container>
    <Row>
      <Col>
        <Link to="/products" className="btn btn-outline-success pull-left">Voltar</Link>
      </Col>
    </Row>
    <Row className="mt-4">
      <Col md={4}>
        <Card
          hoverable
          cover={
            <img alt="example" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" />
          }
        />
      </Col>
      <Col md={8}>
        <Card>
          <Meta
            title={product.name}
            description={renderCategories(product.categories)}
          />
        </Card>
      </Col>
    </Row>
  </Container>
);