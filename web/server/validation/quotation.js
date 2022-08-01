const lodash=require('lodash')

function validateQuotation(data) {
  let errors = {}

  if (lodash.isEmpty(data.user)) {
    errors.label = 'Un utilisateur est requis'
  }

  return {
    errors,
    isValid: lodash.isEmpty(errors),
  }
}

module.exports={validateQuotation}
