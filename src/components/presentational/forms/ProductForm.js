import _ from 'lodash';
import React from 'react';

import styled from 'styled-components';
import { 
  Row, Form, Input, Button, Upload, Icon, InputNumber
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
  quantity: {
    type: 'number',
    id: 'quantity',
    label: 'Quantidade',
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

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const renderCategoryOptions = (categories) => {
  return _.map(categories, (category) => {
    const subcategories = category.subcategories;

    if (subcategories.length > 0) {
      return( {
        label: category.name,
        options:  _.map(subcategories, (subcategory) => {
          return { label: subcategory.name, value: subcategory.id };
        })
        }
      )
    } else {
      if (!category.subcategory) {
        return(
          {
            label: category.name, value: category.id
          }
        )
      } else {
        return {}
      }
    }
  });
}

const renderSelect = (onChange, key, categories, existingProduct, defaultValue) => {
  let items = {
    placeholder: 'Selecione as categorias', 
    onChange: onChange, 
    name: key,
    options: _.reject(renderCategoryOptions(categories), _.isEmpty)
  }

  return (
    <Select 
      formatGroupLabel={formatGroupLabel}
      {...items}
    />
  )
}

const renderFields = (errors, onChange, categories, existingProduct) => {
  return _.map(FIELDS, (field, key) => {
    let value = fieldValue(field.id, existingProduct);
    
    if (field.id === 'categories') {
      value = _.map(existingProduct.categories, (category) => {
        return { label: category.name, value: category.id }
      });
    }

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
            defaultValue={value}
          />
          : field.type === 'select' ?
            renderSelect(onChange, key, categories, existingProduct, value)
          : field.type === 'number' ?
          <InputNumber 
            id={key}
            name={field.id}
            onChange={onChange}
            defaultValue={value}
          />
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

export default ({ categories, onSubmit, onChange, errors, existingProduct }) => (
  <Container>
    <Row style={{ marginBottom: 20 }}>
      <Title>{existingProduct ? 'Editar Produto' : 'Adicionar Produto'}</Title>
    </Row>
    <Row>
      <Form onSubmit={onSubmit}>
        {
          renderFields(errors, onChange, categories, existingProduct)
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