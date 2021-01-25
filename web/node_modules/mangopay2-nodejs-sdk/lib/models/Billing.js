var EntityBase = require('./EntityBase');

var Billing = EntityBase.extend({
  defaults: {
    /**
     * The address
     */
    Address: null
  }
});

module.exports = Billing;