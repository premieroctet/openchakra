const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';


  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'Firstname field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, {min: 8, max: 30})) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Password must match';
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone field is required';
  }

  if (!Validator.isMobilePhone(data.phone, ['fr-FR'])) {
    errors.phone = 'Invalid phone number';
  }

  if (!isEmpty(data.zip_code)) {
    if (!Validator.isPostalCode(data.zip_code, 'FR')) {
      errors.zip_code = 'Invalid zip code';
    }
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
};


