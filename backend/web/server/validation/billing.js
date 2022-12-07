const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBillingInput(data) {
  let errors = {};


  data.label = !isEmpty(data.label) ? data.label : '';


  if (Validator.isEmpty(data.label)) {
    errors.label = 'Un label est requis';
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
};
