const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePrestationInput(data) {
  let errors = {};


  console.log('Validating prestation:' + JSON.stringify(data));

  data.label = !isEmpty(data.label) ? data.label : '';
  data.billing = isEmpty(data.billing) || data.billing == '[]' ? '' : data.billing;
  data.service = !isEmpty(data.service) ? data.service : '';
  data.filter_presentation = !isEmpty(data.filter_presentation) ? data.filter_presentation : '';
  data.search_filter = !isEmpty(data.search_filter) ? data.search_filter : '';
  data.calculating = !isEmpty(data.calculating) ? data.calculating : '';
  data.job = !isEmpty(data.job) ? data.job : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.tags = !isEmpty(data.tags) ? data.tags : '';


  if (Validator.isEmpty(data.label)) {
    errors.label = 'Un label est requis';
  }

  if (Validator.isEmpty(data.service)) {
    errors.service = 'Veuillez sélectionner un service';
  }

  if (Validator.isEmpty(data.billing)) {
    errors.billing = 'Veuillez sélectionner une méthode de facturation';
  }

  if (Validator.isEmpty(data.filter_presentation)) {
    errors.filter_presentation = 'Veuillez sélectionner un filtre de présentation';
  }

  /**
   if(Validator.isEmpty(data.search_filter)) {
        errors.search_filter = 'Veuillez sélectionner un moins 1 filtre de recherche';
    }
   */

  if (Validator.isEmpty(data.calculating)) {
    errors.calculating = 'Veuillez sélectionner une méthode de calcul';
  }

  if (Validator.isEmpty(data.job)) {
    errors.job = 'Veuillez sélectionner un métier';
  }

  /**
   if(Validator.isEmpty(data.description)) {
        errors.description = 'Veuillez saisir une description';
    }
   */

  /**
   if(Validator.isEmpty(data.tags)) {
        errors.tags = 'Veuillez sélectionner un moins 1 tags';
    }
   */


  return {
    errors,
    isValid: isEmpty(errors),
  };
};
