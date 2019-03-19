import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EditCategory from  './EditCategory';

import { Form } from 'antd';

import { categoryActions } from '../../../../actions';

const mapDispatchToProps = dispatch => ({
  categoryActions: bindActionCreators(categoryActions, dispatch)
});

const mapStateToProps = (state, ownProps) => {
  const { category, category: { data, errors } } = state;
  return {
    category: data,
    existingCategory: category[ownProps.match.params.id],
    errors
  }
}

const CategoryFormObj = Form.create({ name: 'formCategory' })(EditCategory);
export default connect(mapStateToProps, mapDispatchToProps)(CategoryFormObj);