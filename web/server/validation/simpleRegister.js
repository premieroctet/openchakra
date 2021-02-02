const Validator = require('validator');
const isEmpty = require('./is-empty');
const moment = require('moment');
const {ACCOUNT_MIN_AGE}=require('../../utils/consts')
moment.locale('fr');

const validateSimpleRegisterInput = data => {

  console.log(`Validating ${JSON.stringify(data)}`)
  let {errors} = validateEditProfil(data);

  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.zip_code = !isEmpty(data.zip_code) ? data.zip_code : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.google_id = !isEmpty(data.google_id) ? data.google_id : '';
  data.facebook_id = !isEmpty(data.facebook_id) ? data.facebook_id : '';


  if (!(data.google_id || data.facebook_id)) {

    if (Validator.isEmpty(data.password)) {
      errors.password = 'Veuillez saisir un mot de passe';
    }

    if (!Validator.isLength(data.password, {min: 8, max: 30})) {
      errors.password = 'Le mot de passe doit contenir 8 caractères minimum';
    }

    if (Validator.isEmpty(data.password2)) {
      errors.password2 = 'Confirm password field is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = 'Password must match';
    }
  }

  if (Validator.isEmpty(data.address)) {
    console.warn(`Invalid address:${data.adddress}`)
    errors.address = 'Veuillez saisir une adresse';
  }

  if (Validator.isEmpty(data.zip_code)) {
    errors.zip_code = 'Veuillez saisir un code postal';
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = 'Veuillez saisir une ville';
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = 'Veuillez choisir un pays';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateEditProfil = data =>{
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Veuillez saisir un nom';
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'Veuillez saisir un prénom';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Veuillez saisir un email';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email invalide';
  }

  if (!moment(data.birthday).isValid()) {
    errors.birthday = 'Date de naissance invalide';
  }
  if (moment(data.birthday).isValid() && moment(data.birthday).isAfter(moment().subtract(ACCOUNT_MIN_AGE, 'years'))) {
    console.warn(`${data.birthday} ${moment(data.birthday)}<${moment().subtract(ACCOUNT_MIN_AGE, 'years')}`);
    errors.birthday = `Vous devez avoir ${ACCOUNT_MIN_AGE} ans au minimum`
  }
  if (moment(data.birthday).isValid() && moment(data.birthday).isBefore(moment().subtract(150, 'years'))) {
    errors.birthday = 'Date de naissance invalide, merci de saisir l\'année sur 4 chiffres';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {validateSimpleRegisterInput, validateEditProfil};
