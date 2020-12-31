const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterAdminInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';


  if (Validator.isEmpty(data.name)) {
    errors.name = 'Veuillez saisir un nom';
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'Veuillez saisir un prénom';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Veuillez saisir une adresse email';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email invalide';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Veuillez saisir un mot de passe';
  }

  if (!Validator.isLength(data.password, {min: 8, max: 30})) {
    errors.password = 'Le mot de passe doit contenir au moins 8 charactères';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Veuillez confirmer le mot de passe';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Les mots de passe doivent être identiques';
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Veuillez saisir un numéro de téléphone';
  }

  if (!Validator.isMobilePhone(data.phone, ['fr-FR'])) {
    errors.phone = 'Téléphone invalide';
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
};


