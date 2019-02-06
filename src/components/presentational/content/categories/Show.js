import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { 
  Row, List
} from 'antd';

const Container = styled.div`
  padding: 30px;
`

const renderSubCategories = (subcategories) => {
  return _.map(subcategories, 'name');
}

export default ({ category, category: { subcategories } }) => (
  <Container>
    <Row>
      <Link to="/categories" className="btn btn-outline-success pull-left">Voltar</Link>
    </Row>
    <Row className="mt-4">
      <h2>{category.name}</h2>
    </Row>
    <Row>
      {category.description}
    </Row>
    {subcategories.length > 0 && 
      <Row className='mt-4'>
        <List
          bordered
          dataSource={renderSubCategories(subcategories)}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
      </Row>
    }
  </Container>
);