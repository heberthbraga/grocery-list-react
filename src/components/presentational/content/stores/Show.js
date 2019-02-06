import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { 
  Row, Col
} from 'antd';

const Container = styled.div`
  padding: 30px;
`
export default ({ store }) => (
  <Container>
    <Row>
      <Col>
        <Link to="/stores" className="btn btn-outline-success pull-left">Voltar</Link>
      </Col>
    </Row>
    <Row>
      <Col>
        <Row>
          {store.name} ({store.fantasy_name})
        </Row>
        <Row>
          <a href={`http://${store.website}`} target='_blank' rel='noopener noreferrer' >
            {store.website}
          </a>
        </Row>
        <Row>
          <Col sm={1}>
            <Link to='#' className="btn-outline-dark pull-right" title="Editar">
              <i className="fa fa-pencil"></i>
            </Link>
          </Col>
          <Col sm={1}>
            <Link to='#' className="btn-outline-dark pull-left" title="Remover">
              <i className="fa fa-trash"></i>
            </Link>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          {store.address.street}<br/>
          {store.address.city} - {store.address.state}, {store.address.zip}
        </Row>
      </Col>
    </Row>
  </Container>
);