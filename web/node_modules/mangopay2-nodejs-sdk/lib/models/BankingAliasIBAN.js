var BankingAlias = require('./BankingAlias');

var BankingAliasIBAN = BankingAlias.extend({
    defaults: {
        /**
         * The type of banking alias (note that only IBAN is available at present)
         */
        Type: 'IBAN',

        /**
         * Custom data that you can add to this item
         */
        IBAN: null,

        /**
         * Custom data that you can add to this item
         */
         BIC: null,

         /**
          * The country
          */
         Country: null
    }
});

module.exports = BankingAliasIBAN;
