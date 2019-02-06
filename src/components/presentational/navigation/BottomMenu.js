import React from 'react';

import styled from 'styled-components'
import { Menu as AntMenu } from 'antd';

import Logout from '../../container/logout';

const BottomMenu = styled(AntMenu)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
`

export default () => (
  <BottomMenu theme='dark'>
    <BottomMenu.Item key='/logout'>
      <Logout />
    </BottomMenu.Item>
  </BottomMenu>
);