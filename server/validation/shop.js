const Validator = require('validator');
const isEmpty = require('./is-empty');
const axios = require('axios');

module.exports = function validateShopInput(data) {
    let errors = {};


    data.id_recto = !isEmpty(data.id_recto) ? data.id_recto : '';
    data.id_verso = !isEmpty(data.id_verso) ? data.id_verso : '';
    data.welcome_message = !isEmpty(data.welcome_message) ? data.welcome_message : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.siret = !isEmpty(data.siret) ? data.siret : '';
    data.naf_ape = !isEmpty(data.naf_ape) ? data.naf_ape : '';
    data.vat_number = !isEmpty(data.vat_number) ? data.vat_number : '';
    data.self_employed = !isEmpty(data.self_employed) ? data.self_employed : '';
    data.individual_company = !isEmpty(data.individual_company) ? data.individual_company : '';
    const is_particular = data.is_particular;
    const is_professional = data.is_professional;
    const siret = parseInt(data.siret,10);




    if(Validator.isEmpty(data.id_recto)) {
        errors.id_recto = 'ID card is required';
    }

    if(Validator.isEmpty(data.id_verso)) {
        errors.id_verso = 'ID card is required';
    }

    if(Validator.isEmpty(data.welcome_message)) {
        errors.welcome_message = 'Welcome message is required';
    }


    if(is_particular === '0' && is_professional === '0'){
        errors.status = 'Are you particular or professional ?'
    }


    if(data.is_professional === '1') {

            if((Validator.isEmpty(data.self_employed)&& Validator.isEmpty(data.individual_company)) || (data.self_employed === '0' && data.individual_company === '0')){
                errors.pro = 'Professionnal status is required'
            }

        if(Validator.isEmpty(data.siret)) {
            errors.siret = 'Siret is required';
        }
        if(!Validator.isEmpty(data.siret)) {

            async function getSiretInfos() {
                try {
                    const response = await axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/siret/${siret}`);
                    console.log('ok');

                } catch (error) {
                    console.log(error.response.statusText);


                }


            }
            getSiretInfos().then(res => {
                if(!res) {
                    errors.siret_wrong = 'Invalid siret';

                }
            });

        }
        if(Validator.isEmpty(data.naf_ape)) {
            errors.naf_ape = 'naf_ape is required';
        }
        if(Validator.isEmpty(data.vat_number)) {
            errors.vat_number = 'TVA is required';
        }
        if(Validator.isEmpty(data.name)) {
            errors.name = 'Company name is required';
        }
    }






    return {
        errors,
        isValid: isEmpty(errors)
    }
};
