import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Categories from './Categories';

import { categoryActions } from '../../../../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    categoryActions: bindActionCreators(categoryActions, dispatch)
  }
}

export default connect((state => state), mapDispatchToProps)(Categories);