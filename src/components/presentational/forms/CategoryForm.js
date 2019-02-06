import _ from 'lodash';
import React from 'react';

import styled from 'styled-components';
import { 
  Row, Form, Input, Select, Button
} from 'antd';

import { hasFormError } from '../../../helpers';

const Container = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
`;

const { TextArea } = Input;
const { Option } = Select;

const FIELDS = {
  name: {
    type: 'text',
    id: 'name',
    label: 'Nome',
    required: true
  },
  description: {
    type: 'textarea',
    id: 'description',
    label: 'Descrição',
    required: false
  },
  parent_id: {
    type: 'select',
    id: 'parent_id',
    label: 'Categoria Pai',
    required: false
  }
}

const renderFields = (errors, onChange, parentCategories) => {
  return _.map(FIELDS, (field, key) => {
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
          />
        : field.type === 'textarea' ?
          <TextArea 
            placeholder={field.label} 
            id={key}
            name={field.id}
            onChange={onChange}
            rows={4}
          />
        :
          <Select
            placeholder={field.label}
            onChange={onChange}
            name={field.id}
          >
            {
              _.map(parentCategories, (parent, parentKey) => {
                return <Option key={parentKey} value={parentKey}>{parent.name}</Option>;
              })
            }
          </Select>
        } 
      </Form.Item>
    );
  });
}

export default ({ onSubmit, onChange, errors, parentCategories }) => (
  <Container>
    <Row style={{ marginBottom: 20 }}>
      <Title>Adicionar Categoria</Title>
    </Row>
    <Row>
      <Form onSubmit={onSubmit}>
        {
          renderFields(errors, onChange, parentCategories)
        }
        <Form.Item
          wrapperCol={{ xs: {span: 12, offset: 0}, sm: {span: 8, offset: 4} }}
        >
          <Button type="primary" htmlType="submit">Salvar</Button>
        </Form.Item>
      </Form>
    </Row>
  </Container>
);