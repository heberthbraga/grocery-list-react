import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NewProduct from './NewProduct';

import { Form } from 'antd';

import { categoryActions, productActions } from '../../../../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    categoryActions: bindActionCreators(categoryActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch)
  }
}

const mapStateToProps = (state, ownProps) => {
  const { categories } = state.category;
  const { data, errors } = state.product;

  return {
    categories: categories,
    product: data,
    errors
  }
}

const ProductFormObj = Form.create({ name: 'formProduct' })(NewProduct);
export default connect(mapStateToProps, mapDispatchToProps)(ProductFormObj);