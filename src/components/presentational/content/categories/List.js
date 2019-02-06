import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Table, Icon } from 'antd';

import { Header } from '../header';

const Container = styled.div`
  padding: 30px;
`

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: text => <Link to={`/category/show/${text.id}`}>{text.name}</Link>,
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Sub Categoria',
    dataIndex: 'subcategory',
    key: 'subcategory',
    render: text => 
      text ? 
        <Icon type="check" style={{ color: 'rgba(0,0,0,.25)', fontSize: '16px' }} /> 
      : 
        <Icon type="close" style={{ color: 'rgba(0,0,0,.25)', fontSize: '16px' }} />
  },
  {
    title: 'Criado Em',
    dataIndex: 'created_at',
    key: 'created_at'
  },
  {
    title: 'Atualizado Em',
    dataIndex: 'updated_at',
    key: 'updated_at'
  }
];

const renderData = (categories) => {
  return _.map(categories, (category) => {
    console.log(category.subcategory);
    return {
      key: category.id,
      name: { name: category.name, id: category.id },
      description: category.description,
      subcategory: category.subcategory,
      created_at: category.created_at,
      updated_at: category.updated_at
    }
  });
}

export default ({ categories }) => (
  <Container>
    <Header target='/category/new' title='Nova Categoria' />
    <Table 
      columns={columns} 
      dataSource={renderData(categories)} 
      style={{ overflowX: 'auto' }}
    />
  </Container>
);