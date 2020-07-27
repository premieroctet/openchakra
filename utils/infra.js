const fs = require('fs');

const getHost = () => {
    try {
        return fs.readFileSync('host.txt', 'utf8');
    }
    catch (err) {
        console.error(err);
        return null;
    }
};

module.exports = {
    getHost
};
