import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { List, Badge, Icon } from 'antd';

import { Header } from '../header';
import { renderCategories } from '../../../../helpers';
import { DeleteAction } from '../../shared';

const Container = styled.div`
  padding: 30px 80px 80px 80px;
`

const { Item, Item: { Meta } } = List;

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

export default ({ products, onEditClick, onDeleteClick }) => (
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
          actions={
            [
              <Icon type="edit" onClick={() => onEditClick(product.id)} />,
              <DeleteAction id={product.id} targetAction={onDeleteClick} />
            ]
          }
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