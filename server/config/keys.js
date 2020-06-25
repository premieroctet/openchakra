const {databaseName} = require('../../config/config.js')

const MONGODB = {
    mongoUri: `mongodb://localhost/${databaseName}`
}

const JWT = {
    secretOrKey: 'secret'
}

const GOOGLE_TOKENS = {
    GOOGLE_CLIENT_ID: "262922879630-nclt6at6dha15i79aqglu5otun79tpjf.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "gLBU7-3yLcR6LJv9v2NiTUVz"
}


module.exports = {
    MONGODB,
    JWT,
    GOOGLE_TOKENS
};
