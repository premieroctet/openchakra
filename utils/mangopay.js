const mangopay = require('mangopay2-nodejs-sdk');

const mangoApi = new mangopay({
    clientId: 'testmyalfredv2',
    clientApiKey: 'cSNrzHm5YRaQxTdZVqWxWAnyYDphvg2hzBVdgTiAOLmgxvF2oN',
});


module.exports={mangoApi};
