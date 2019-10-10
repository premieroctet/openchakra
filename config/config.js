const appName = 'myalfred';
const databaseName = 'test-myAlfred';
const serverPort = process.env.PORT || 3122;

//const apiUrl = "http://localhost:3122/";

const apiUrl = "https://myalfred.hausdivision.com/";

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
        appUrl: `https://myalfred.hausdivision.com/`
    },

    production: {
        appUrl: `https://myalfred.hausdivision.com/`
    }

}

// Public API
module.exports = {
    config: { ...completeConfig.default, ...completeConfig[process.env.NODE_ENV] },
    completeConfig
}
