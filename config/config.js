const appName = 'myalfred';
const databaseName = 'test-myAlfred';
const serverPort = process.env.PORT || 5000;

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
        appUrl: `http://localhost:${serverPort}/`
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
