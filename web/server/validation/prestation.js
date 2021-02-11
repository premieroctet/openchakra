const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePrestationInput(data) {
  let errors = {};

  data.label = !isEmpty(data.label) ? data.label : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.billing = !isEmpty(data.billing) ? data.billing : [];
  data.service = !isEmpty(data.service) ? data.service : '';
  data.filter_presentation = !isEmpty(data.filter_presentation) ? data.filter_presentation : '';
  data.search_filter = !isEmpty(data.search_filter) ? data.search_filter : '';
  data.calculating = !isEmpty(data.calculating) ? data.calculating : '';
  data.job = !isEmpty(data.job) ? data.job : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.tags = !isEmpty(data.tags) ? data.tags : [];


  if (Validator.isEmpty(data.label)) {
    errors.label = 'Un label est requis';
  }

  if (Validator.isEmpty(data.service)) {
    errors.service = 'Veuillez sélectionner un service';
  }

  if (data.billing.length==0) {
    errors.billing = 'Veuillez sélectionner au moins une méthode de facturation';
  }

  if (Validator.isEmpty(data.job)) {
    errors.job = 'Veuillez sélectionner un métier';
  }

  if (!data.professional_access && !data.particular_access) {
    errors.access = 'Le service ne peut être accessible à personne'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
