import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { storeActions } from '../../../../actions';

import ShowStore from './ShowStore';

const mapDispatchToProps = (dispatch) => {
  return {
    storeActions: bindActionCreators(storeActions, dispatch)
  }
}

const mapStateToProps = ({ store: stores }, ownProps) => {  
  return {
    store: stores[ownProps.match.params.id]
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ShowStore);