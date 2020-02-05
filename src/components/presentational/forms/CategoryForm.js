import _ from 'lodash';
import React from 'react';

import styled from 'styled-components';
import { 
  Row, Form, Input, Button
} from 'antd';
import Select from 'react-select';

import { hasFormError, fieldValue } from '../../../helpers';

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
    placeholder: 'Selecione Uma Categoria Pai',
    required: false
  }
}

const renderParentOptions = (parentCategories) => {
  return(
    _.map(parentCategories, (parent, parentKey) => {
      return { value: parentKey, label: parent.name };
    })
  );
}

const renderSelect = (field, onChange, parentCategories, defaultValue, parentId) => {

  let items = {
    placeholder: field.placeholder, 
    onChange: onChange, 
    name: field.id, 
    options: renderParentOptions(parentCategories)
  }

  if (field.id === 'parent_id' && parentCategories) {
    const value = defaultValue ? defaultValue : parentId
    const currentParent = parentCategories[value];

    if (currentParent) {
      items['value'] = { label: currentParent.name, value: value } 
    }
  }

  return <Select {...items} />
}

const renderFields = (errors, onChange, parentCategories, existingCategory, parentId) => {
  return _.map(FIELDS, (field, key) => {
    const defaultValue = fieldValue(field.id, existingCategory);

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
            defaultValue={defaultValue}
          />
        : field.type === 'textarea' ?
          <TextArea 
            placeholder={field.label} 
            id={key}
            name={field.id}
            onChange={onChange}
            rows={4}
            defaultValue={defaultValue}
          />
        :
          renderSelect(field, onChange, parentCategories, defaultValue, parentId)
        } 
      </Form.Item>
    );
  });
}

export default ({ onSubmit, onChange, errors, parentCategories, existingCategory, parentId }) => (
  <Container>
    <Row style={{ marginBottom: 20 }}>
      <Title>{existingCategory ? 'Editar Categoria' : 'Adicionar Categoria'}</Title>
    </Row>
    <Row>
      <Form onSubmit={onSubmit}>
        {
          renderFields(errors, onChange, parentCategories, existingCategory, parentId)
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