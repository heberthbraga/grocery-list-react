import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { productActions } from  '../../../..//actions';

import ShowProduct from './ShowProduct';

const mapDispatchToProps = (dispatch) => {
  return {
    productActions: bindActionCreators(productActions, dispatch)
  }
}

const mapStateToProps = ({ product: products }, ownProps) => {
  return {
    product: products[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowProduct);