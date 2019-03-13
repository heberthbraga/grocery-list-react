import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Input, Button, Icon, AutoComplete } from 'antd';

const Search = Input.Search;
const Option = AutoComplete.Option;

const Container = styled.div`
  width: 540px;
  margin-top: 50px;
  margin-bottom: 50px;
`

const renderOption = (product) => {
  return (
    <Option key={product.id}>
      <Link to={`/product/show/${product.id}`}>
        {product.name}
      </Link>
    </Option>
  );
}

export default ({ onSearch, dataSource }) => (
  <Container>
    <AutoComplete 
      placeholder="Produtos"
      size="large"
      style={{ width: '100%' }}
      dataSource={dataSource.map(renderOption)}
      onSearch={onSearch}
      optionLabelProp="label"
    >
      <Search
        style={{ width: '100%' }} 
        size="large"
      />
    </AutoComplete>
  </Container>
);