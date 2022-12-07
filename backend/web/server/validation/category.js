const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateCategoryInput(data) {
  let errors = {}


  data.label = !isEmpty(data.label) ? data.label : ''
  data.description = !isEmpty(data.description) ? data.description : ''

  if (Validator.isEmpty(data.label)) {
    errors.label = 'Un label est requis'
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Une description est requise'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
