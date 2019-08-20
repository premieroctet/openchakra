const appName = 'myalfred'
const databaseName = 'test-myAlfred'
const serverPort = process.env.PORT || 3122;
<<<<<<< HEAD
const apiUrl = "https://myalfred.hausdivision.com/";
=======
const apiUrl = "http://myalfred.hausdivision.com/";
>>>>>>> b372e8eeef4f7ea8bad37f48501e1dc169d4a549

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
