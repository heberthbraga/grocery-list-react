import _ from 'lodash';
import React, { Fragment } from 'react';
import Select from 'react-select';

import {
  Form, Input
} from 'antd';

import { states, hasFormError, fieldValue } from '../../../helpers';

// const { Option } = Select;

const FIELDS = {
  street: {
    type: 'text',
    id: 'address.street',
    label: 'Rua',
    required: true
  },
  city: {
    type: 'text',
    id: 'address.city',
    label: 'Cidade',
    required: true
  },
  state: {
    type: 'select',
    id: 'address.state',
    label: 'Estado',
    required: true
  },
  zip: {
    type: 'text',
    id: 'address.zip',
    label: 'CEP',
    required: true
  }
}

const renderOptions = () => {
  return(
    _.map(states, (state, key) => {
      return { value: key, label: state };
    })
  );
}

const renderFields = (errors, onChange, existingAddress) => {
  return _.map(FIELDS, (field, key) => {
    let fieldId = _.split(field.id, '.')[1];
    let value = fieldValue(fieldId, existingAddress);

    return (
      <Form.Item
        key={key}
        labelCol={{ xs: {span: 14}, sm: {span: 4} }} 
        wrapperCol={{ xs: {span: 14}, sm: {span: 8} }}
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
          <Select
            placeholder='Selecione um Estado'
            onChange={onChange}
            name={field.id}
            value={{ label: states[value], value: value }}
            options={renderOptions()}
          />
        }
      </Form.Item>
    )
  });
}

export default ({ onChange, errors, existingAddress }) => (
  <Fragment>
    {
      renderFields(errors, onChange, existingAddress)
    }
  </Fragment>
);