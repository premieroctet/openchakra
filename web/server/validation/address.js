const lodash=require('lodash')

const validateAddress = data => {
  let errors = {}

  if (lodash.isEmpty(data.address)) {
    errors.address='Une adresse est requise'
  }
  if (lodash.isEmpty(data.city)) {
    errors.city='Une ville est requise'
  }
  if (lodash.isEmpty(data.zip_code)) {
    errors.zip_code='Un code postal est requis'
  }
  if (lodash.isEmpty(data.country)) {
    errors.country='Un pays est requis'
  }

  return {
    errors,
    isValid: lodash.isEmpty(errors),
  }
}

module.exports=validateAddress
