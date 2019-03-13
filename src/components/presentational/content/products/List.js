import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { List, Badge } from 'antd';

import { Header } from '../header';
import { renderCategories } from '../../../../helpers';

const Container = styled.div`
  padding: 30px 80px 80px 80px;
`
const generateListData = (products) => {
  return _.map(products, (product) => {
    return ({
      id: product.id,
      href: 'http://ant.design',
      title: product.name,
      picture: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
      content: renderCategories(product.categories),
      quantity: product.quantity
    });
  });
}

const { Item, Item: { Meta } } = List;

export default ({ products }) => (
  <Container>
    <Header target='/product/new' title='Novo Produto' />
    <List 
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      dataSource={generateListData(products)}
      renderItem={product => (
        <Item
          key={product.id}
          extra={
            <Badge count={product.quantity}>
              <img width={150} alt="logo" src={product.picture} />
            </Badge>
          }
        >
          <Meta 
            title={
              <Link to={`/product/show/${product.id}`}>
              {product.title}
              </Link>
            }
          />
          {product.content}
        </Item>
      )}
    />
  </Container>
);