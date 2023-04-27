const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let UserSessionDataSchema=null

try {
  UserSessionDataSchema=require(`../plugins/${getDataModel()}/schemas/UserSessionDataSchema`)
  UserSessionDataSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = UserSessionDataSchema ? mongoose.model('userSessionData', UserSessionDataSchema) : null
