import React from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Icon, Button } from 'antd';

export default ({ target, title }) => (
  <Row type="flex" align="bottom" style={{ marginBottom: 20 }}>
    <Col sm={12} >
      <Link to={target}>
        <Button size="large">{title}</Button>
      </Link>
    </Col>
    <Col sm={12} style={{textAlign: 'right'}}>
      <Link to='#' title="Filtro" >
        <Icon type="filter" style={{ color: 'rgba(0,0,0,.25)', fontSize: '24px' }} />
      </Link>
    </Col>
  </Row>
);