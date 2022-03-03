const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateFeurstProspect(data) {
  let errors = {}

  data.firstname = data.firstname || ''
  data.name = data.name || ''
  data.email = data.email || ''
  data.phone = data.phone || ''
  data.company = data.company || ''


  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'Le prénom doit être renseigné'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Le nom doit être renseigné'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Le mail doit être renseigné'
  }
  else if (!Validator.isEmail(data.email)) {
    errors.email = 'Le mail est incorrect'
  }

  if (isEmpty(data.phone)) {
    errors.phone = 'Un numéro de téléphone doit être renseigné'
  }
  else if (!Validator.isMobilePhone(data.phone, ['fr-FR'])) {
    errors.phone = 'Numéro incorrect. Ex : 0623350036'
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'La compagnie doit être renseignée'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
