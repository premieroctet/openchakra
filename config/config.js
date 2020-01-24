const appName = 'myalfred';
const databaseName = 'test-myAlfred';
const serverPort = process.env.PORT || 3122;

//const apiUrl = "http://localhost:3122/";
const apiUrl = "/";

const source=require("./client_id.json")
console.log("Source:"+JSON.stringify(source))

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
  refreshToken: "1//044sTFLFf0dFSCgYIARAAGAQSNwF-L9IrVzy4mV3DG0ndhW05lonr3ZqJh1Gr8nBS2EN0vZcviGkta29YtS8me5JR6_-aGKj7t7I",
  accessToken: "ya29.Il-6B1jFCx9LXWjr75_C5G9YWm66SFmztzJVxpfqEfY-auWbLosSCGBhZkjL_XQj_md8Zo1xPj4xj2Wq5ZpktKShPQ4G-_ibg8lmXpA-xU-InUYdQaROh95Lefnwq-CHaQ"
}

// Public API
module.exports = {
    config: { ...completeConfig.default, ...completeConfig[process.env.NODE_ENV] },
    completeConfig,
    mailConfig,
}
