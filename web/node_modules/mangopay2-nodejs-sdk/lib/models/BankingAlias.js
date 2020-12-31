var EntityBase = require('./EntityBase');

var BankingAlias = EntityBase.extend({
    defaults: {
        /**
         * Custom data that you can add to this item
         */
        Tag: null,

        /**
         * The User ID who was credited
         */
        CreditedUserId: null,

        /**
         * The ID of a wallet
         */
        WalletId: null,

        /**
         * The type of banking alias (note that only IBAN is available at present)
         */
        Type: null,

        /**
         * The name of the owner of the bank account
         */
        OwnerName: null,

        /**
         * Wether the banking alias is active or not
         */
        Active: true
    }
});

module.exports = BankingAlias;
