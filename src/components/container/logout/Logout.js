import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from 'antd';

class Logout extends Component {
  onSignOutClick() {
    const { actions } = this.props;
    actions.auth.signOut();
  }

  render() {
    return (
      <Link to='/' onClick={this.onSignOutClick.bind(this)} >
        <Icon type='logout' />
        <span>Sair</span>
      </Link>
    );
  }
}

export default Logout;