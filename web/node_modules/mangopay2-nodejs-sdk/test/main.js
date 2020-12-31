var Promise = require('promise');
var expect = require('chai').expect;
var mangopay = require('../index');

var api = global.api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientApiKey: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

module.exports = api;