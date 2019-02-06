import _ from 'lodash';
import React, { Component } from 'react';

import { capitalizedText } from '../../../helpers';
import { LoginForm } from '../../presentational/forms';

const FIELDS = {
  email: {
    type: 'text',
    id: 'inputEmail',
    label: 'Email',
    icon: 'user'
  },
  password: {
    type: 'password',
    id: 'inputPassword',
    label: 'Senha',
    icon: 'lock'
  }
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      response: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeLogin = (attr, value) => {
    this.setState({ [attr]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });

    const values = {
      username: this.state.email, 
      password: this.state.password
    };

    const { actions } = this.props;
    
    actions.auth.signIn(values);
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <LoginForm 
        formId="formSignin"
        formTitle='Comparativo de Preços' 
        formFields={FIELDS} 
        onLogin={this.handleSubmit}
        onChangeLogin={this.onChangeLogin}
        errorMessage={errorMessage}
      />
    );
  }
}

export const validate = (values) => {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      const capitalizedField = capitalizedText(field);
      errors[field] = `${capitalizedField} can't be blank`;
    }
  });

  return errors;
}

export default Login;