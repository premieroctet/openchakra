const Validator = require('validator');
const isEmpty = require('./is-empty');
const moment = require('moment');
const {COMPANY_ACTIVITY, COMPANY_SIZE, ACCOUNT_MIN_AGE}=require('../../utils/consts');
moment.locale('fr');

const validateSimpleRegisterInput = data => {

  console.log(`Validating ${JSON.stringify(data)}`)
  let {errors} = validateEditProfile(data);

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

const validateEditProfile = data =>{
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

const validateEditProProfile = data =>{
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.position = !isEmpty(data.position) ? data.position : '';

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

  if (Validator.isEmpty(data.position)) {
    errors.position = 'Veuillez saisir une fonction';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateCompanyProfile = data =>{
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.activity = !isEmpty(data.activity) ? data.activity : '';
  data.size = !isEmpty(data.size) ? data.size : '';
  data.siret = !isEmpty(data.siret) ? data.siret : '';
  data.vat_number = !isEmpty(data.vat_number) ? data.vat_number : '';
  data.admin_email = !isEmpty(data.admin_email) ? data.admin_email : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Veuillez saisir un nom';
  }

  if (data.vat_subject && Validator.isEmpty(data.vat_number)) {
    errors.vat_number = 'Veuillez saisir un n° de TVA';
  }

  if (!Object.keys(COMPANY_ACTIVITY).includes(data.activity)) {
    errors.activity = "Secteur d'activité incorrect"
  }

  if (!Object.keys(COMPANY_SIZE).includes(data.size)) {
    errors.size = "Effectif de l'entreprise incorrect"
  }

  if (data.admin_email && !Validator.isEmail(data.admin_email)) {
    errors.admin_email = "Email de l'administrateur incorrect"
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateCompanyAdmin = data =>{
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

  return {
    errors,
    isValid: isEmpty(errors),
  };
};


module.exports = {
  validateSimpleRegisterInput, validateEditProfile, validateCompanyProfile,
  validateEditProProfile, validateCompanyAdmin,
};
