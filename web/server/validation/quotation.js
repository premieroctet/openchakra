const lodash=require('lodash')

function validateQuotation(data) {
  let errors = {}

  if (lodash.isEmpty(data.address)) {
    errors.label = 'Une adresse est requise'
  }

  if (lodash.isEmpty(data.user)) {
    errors.label = 'Un utilisateur est requis'
  }

  return {
    errors,
    isValid: lodash.isEmpty(errors),
  }
}

module.exports={validateQuotation}
