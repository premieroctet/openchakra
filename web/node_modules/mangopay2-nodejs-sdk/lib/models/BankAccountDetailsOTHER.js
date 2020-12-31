var BankAccountDetails = require('./BankAccountDetails');

var BankAccountDetailsOTHER = BankAccountDetails.extend({
    defaults: {
        Type: null,
        /**
         * The Country associate to the BankAccount,
         * ISO 3166-1 alpha-2 format is expected
         */
        Country: null,
        BIC: null,
        AccountNumber: null
    }
});

module.exports = BankAccountDetailsOTHER;