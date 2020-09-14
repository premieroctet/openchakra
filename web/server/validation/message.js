const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMessageInput(data) {
  let errors = {};


  data.subject = !isEmpty(data.subject) ? data.subject : '';
  data.content = !isEmpty(data.content) ? data.content : '';


  if (Validator.isEmpty(data.subject)) {
    errors.subject = 'Subject field is required';
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = 'Content field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
};
