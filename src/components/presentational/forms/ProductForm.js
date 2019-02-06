import _ from 'lodash';
import React from 'react';

import styled from 'styled-components';
import { 
  Row, Form, Input, Button, Upload, Icon, Select
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

const FIELDS = {
  category_ids: {
    type: 'select',
    id: 'categories',
    label: 'Categorias',
    placeholder: 'Selecione Categorias',
    required: true
  },
  name: {
    type: 'text',
    id: 'name',
    label: 'Nome',
    placeholder: 'Nome',
    required: true
  },
  picture: {
    type: 'upload',
    id: 'picture',
    label: 'Imagem',
    placeholder: '',
    required: false
  }
}

const { Option, OptGroup } = Select;

const renderCategoryOptions = (categories) => {
  return _.map(categories, (category, key) => {
    const subcategories = category.subcategories;

    if (subcategories.length > 0) {
      return (
        <OptGroup label={category.name} key={key}>
          {
            _.map(subcategories, (subcategory, subKey) => {
              return <Option key={subKey} value={subcategory.id}>{subcategory.name}</Option>
            })
          }
        </OptGroup>
      );
    } else if (!category.subcategory) {
      return (
        <Option key={key} value={category.id}>{category.name}</Option>
      );
    }
  })
}

const renderFields = (errors, onChange, categories) => {
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
            placeholder={field.placeholder} 
            id={key}
            name={field.id}
            onChange={onChange}
          />
          : field.type === 'select' ?
          <Select
            mode="multiple"
            placeholder={field.placeholder}
            onChange={onChange}
            name={key}
          >
            {
              renderCategoryOptions(categories)
            }
          </Select>
          :
          <Upload name={field.id} listType="picture">
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
        }
      </Form.Item>
    )
  });
}

export default ({ categories, onSubmit, onChange, errors }) => (
  <Container>
    <Row style={{ marginBottom: 20 }}>
      <Title>Adicionar Produto</Title>
    </Row>
    <Row>
      <Form onSubmit={onSubmit}>
        {
          renderFields(errors, onChange, categories)
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