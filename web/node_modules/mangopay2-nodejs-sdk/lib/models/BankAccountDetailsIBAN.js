var BankAccountDetails = require('./BankAccountDetails');

var BankAccountDetailsIBAN = BankAccountDetails.extend({
    defaults: {
        IBAN: null,
        BIC: null
    }
});

module.exports = BankAccountDetailsIBAN;