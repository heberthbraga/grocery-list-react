import _ from 'lodash';
import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { CategoryForm } from '../../../presentational/forms';

class NewCategory extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: null,
      description: null,
      parent_id: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { categoryActions } = this.props;

    categoryActions.fetchParentCategories().then(({data}) => {
      this.setState({parentCategories: _.mapKeys(data, 'id')});
    });
  }

  handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      this.setState({ [name]: value })
    } else {
      this.setState({ category_id: e });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { categoryActions } = this.props;

    categoryActions.createCategory(this.state);
  }

  render() {
    const { errors } = this.props;
    const parentCategories = this.state.parentCategories;

    return (
      <Loading loading={!parentCategories}>
        <CategoryForm 
          onSubmit={this.handleSubmit} 
          onChange={this.handleChange}
          errors={errors} 
          parentCategories={parentCategories}
          existingCategory={null}
        />
      </Loading>
    );
  }
}

export default NewCategory;