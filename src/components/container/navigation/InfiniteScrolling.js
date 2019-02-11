import React, { Component } from 'react';

import InfiniteScroll from 'react-infinite-scroller';

import { Spin } from 'antd';

import styled from 'styled-components';

const InfiniteContainer = styled.div`
  overflow: auto;
  padding: 8px 2px;
`;

const InfiniteLoadingContainer = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
`;

class InfiniteScrolling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      hasMore: true,
      size: 0
    }
  }

  componentDidMount() {
    const { data, size } = this.props;

    this.setState({
      data: data,
      size: size
    });
  }

  handleInfiniteOnLoad = () => {
    const { data, size } = this.state;

    this.setState({
      loading: true
    });

    if (data.length > (size - 1)) {
      this.setState({
        loading: false,
        hasMore: false
      });

      return;
    }
  }

  render() {
    const { children } = this.props;
    const { loading, hasMore } = this.state;

    return (
      <InfiniteContainer>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          {children}
          {loading && hasMore && (
            <InfiniteLoadingContainer>
              <Spin />
            </InfiniteLoadingContainer>
          )}
        </InfiniteScroll>
      </InfiniteContainer>
    );
  }
}

export default InfiniteScrolling;