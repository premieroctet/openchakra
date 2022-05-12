const Validator = require('validator')
const isEmpty = require('./is-empty')
import {isInternationalPhoneOK} from '../../utils/sms'

module.exports = function validateFeurstProspect(data) {
  let errors = {}

  data.firstname = data.firstname || ''
  data.name = data.name || ''
  data.email = data.email || ''
  data.phone = data.phone || ''
  data.company = data.company || ''
  data.country = data.country || ''
  data.zipcode = data.zipcode || ''


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
  else if (!isInternationalPhoneOK(data.phone)) {
    errors.phone = 'Numéro invalide'
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'La compagnie doit être renseignée'
  }

  
  if (Validator.isEmpty(data.country)) {
    errors.country = 'Le pays doit être renseigné'
  }

  if (!Validator.isEmpty(data.country) && data.country == 'FR') {
    if (Validator.isEmpty(data.zipcode)) {
      errors.zipcode = 'Le code postal doit être renseigné'
    }
    else if (!data.zipcode.match(/[0-9]{5}/)) {
      errors.zipcode = 'Le code postal est incorrect'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
