var BankAccountDetails = require('./BankAccountDetails');

var BankAccountDetailsGB = BankAccountDetails.extend({
    defaults: {
        AccountNumber: null,
        SortCode: null
    }
});

module.exports = BankAccountDetailsGB;