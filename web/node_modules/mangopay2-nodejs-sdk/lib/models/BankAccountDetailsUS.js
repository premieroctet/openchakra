var BankAccountDetails = require('./BankAccountDetails');

var BankAccountDetailsOTHER = BankAccountDetails.extend({
    defaults: {
        AccountNumber: null,
        ABA: null,
        /**
         * DepositAccountType { CHECKING, SAVINGS }
         */
        DepositAccountType: null
    }
});

module.exports = BankAccountDetailsOTHER;