import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { productStoreActions } from '../../../../actions';

import { Form } from 'antd';

import NewProductStore from './NewProductStore';

const mapDispatchToProps = dispatch => ({
  productStoreActions: bindActionCreators(productStoreActions, dispatch)
});

const mapStateToProps = (state) => {
  const { data, errors } = state.productStore;
  return {
    productStore: data,
    errors
  }
}


const ProductStoreFormObj = Form.create()(NewProductStore);
export default connect(mapStateToProps, mapDispatchToProps)(ProductStoreFormObj);