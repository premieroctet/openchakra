const Validator = require('validator')
const lodash=require('lodash')

function validateOrder(data) {

  let errors = {}

  if (Validator.isEmpty(data.reference)) {
    errors.label = 'Une référence est requise'
  }

  if (lodash.isEmpty(data.address)) {
    errors.label = 'Une adresse est requise'
  }

  if (lodash.isEmpty(data.user)) {
    errors.label = 'Un utilisateur est requis'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

module.exports={validateOrder}
