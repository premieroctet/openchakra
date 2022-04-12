const mongoose = require('mongoose')
const lodash=require('lodash')
const checkZipCode=require('i18n-zipcodes')

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

function validateOrderItem(data) {

  let errors = {}

  if (!mongoose.isValidObjectId(data.product)) {
    errors.product = "L'article est invalide"
  }

  if (!(lodash.isInteger(data.quantity) && data.quantity>0)) {
    errors.quantity = 'La quantité est invalide'
  }

  return {
    errors,
    isValid: lodash.isEmpty(errors),
  }
}

const validateZipCode = zipcode => {
  let errors = {}
  if (!checkZipCode('fr', String(zipcode))) {
    errors.zipcode=`Le code postal est invalide`
  }
  return {
    errors,
    isValid: lodash.isEmpty(errors),
  }
}

module.exports={validateOrder, validateOrderItem, validateZipCode}
