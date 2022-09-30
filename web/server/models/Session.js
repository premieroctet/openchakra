const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let SessionSchema=null

try {
  SessionSchema=require(`./${getDataModel()}/SessionSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  SessionSchema=require(`./others/SessionSchema`)
}

SessionSchema?.plugin(mongooseLeanVirtuals)
module.exports = SessionSchema ? mongoose.model('session', SessionSchema) : null
