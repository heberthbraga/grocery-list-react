import React, { Component } from 'react';

import styled from 'styled-components';
import { Row } from 'antd';

import SearchBox from './search_box';
import Highlights from '../products/highlights';

const Container = styled.div`
  height: 100%;
  width: 100%;
`

class Dashboard extends Component {

  render() {
    return (
      <Container>
        <Row type="flex" justify="center">
          <SearchBox />
        </Row>
        <Row>
          <Highlights />
        </Row>
      </Container>
    );
  }
}

export default Dashboard;