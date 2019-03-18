import React from 'react';

import { Icon } from 'antd';

export default ({ id, targetAction }) => (
  <Icon 
    type="delete"
    onClick={() => { if (window.confirm('Você tem certeza?')) targetAction(id) }}
    style={{ cursor: 'pointer', color: 'rgba(0,0,0,.25)', fontSize: '16px' }}
  />
);