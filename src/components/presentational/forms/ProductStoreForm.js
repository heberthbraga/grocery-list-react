import React from 'react';

import {
  Form, InputNumber, Button, Row, Col
} from 'antd';

import { hasFormError } from '../../../helpers';

const renderId = (product) => {
  return `price-product-${product.id}`;
}

const handleTargetFieldError = (targetId, product, errors) => {
  return targetId === product.id && hasFormError(true, errors, 'price');
}

export default ({ product, onSubmit, onChange, errors, targetId }) => (
  <Form id={`formProductStore${product.id}`} onSubmit={onSubmit} style={{flex: 1}}>
    <Row>
      <Col span={10} sm={10}>
        {product.name}
      </Col>
      <Col span={10} sm={10}>
        <Form.Item
          key={product.id}
          validateStatus={handleTargetFieldError(targetId, product, errors) ? 'error' : ''}
          help={handleTargetFieldError(targetId, product, errors) ? `${errors['price']}` : ''}
        >
          <InputNumber 
            id={renderId(product)}
            name="price"
            step={0.01}
            placeholder="R$ 0.00"
            onChange={onChange}
          /> 
        </Form.Item>
      </Col>
      <Col span={10} sm={4} style={{textAlign: 'right'}}>
        <Button type="primary" htmlType="submit">Add</Button>
      </Col>
    </Row>
  </Form>
);