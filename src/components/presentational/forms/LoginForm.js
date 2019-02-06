import React from 'react';

import { Field } from 'redux-form'
import { TextField } from 'redux-form-antd';
import { Icon, Button } from 'antd';

import './Login.css';

const renderFields = (formFields, onChangeLogin) => {
  return Object.keys(formFields).map((fieldName, index) => {
    const fieldConfig = formFields[fieldName];

    return (
      <Field 
        key={index} 
        id={fieldConfig.id}
        name={fieldName} 
        prefix={<Icon type={fieldConfig.icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
        component={TextField} 
        type={fieldConfig.type}
        placeholder={fieldConfig.label}
        onChange={value => onChangeLogin(fieldName, value)}
      />
    )
  });
}

export default ({
  formTitle, 
  formFields,
  onLogin, 
  onChangeLogin, 
  errorMessage
}) => (
  <form className="login-form" onSubmit={onLogin}>
    <h2>{formTitle}</h2>

    { renderFields(formFields, onChangeLogin) }

    {errorMessage &&
      <p className="handle-error">{errorMessage}</p>
    }

    <Button type="primary" htmlType="submit" className="login-form-button">
      Log in
    </Button>
  </form>
);