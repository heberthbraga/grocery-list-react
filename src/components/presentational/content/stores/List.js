import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Table, Divider, Icon } from 'antd';

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
    render: text => <Link to={`/store/show/${text.id}`}>{text.name}</Link>,
  },
  {
    title: 'Nome Fantasia',
    dataIndex: 'fantasy_name',
    key: 'fantasy_name'
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website'
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
    render: (text, store) => (
      <span>
        <Link to={`/store/edit/${store.key}`}>
          <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)', fontSize: '16px' }} />
        </Link>
        <Divider type="vertical" />
        <DeleteAction id={store.key} targetAction={store.onDelete}  />
      </span>
    )
  }
];

const renderData = (stores, onDeleteClick) => {
  return _.map(stores, (store) => {
    return {
      key: store.id,
      name: { name: store.name, id: store.id },
      fantasy_name: store.fantasy_name,
      website: store.website,
      created_at: store.created_at,
      updated_at: store.updated_at,
      onDelete: onDeleteClick
    }
  });
}

export default ({ stores, onDeleteClick}) => (
  <Container>
    <Header target='/store/new' title='Nova Loja' />
    <Table 
      columns={columns} 
      dataSource={renderData(stores, onDeleteClick)} 
      style={{ overflowX: 'auto' }}
    />
  </Container>
);