import React, { Component } from 'react';

import { StoreForm } from '../../../presentational/forms';

class NewStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      fantasy_name: null,
      website: null,
      logo: null,
      address: {
        street: null,
        city: null,
        state: null,
        zip: null
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const { address } = this.state;

    let storeCopy = Object.assign({}, this.state);
    const keys = name.split('.');

    if (keys.length > 1) {
      const key = keys.pop();
      address[key] = value;
    } else {
      storeCopy[name] = value;
    }

    this.setState(storeCopy);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log("Creating store");
    
    const { storeActions } = this.props;

    storeActions.createStore(this.state);
  }

  render() {
    const { errors } = this.props;

    return (
      <StoreForm 
        onSubmit={this.handleSubmit} 
        onChange={this.handleChange} 
        errors={errors}
      />
    );
  }
}

export default NewStore;