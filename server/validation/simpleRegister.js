const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSimpleRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';



    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.firstname)) {
        errors.firstname = 'Firstname field is required';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if(!Validator.isLength(data.password, {min: 8, max: 30})){
        errors.password = 'Password must be at least 8 characters';
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required';
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Password must match';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
};


