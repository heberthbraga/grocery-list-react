import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { categoryActions } from '../../../../actions';

import { Form } from 'antd';

import NewCategory from './NewCategory';

const mapDispatchToProps = dispatch => ({
  categoryActions: bindActionCreators(categoryActions, dispatch)
});

const mapStateToProps = (state) => {
  const { data, errors } = state.category;
  return {
    category: data,
    errors
  }
}

const CategoryFormObj = Form.create({ name: 'formCategory' })(NewCategory);
export default connect(mapStateToProps, mapDispatchToProps)(CategoryFormObj);