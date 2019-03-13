import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Highlights from './Highlights';

import { productActions } from '../../../../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    productActions: bindActionCreators(productActions, dispatch)
  }
}

export default connect((state => state), mapDispatchToProps)(Highlights);