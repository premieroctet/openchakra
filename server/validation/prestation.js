const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePrestationInput(data) {
    let errors = {};


    data.label = !isEmpty(data.label) ? data.label : '';
    data.price = !isEmpty(data.price) ? data.price : '';


    if(Validator.isEmpty(data.label)) {
        errors.label = 'Label field is required';
    }

    if(Validator.isEmpty(data.price)) {
        errors.price = 'Price field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
};
