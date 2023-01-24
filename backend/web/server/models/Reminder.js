const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ReminderSchema=null

try {
  ReminderSchema=require(`../plugins/${getDataModel()}/schemas/ReminderSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

ReminderSchema?.plugin(mongooseLeanVirtuals)
module.exports = ReminderSchema ? mongoose.model('reminder', ReminderSchema) : null
