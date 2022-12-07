const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let EventLogSchema=null

try {
  EventLogSchema=require(`./${getDataModel()}/EventLogSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  EventLogSchema=require(`./others/EventLogSchema`)
}

EventLogSchema?.plugin(mongooseLeanVirtuals)
module.exports = EventLogSchema ? mongoose.model('eventLog', EventLogSchema) : null
