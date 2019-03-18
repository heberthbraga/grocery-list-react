import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EditStore from  './EditStore';

import { Form } from 'antd';

import { storeActions } from '../../../../actions';

const mapDispatchToProps = dispatch => ({
  storeActions: bindActionCreators(storeActions, dispatch)
});

const mapStateToProps = (state, ownProps) => {
  const { store, store: { data, errors } } = state;
  return {
    store: data,
    existingStore: store[ownProps.match.params.id],
    errors
  }
}

const StoreFormObj = Form.create({ name: 'formStore' })(EditStore);
export default connect(mapStateToProps, mapDispatchToProps)(StoreFormObj);