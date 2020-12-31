var EntityBase = require('./EntityBase');

var BankAccount = EntityBase.extend({
    defaults: {
        UserId: null,

        Type: null,

        OwnerName: null,

        OwnerAddress: null,

        Details: null,

        Active: null
    },

    getDependsObjects: function() {
        return [
            {
                dependsPropertyName: 'Type',
                propertyName: 'Details',
                propertyValueMapping: {
                    'IBAN': require('./BankAccountDetailsIBAN'),
                    'GB': require('./BankAccountDetailsGB'),
                    'US': require('./BankAccountDetailsUS'),
                    'CA': require('./BankAccountDetailsCA'),
                    'OTHERS': require('./BankAccountDetailsOTHER')
                }
            }
        ]
    },

    /**
     * Get array with read-only properties
     * @return {Array} List of string properties
     */
    getReadOnlyProperties: function () {
        var properties = EntityBase.prototype.getReadOnlyProperties();
        properties.push('UserId', 'Type');
        return properties;
    }
});

module.exports = BankAccount;