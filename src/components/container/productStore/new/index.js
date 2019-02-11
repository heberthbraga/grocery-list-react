import { Form } from 'antd';

import NewProductStore from './NewProductStore';

const ProductStoreFormObj = Form.create()(NewProductStore);
export default (ProductStoreFormObj);