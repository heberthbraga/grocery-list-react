import React, { Component } from 'react';

import { SearchForm } from '../../../presentational/forms';

class SearchBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: []
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = (value) => {
    const { productActions } = this.props;

    productActions.searchProducts(value).then(({data}) => {
      this.setState({
        dataSource: data ? data : []
      })
    });
  }

  render() {
    const { dataSource } = this.state;

    return (
      <SearchForm 
        onSearch={this.handleSearch}
        dataSource={dataSource} 
      />
    );
  }
}

export default SearchBox;