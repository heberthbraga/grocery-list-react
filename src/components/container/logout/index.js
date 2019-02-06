import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Logout from './Logout';

import { authActions } from '../../../actions';

const mapDispatchToProps = dispatch => ({
  actions: {
    auth: bindActionCreators(authActions, dispatch)
  }
});

export default connect(null, mapDispatchToProps)(Logout);