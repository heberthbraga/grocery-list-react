import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Card, List as AntList } from 'antd';

import { Header } from '../header';

import { eachSlice } from '../../../../helpers';

const Container = styled.div`
  padding: 30px 80px 80px 80px;
`

const { Meta } = Card;

const renderProductCard = (product) => {
  return (
    <Link to={`/product/show/${product.id}`}>
      <Card 
        hoverable
        cover={
          <img alt="example" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" />
        }
      >
        <Meta
          title={product.name}
          description="www.instagram.com"
        />
      </Card>
    </Link>
  );
}

const renderProductCols = (innerProducts) => {
  return _.map(innerProducts, (product, index) => {
    return (
      <AntList.Item 
        key={index} 
        style={{ margin: 10 }} 
      >
        {
          renderProductCard(product)
        }
      </AntList.Item>
    )
  });
}

const renderProductRows = (productsMap) => {
  const products = _.toArray(productsMap);
  const slicedProducts = eachSlice(products, 6);

  return _.map(slicedProducts, (innerProducts, index) => {
    return (
      <AntList 
        key={index} 
        grid={{
          gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3
        }}
      >
        {
          renderProductCols(innerProducts)
        }
      </AntList>
    );
  });
}

export default ({ products }) => (
  <Container>
    <Header target='/product/new' title='Novo Produto' />
    {
      renderProductRows(products)
    }
  </Container>
);