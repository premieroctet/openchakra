const {databaseName} = require('../../config/config.js');

const MONGODB = {
  mongoUri: `mongodb://localhost/${databaseName}`,
};

const JWT = {
  secretOrKey: 'secret',
};

const GOOGLE_TOKENS = {
  CLIENT_ID: '262922879630-nclt6at6dha15i79aqglu5otun79tpjf.apps.googleusercontent.com',
  CLIENT_SECRET: 'gLBU7-3yLcR6LJv9v2NiTUVz',
};

const FACEBOOK_TOKENS = {
  CLIENT_ID: '2365098057136517',
  CLIENT_SECRET: '7ac9ca218feab08c11b221a37c4d501f',
};


module.exports = {
  MONGODB,
  JWT,
  GOOGLE_TOKENS,
  FACEBOOK_TOKENS,
};
