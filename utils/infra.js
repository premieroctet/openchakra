const fs = require('fs');

const getHost = () => {
    try {
        var data = fs.readFileSync('host.txt', 'utf8');
        return data;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {
    getHost
}