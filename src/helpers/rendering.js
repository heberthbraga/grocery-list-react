import _ from 'lodash';

export const renderCategories = (categories) => {
  return _.map(categories, 'name').join(', ');
};