const Validator = require('validator')

function validateProduct(data) {
  let errors = {}

  if (Validator.isEmpty(data.reference)) {
    errors.reference = 'Une référence est requise'
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Une description est requise'
  }
  if (isNaN(parseInt(data.weight))) {
    errors.weight = 'Un poids est requis'
  }
  else if (parseInt(data.weight)<=0) {
    errors.weight = 'Le poids doit être positif'
  }

  if (isNaN(parseFloat(data.price))) {
    errors.price = 'Un prix est requis'
  }
  else if (parseFloat(data.price)<=0) {
    errors.price = 'Le prix doit être positif'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

module.exports={validateProduct}
