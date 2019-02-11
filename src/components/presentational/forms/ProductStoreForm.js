import React from 'react';

import {
  Form, InputNumber, Button, Row, Col
} from 'antd';

export default ({ product, onSubmit, onChange }) => (
  <Form name={`formProductStore${product.id}`} onSubmit={onSubmit} style={{flex: 1}}>
    <Row>
      <Col sm={14}>
        {product.name}
      </Col>
      <Col sm={4}>
        <InputNumber 
          name="price"
          default={0}
          placeholder="R$ 0,00"
          onChange={onChange}
        />
      </Col>
      <Col sm={6} style={{textAlign: 'right'}}>
        <Button type="primary" htmlType="submit">Add</Button>
      </Col>
    </Row>
  </Form>
);