const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateServiceInput(data) {

  let errors = {};

  console.log(`Validation service ${JSON.stringify(data)}`)

  data.label = !isEmpty(data.label) ? data.label : '';
  data.category = !isEmpty(data.category) ? data.category : '';
  data.tags = !isEmpty(data.tags) ? data.tags : [];
  data.description = !isEmpty(data.description) ? data.description : '';
  data.equipments = !isEmpty(data.equipments) ? data.equipments : [];


  if (Validator.isEmpty(data.label)) {
    errors.label = 'Un label est requis';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Veuillez sélectionner une catégorie';
  }

  if (!data.location.alfred && !data.location.client && !data.location.visio) {
    errors.location = 'Sélectionnez au moins un lieu de réalisation';
  }

  if (!data.professional_access && !data.particular_access) {
    errors.access = 'Le service ne peut être accessible à personne'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
