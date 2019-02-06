import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Products from './Products';

import { productActions } from '../../../../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    productActions: bindActionCreators(productActions, dispatch)
  }
}

export default connect((state => state), mapDispatchToProps)(Products);