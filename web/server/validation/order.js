const lodash=require('lodash')

function validateOrder(data) {

  let errors = {}

  /**
  if (lodash.isEmpty(data.reference)) {
    errors.label = 'Une référence est requise'
  }

  if (lodash.isEmpty(data.address)) {
    errors.label = 'Une adresse est requise'
  }
  */
  return {
    errors,
    isValid: lodash.isEmpty(errors),
  }
}

module.exports={validateOrder}
