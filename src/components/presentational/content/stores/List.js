import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Table, Divider, Icon, Button } from 'antd';

import { Header } from '../header';

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
    render: () => (
      <span>
        <a href="javascript:;" title="Editar">
          <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)', fontSize: '16px' }} />
        </a>
        <Divider type="vertical" />
        <a href="javascript:;" title="Remover">
          <Icon type="delete"  style={{ color: 'rgba(0,0,0,.25)', fontSize: '16px' }} />
        </a>
      </span>
    )
  }
];

const renderData = (stores) => {
  return _.map(stores, (store) => {
    return {
      key: store.id,
      name: { name: store.name, id: store.id },
      fantasy_name: store.fantasy_name,
      website: store.website,
      created_at: store.created_at,
      updated_at: store.updated_at
    }
  });
}

export default ({ stores }) => (
  <Container>
    <Header target='/store/new' title='Nova Loja' />
    <Table 
      columns={columns} 
      dataSource={renderData(stores)} 
      style={{ overflowX: 'auto' }}
    />
  </Container>
);