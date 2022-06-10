const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let ServiceUserSchema=null

try {
  ServiceUserSchema=require(`./${getDataModel()}/ServiceUserSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ServiceUserSchema ? mongoose.model('serviceUser', ServiceUserSchema) : null
