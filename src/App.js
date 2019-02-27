import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers';

import Routes from './routes';

class App extends Component {
  render() {
    const { isAuthenticated, errorMessage } = this.props;

    return (
      <Router history={history}>
        <Routes 
          isAuthenticated={isAuthenticated} 
          errorMessage={errorMessage}
        />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App);