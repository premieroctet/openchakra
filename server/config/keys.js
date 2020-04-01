const {databaseName} = require('../../config/config.js')

module.exports = {
    mongoUri: `mongodb://localhost/${databaseName}`,
    secretOrKey: 'secret',
};
