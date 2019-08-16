import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Analytics from './Analytics';

import { categoryActions } from '../../../../actions';

const mapDispatchToProps = dispatch => ({
  categoryActions: bindActionCreators(categoryActions, dispatch)
});

export default connect(state=>state, mapDispatchToProps)(Analytics);