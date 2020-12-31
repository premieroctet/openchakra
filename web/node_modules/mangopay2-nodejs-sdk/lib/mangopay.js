var _ = require('underscore');
var api = require('./api');

_.extend(api.prototype, {
    Log: require('./log')
});

module.exports = api;