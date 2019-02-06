import React from 'react';

import styled from 'styled-components';
import { Input, Icon } from 'antd';

const Search = Input.Search;

const Container = styled.div`
  width: 540px;
  margin-top: 50px;
  margin-bottom: 50px;
`

export default () => (
  <Container>
    <Search
      prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
      placeholder="Produtos"
      enterButton="Procurar"
      size="large"
      onSearch={value => console.log(value)}
    />
  </Container>
);