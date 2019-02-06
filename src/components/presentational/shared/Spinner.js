import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

export default () => (
  <Container>
    <Spin size='large'/>
  </Container>
);