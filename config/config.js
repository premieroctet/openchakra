const appName = 'myalfred';
const databaseName = 'test-myAlfred';
const serverPort = process.env.PORT || 3122;

//const apiUrl = "http://localhost:3122/";
const apiUrl = "/";

const source=require("./client_id.json")

const completeConfig = {

    default: {
        appName,
        serverPort,
        apiUrl,
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

// Public API
module.exports = {
    config: { ...completeConfig.default, ...completeConfig[process.env.NODE_ENV] },
    completeConfig,
    mailConfig,
}
