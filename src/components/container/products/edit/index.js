import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form } from 'antd';

import EditProduct from './EditProduct';

import { categoryActions, productActions } from '../../../../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    categoryActions: bindActionCreators(categoryActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch)
  }
}

const mapStateToProps = (state, ownProps) => {
  const { categories } = state.category;
  const { product, product: { data, errors } } = state;

  return {
    existingProduct: product[ownProps.match.params.id],
    categories: categories,
    product: data,
    errors
  }
}

const ProductFormObj = Form.create({ name: 'formProduct' })(EditProduct);
export default connect(mapStateToProps, mapDispatchToProps)(ProductFormObj);