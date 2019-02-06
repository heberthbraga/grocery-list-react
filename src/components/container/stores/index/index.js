import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Stores from './Stores';

import { storeActions } from '../../../../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    storeActions: bindActionCreators(storeActions, dispatch)
  }
}

export default connect((state => state), mapDispatchToProps)(Stores);