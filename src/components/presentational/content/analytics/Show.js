import _ from 'lodash';

import React from 'react';

import styled from 'styled-components';
import { 
  Row
} from 'antd';

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const Container = styled.div`
  padding: 30px;
`

const Title = styled.h1`
  font-size: 1.5em;
`;

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const renderData = (itemsHistory) => {
  return _.map(itemsHistory, (item, index) => {
    console.log(item)
  });
}

const renderChart = (itemsHistory) => {
  renderData(itemsHistory)
  return (
    <BarChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  )
}

const renderHistory = (items) => {
  return _.map(items, (item, index) => {
    return (
      <Row key={index} style={{marginBottom: 20}}>
        <Row>
          <Title>{item.name}</Title>
        </Row>
        <Row>
          {
            renderChart(item.items_history)
          }
        </Row>
      </Row>
    )
  });
}

export default ({ itemsHistory }) => (
  <Container>
    {
      renderHistory(itemsHistory)
    }
  </Container>
);