import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { categoryActions } from '../../../../actions';

import ShowCategory from './ShowCategory';

const mapDispatchToProps = (dispatch) => {
  return {
    categoryActions: bindActionCreators(categoryActions, dispatch)
  }
}

const mapStateToProps = ({ category: categories }, ownProps) => {
  return {
    category: categories[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCategory);