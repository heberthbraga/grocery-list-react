import React, { Component } from 'react';

import styled from 'styled-components';
import { Icon } from 'antd';

const Container = styled.div`
  width: 100%;
  padding: 12px 14px 12px 12px;
  background: #002140;
  text-align: right;
`

const Span = styled.span`
  width: 100%;
  text-align: left;
  color: #FFF; 
  font-size: 16px; 
  margin: 0 40px 5px 0
`

const NavIcon = styled(Icon)`
  font-size: 16pt;
  color: #fff;
  cursor: pointer;
`

class NavControl extends Component {
  render() {
    const { collapsed, toggleNavigation } = this.props;

    return (
      <Container>
        <Span 
          style={{display: collapsed ? 'none' : 'inline', cursor: 'pointer' }}
        >
          Supermercado
        </Span>
        <NavIcon type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggleNavigation} />
      </Container>
    );
  }
}

export default NavControl;