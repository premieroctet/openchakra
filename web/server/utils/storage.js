const store = require('store2')
const localStorage = require('node-localstorage').LocalStorage

module.exports = store.area('fs', localStorage('./storage'))
