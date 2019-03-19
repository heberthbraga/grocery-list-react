import _ from 'lodash';

import React, { Component } from 'react';

import { Loading } from '../../../presentational/shared';
import { CategoryForm } from '../../../presentational/forms';

class EditCategory extends Component {
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
    if (!this.props.category) {
      const { categoryActions, match: { params: { id } } } = this.props;

      categoryActions.fetchParentCategories().then(({data}) => {
        this.setState({parentCategories: _.mapKeys(data, 'id')});
      });

      categoryActions.fetchCategory(id);
    }
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

    const { categoryActions, match: { params: { id } } } = this.props;
    const formData = new FormData(e.target);
    let storeCopy = Object.assign({}, this.state);

    for (let entry of formData.entries()) {
      storeCopy[entry[0]] = entry[1];
    }

    categoryActions.updateCategory(id, storeCopy);
  }

  render() {
    const { existingCategory, errors } = this.props;
    const parentCategories = this.state.parentCategories;

    return(
      <Loading loading={!existingCategory}>
        <CategoryForm 
          onSubmit={this.handleSubmit} 
          onChange={this.handleChange} 
          errors={errors}
          parentCategories={parentCategories}
          existingCategory={existingCategory}
        />
      </Loading>
    );
  }
}

export default EditCategory;