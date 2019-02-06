import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeActions } from '../../../../actions';

import { Form } from 'antd';

import NewStore from './NewStore';

const mapDispatchToProps = dispatch => ({
  storeActions: bindActionCreators(storeActions, dispatch)
});

const mapStateToProps = (state) => {
  const { data, errors } = state.store;
  return {
    store: data,
    errors
  }
}

const StoreFormObj = Form.create({ name: 'formStore' })(NewStore);
export default connect(mapStateToProps, mapDispatchToProps)(StoreFormObj);