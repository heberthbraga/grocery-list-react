import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { List, Badge, Button, Row, Col, Icon, Tag } from 'antd';

import './products.less';

const Container = styled.div`
  padding: 30px 80px 80px 80px;
`

const HighlightsHeader = styled.h1`
  font-size: 1.5em;
  font-weight: 600;
`;

const { Item, Item: { Meta } } = List;

const generateHighlightsList = (highlights) => {
  return _.map(highlights, (highlight) => {
    return ({
      id: highlight.id,
      title: highlight.name,
      store_id: highlight.lowest_store_price.store_id,
      store: highlight.lowest_store_price.store,
      quantity: highlight.quantity,
      price: `R$ ${highlight.lowest_store_price.price}`
    });
  });
}

export default ({ highlights }) => (
  <Container>
    <List 
      header={
        <HighlightsHeader>
          Destaques
        </HighlightsHeader>
      }
      itemLayout="vertical"
      size="small"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 15,
      }}
      dataSource={generateHighlightsList(highlights)}
      renderItem={highlight => (
        <Item
          key={highlight.id}
          extra={
            <Badge count={highlight.quantity}>
              <Link to={`/product/show/${highlight.id}`}>
                <Button size="large" style={{marginTop: 10}}>Ver Produto</Button>
              </Link>
            </Badge>
          }
        >
          <Meta 
            title={highlight.title}
          />
          <Row>
            <Col sm={4}>
              <Link to={`/store/show/${highlight.store_id}`} className="highligh-store-link">
                {highlight.store}
              </Link>
            </Col>
            <Col sm={12}>
              <Icon type="tag" style={{marginRight: 5}} />
              <Tag color="green">
                {highlight.price}
              </Tag>
            </Col>
          </Row>
        </Item>
      )}
    />
  </Container>
);