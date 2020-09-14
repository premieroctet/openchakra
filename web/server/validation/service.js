const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateServiceInput(data) {

  let errors = {};

  console.log('Validation service:' + JSON.stringify(data));

  data.label = !isEmpty(data.label) ? data.label : '';
  data.category = !isEmpty(data.category) ? data.category : '';
  data.tags = !isEmpty(data.tags) ? data.tags : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.equipments = !isEmpty(data.equipments) ? data.equipments : '';


  if (Validator.isEmpty(data.label)) {
    errors.label = 'Un label est requis';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Veuillez sélectionner une catégorie';
  }

  if (Validator.isEmpty(data.tags)) {
    errors.tags = 'Veuillez sélectionner au moins 1 tags';
  }

  if (Validator.isEmpty(data.equipments)) {
    errors.equipments = 'Veuillez sélectionner au moins 1 équipement';
  }

  /**
   if(Validator.isEmpty(data.description)) {
        errors.description = 'Une description est requise';
    }
   */

  if (data['location.alfred'] == 'false' && data['location.home'] == 'false' && data['location.visio'] == 'false') {
    errors.location = 'Sélectionnez au moins un lieu de réalisation';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
