import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchBox from './SearchBox';

import { productActions } from '../../../../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    productActions: bindActionCreators(productActions, dispatch)
  }
}

export default connect((state => state), mapDispatchToProps)(SearchBox);