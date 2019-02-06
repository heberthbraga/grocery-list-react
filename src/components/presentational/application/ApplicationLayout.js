import React from 'react';

import styled from 'styled-components';
import { Layout } from 'antd';

import Sidebar from '../../container/navigation/Sidebar';

const { Content } = Layout;

const Container = styled(Layout).attrs({
  className: 'ant-layout-has-sider'
})`
  min-height: 600px;
  height: 100vh;
  background-color: #FFF;
`

export default ({ children, pathName }) => (
  <Container>
    <Sidebar pathName={pathName} />
    <Content>
      <div style={{ background: '#fff', height: '100%' }}>
        {children}
      </div>
    </Content>
  </Container>
);