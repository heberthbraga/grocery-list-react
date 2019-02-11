import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { storeActions, productActions } from '../../../../actions';

import ShowStore from './ShowStore';

const mapDispatchToProps = (dispatch) => {
  return {
    storeActions: bindActionCreators(storeActions, dispatch),
    productActions: bindActionCreators(productActions, dispatch)
  }
}

const mapStateToProps = ({ store: stores, product: { products } }, ownProps) => {
  return {
    store: stores[ownProps.match.params.id],
    products: products
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ShowStore);