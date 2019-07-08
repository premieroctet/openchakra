const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};


    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';



    if(!Validator.isEmail(data.username)) {

        errors.username = 'Email invalide';
    }
    if(Validator.isEmpty(data.username)) {
        errors.username = 'Veuillez saisir une adresse email';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Veuillez saisir un mot de passe';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
