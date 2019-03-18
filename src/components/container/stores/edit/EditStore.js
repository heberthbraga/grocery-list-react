import _ from 'lodash';

import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { StoreForm } from '../../../presentational/forms';

class EditStore extends Component {
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

  componentDidMount() {
    if (!this.props.store) {
      const { storeActions, match: { params: { id } } } = this.props;
      storeActions.fetchStore(id);
    }
  }

  handleChange = (e) => {
    if (e.target) {
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
    } else {
      this.setState({ address: { state: e } })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { storeActions, match: { params: { id } } } = this.props;
    
    const formData = new FormData(e.target);
    const { address } = this.state;
    let storeCopy = Object.assign({}, this.state);

    for (let entry of formData.entries()) {
      const keys = entry[0].split('.');
      
      if (keys.length > 1) {
        const key = keys.pop();
        address[key] = entry[1];
      } else {
        storeCopy[entry[0]] = entry[1];
      }
    }

    storeActions.updateStore(id, storeCopy);
  }

  render() {
    const { existingStore, errors } = this.props;
    console.log(errors);

    return(
      <Loading loading={!existingStore}>
        <StoreForm 
          onSubmit={this.handleSubmit} 
          onChange={this.handleChange} 
          errors={errors}
          existingStore={existingStore}
        />
      </Loading>
    );
  }
}

export default EditStore;