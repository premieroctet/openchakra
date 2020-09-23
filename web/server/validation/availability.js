const Validator = require('validator')
const isEmpty = require('./is-empty')
const moment = require('moment')

module.exports = function validateAvailability(data, recurrent) {
    let errors = {};

    if (recurrent) {
      if (!data.startDate) {
        errors.startDate='La date de début est requise'
      }
      if (!data.endDate) {
        errors.endDate='La date de fin est requise'
      }
      if (moment(data.endDate).isBefore(moment(data.startDate))) {
        errors.endDate='Date de fin incorrecte'
      }

      if (!data.days || data.days.length==0) {
        errors.days='Les jours travaillés sont requis'
      }
    }
    else {
      if (!data.punctuals) {
        errors.punctuals='La date de disponibilité est requise'
      }
      if (data.available==undefined) {
        errors.available='La disponibilité/indisponibilité est requise'
      }
    }

    if (data.available && (!data.timelapses || data.timelapses.length==0)) {
      errors.timelapses='Les horaires travaillés sont requis'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
