import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../../../actions';

import Login, { validate } from './Login';

const mapDispatchToProps = dispatch => ({
  actions: {
    auth: bindActionCreators(authActions, dispatch)
  }
});

export default reduxForm({
  form: 'formSignin',
  validate
})( connect(null, mapDispatchToProps)(Login) );