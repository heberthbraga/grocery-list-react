import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Table, Icon, Divider } from 'antd';

import { Header } from '../header';
import { DeleteAction } from '../../shared';

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
  },
  {
    title: '',
    key: 'action',
    render: (text, category) => (
      <span>
        <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)', fontSize: '16px' }} />
        <Divider type="vertical" />
        <DeleteAction id={category.key} targetAction={category.onDelete}  />
      </span>
    )
  }
];

const renderData = (categories, onDeleteClick) => {
  return _.map(categories, (category) => {
    return {
      key: category.id,
      name: { name: category.name, id: category.id },
      description: category.description,
      subcategory: category.subcategory,
      created_at: category.created_at,
      updated_at: category.updated_at,
      onDelete: onDeleteClick
    }
  });
}

export default ({ categories, onDeleteClick }) => (
  <Container>
    <Header target='/category/new' title='Nova Categoria' />
    <Table 
      columns={columns} 
      dataSource={renderData(categories, onDeleteClick)} 
      style={{ overflowX: 'auto' }}
    />
  </Container>
);