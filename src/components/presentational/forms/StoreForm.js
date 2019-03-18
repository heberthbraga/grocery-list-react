import _ from 'lodash';
import React from 'react';

import styled from 'styled-components';

import {
  Form, Input, Button, Upload, Icon, Row
} from 'antd';

import { hasFormError, fieldValue } from '../../../helpers';

import AddressForm from './AddressForm';

const FIELDS = {
  name: {
    type: 'text',
    id: 'name',
    label: 'Nome',
    required: true
  },
  fantasy_name: {
    type: 'text',
    id: 'fantasy_name',
    label: 'Nome Fantasia',
    required: true
  },
  website: {
    type: 'text',
    id: 'website',
    label: 'Website',
    required: false
  },
  logo: {
    type: 'upload',
    id: 'logo',
    label: 'Logo',
    required: false
  }
}

const Container = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
`;

const renderFields = (errors, onChange, existingStore) => {
  return _.map(FIELDS, (field, key) => {
    const value = fieldValue(field.id, existingStore);

    return (
      <Form.Item
        key={key}
        labelCol={{ xs: {span: 14}, sm: {span: 4} }} 
        wrapperCol={{ xs: {span: 16}, sm: {span: 10} }}
        label={field.label}
        for={field.id}
        validateStatus={hasFormError(field.required, errors, field.id) ? 'error' : ''}
        help={hasFormError(field.required, errors, field.id) ? `${errors[field.id]}` : ''}
      >
        {field.type === 'text' ?
          <Input 
            placeholder={field.label} 
            id={key}
            name={field.id}
            onChange={onChange}
            defaultValue={value}
          />
          :
          <Upload name={field.id} listType="picture">
            <Button>
              <Icon type="upload" /> Click to upload
            </Button>
          </Upload>
        }
        
      </Form.Item>
    )
  });
}

export default ({ onSubmit, onChange, errors, existingStore }) => (
  <Container>
    <Row style={{ marginBottom: 20 }}>
      <Title>{existingStore ? 'Editar Loja' : 'Cadastrar Loja'}</Title>
    </Row>
    <Row>
      <Form onSubmit={onSubmit}>
        {
          renderFields(errors, onChange, existingStore)
        }
        <AddressForm 
          onChange={onChange} 
          errors={errors}
          existingAddress={existingStore ? existingStore.address : null} 
        />
        <Form.Item
          wrapperCol={{ xs: {span: 12, offset: 0}, sm: {span: 8, offset: 4} }}
        >
          <Button type="primary" htmlType="submit">Salvar</Button>
        </Form.Item>
      </Form>
    </Row>
  </Container>
);