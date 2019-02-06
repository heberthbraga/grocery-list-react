import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styled from 'styled-components'
import { Layout } from 'antd';

import { appActions } from '../../../actions';

import Menu from './Menu';
import NavControl from './NavControl';
import { BottomMenu } from '../../presentational/navigation';

const Sider = styled(Layout.Sider)`
  min-height: 600px;
  max-height: 100vh;
  overflow: hidden;
  ul.ant-menu-root:nth-of-type(1) {
    height: calc(100vh - 144px);
    overflow: auto;
  }
`

class Sidebar extends Component {

  render() {
    const { collapsed, appActions: { toggleNavigation }, pathName } = this.props;
    
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <NavControl 
          collapsed={collapsed}
          toggleNavigation={toggleNavigation}
        />
        <Menu pathName={pathName} />
        <BottomMenu />
      </Sider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    collapsed: state.app.collapsed
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);