import _ from 'lodash';

export const fieldValue = (fieldId, targetObject) => {
  let value = '';

  if (targetObject) {
    value = _.map(targetObject, function(value, key) {
      return key === fieldId ? value : '';
    });
  }

  return _.trim(value, ',');
}