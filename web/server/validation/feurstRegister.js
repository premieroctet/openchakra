const Validator = require('validator')
const {CUSTOMER_ADMIN, ROLES} = require('../../utils/feurst/consts')
const isEmpty = require('./is-empty')

module.exports = function validateFeurstRegister(data) {
  let errors = {}

  data.firstname = data.email || ''
  data.name = data.email || ''
  data.email = data.email || ''
  data.role = data.role || ''
  data.company = data.company || ''


  if (Validator.isEmpty(data.firstname)) {
    errors.email = 'Le prénom doit être renseigné'
  }
  if (Validator.isEmpty(data.name)) {
    errors.email = 'Le nom doit être renseigné'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Le mail doit être renseigné'
  }
  else if (!Validator.isEmail(data.email)) {
    errors.email = 'Le mail est incorrect'
  }

  if (Validator.isEmpty(data.role)) {
    errors.role = 'Le rôle doit être renseigné'
  }
  else if (!ROLES[data.role]) {
    errors.role = 'Le rôle doit être renseigné'
  }

  if (data.role==CUSTOMER_ADMIN && Validator.isEmpty(data.company)) {
    errors.company='La compagnie doit être renseignée'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
