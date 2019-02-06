import _ from 'lodash';
import React, { Fragment } from 'react';

import {
  Form, Input, Select
} from 'antd';

import { states, hasFormError } from '../../../helpers';

const { Option } = Select;

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

const renderFields = (errors, onChange) => {
  return _.map(FIELDS, (field, key) => {
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
          /> 
          :
          <Select
            placeholder={field.label}
            onChange={onChange}
            name={field.id}
          >
            {
              _.map(states, (state, key) => {
                return <Option key={key} value={key}>{state}</Option>;
              })
            }
          </Select>
        }
      </Form.Item>
    )
  });
}

export default ({ onChange, errors }) => (
  <Fragment>
    {
      renderFields(errors, onChange)
    }
  </Fragment>
);