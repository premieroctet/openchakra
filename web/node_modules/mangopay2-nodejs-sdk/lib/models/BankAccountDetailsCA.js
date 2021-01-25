var BankAccountDetails = require('./BankAccountDetails');

var BankAccountDetailsCA = BankAccountDetails.extend({
    defaults: {
        BankName: null,
        InstitutionNumber: null,
        BranchCode: null,
        AccountNumber: null
    }
});

module.exports = BankAccountDetailsCA;