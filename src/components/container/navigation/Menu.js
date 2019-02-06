import _ from 'lodash';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Menu as AntMenu, Icon } from 'antd';

import { pathConstants } from '../../../constants';

const MENU_ITEMS = {
  dashboard: {
    key: 1,
    icon: 'dashboard',
    text: 'Dashboard',
    path: '/dashboard'
  },
  comparativo: {
    key: 2,
    icon: 'line-chart',
    text: 'Comparativo',
    path: '/analytics'
  },
  produtos: {
    key: 3,
    icon: 'shopping-cart',
    text: 'Produtos',
    path: '/products'
  },
  lojas: {
    key: 4,
    icon: 'shopping',
    text: 'Lojas',
    path: '/stores'
  },
  categorias: {
    key: 5,
    icon: 'pushpin',
    text: 'Categorias',
    path: '/categories'
  }
}

class Menu extends Component {

  categorize = (pathName) => {
    if (pathName.includes('dashboard')) {
      return pathConstants.DASHBOARD;
    }

    if (pathName.includes('analytics')) {
      return pathConstants.ANALYTICS;
    }

    if (pathName.includes('product')) {
      return pathConstants.PRODUCTS;
    }

    if (pathName.includes('store')) {
      return pathConstants.STORES;
    }

    if (pathName.includes('catego')) {
      return pathConstants.CATEGORIES;
    }
  }

  resolveSelectedKey = (pathName) => {
    switch(this.categorize(pathName)) {
      case pathConstants.ANALYTICS:
        return '2';
      case pathConstants.PRODUCTS:
        return '3';
      case pathConstants.STORES:
        return '4';
      case pathConstants.CATEGORIES:
        return '5'
    default:
      return '1';
    }
  }

  renderMenuItems = () => {
    return _.map(MENU_ITEMS, (item) => {
      return (
        <AntMenu.Item key={item.key}>
          <Link to={item.path}>
            <Icon type={item.icon} />
            <span>{item.text}</span>
          </Link>
        </AntMenu.Item>
      )
    });
  }

  render() {
    const { pathName } = this.props;

    return (
      <AntMenu 
        theme="dark" 
        mode="inline" 
        defaultSelectedKeys={['1']}
        selectedKeys={[this.resolveSelectedKey(pathName)]}
      >
        {this.renderMenuItems()}
      </AntMenu>
    );
  }
}

export default Menu;