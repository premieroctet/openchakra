const Validator = require('validator');
const isEmpty = require('./is-empty');
const axios = require('axios');

module.exports = function validateShopInput(data) {
    let errors = {};

    data.welcome_message = !isEmpty(data.welcome_message) ? data.welcome_message : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.siret = !isEmpty(data.siret) ? data.siret : '';
    data.naf_ape = !isEmpty(data.naf_ape) ? data.naf_ape : '';
    const is_particular = data.is_particular;
    const is_professional = data.is_professional;
    const siret = parseInt(data.siret,10);

    if(Validator.isEmpty(data.welcome_message)) {
        errors.welcome_message = 'Welcome message is required';
    }


    if(is_particular === '0' && is_professional === '0'){
        errors.status = 'Are you particular or professional ?'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
