const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let SessionSchema=null

try {
  SessionSchema=require(`../plugins/${getDataModel()}/schemas/SessionSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

SessionSchema?.plugin(mongooseLeanVirtuals)
module.exports = SessionSchema ? mongoose.model('session', SessionSchema) : null
