const {databaseName} = require('../../config/config.js');

const MONGODB = {
  mongoUri: `mongodb://localhost/${databaseName}`,
};

const JWT = {
  secretOrKey: 'secret',
};

module.exports = {
  MONGODB,
  JWT,
};
