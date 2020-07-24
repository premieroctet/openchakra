const appName = 'myalfred';
const databaseName = 'test-myAlfred-V2';
const serverPort = process.env.PORT || 3122;

const source=require("./client_id.json")

const completeConfig = {

    default: {
        appName,
        serverPort,
        databaseUrl: process.env.MONGODB_URI || `mongodb://localhost/${databaseName}`,
        jsonOptions: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    },

    development: {
	    appUrl: `http://localhost:${serverPort}`
    },

    production: {
	appUrl: `http://localhost:${serverPort}`
    }

}

const mailConfig = {
  user: "sebastien.auvray@my-alfred.io",
  clientId: source.web.client_id,
  clientSecret: source.web.client_secret,
  refreshToken: '1//040qqd968fTUmCgYIARAAGAQSNwF-L9Iry-KzNeNu-Eg4YJGYtS9_zn5K4rnt7hxvcsPvh69BEUwhoqslW3oAETeYWLWBxo8zKtk',
  accessToken: 'ya29.Il-7B9vPQ9meRKDhLu1cARHVXyGEiGiIidmgeLCB7LLszjByPxRVWJ8mw_u2AQh5ZXeUiXgPyAX9H-KjgXX7pwArP6Bp_TC1OrMR-fOFAMITK0OuOPWKjk11Z0AUhP4dxw'
}

const computeUrl= (req) => {
  return 'https://'+req.headers.host;
};

const SIRET = {
  token : 'ca27811b-126c-35db-aaf0-49aea431706e',
  siretUrl : 'https://api.insee.fr/entreprises/sirene/V3/siret',
  sirenUrl : 'https://api.insee.fr/entreprises/sirene/V3/siren',
}

// Enable.disable Google & Facebook login
const ENABLE_GF_LOGIN=false

// Public API
module.exports = {
    databaseName: databaseName,
    config: { ...completeConfig.default, ...completeConfig[process.env.NODE_ENV] },
    completeConfig,
    mailConfig,
    computeUrl,
    SIRET,
    ENABLE_GF_LOGIN
}
