const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ReminderSchema=null

try {
  ReminderSchema=require(`../plugins/${getDataModel()}/schemas/ReminderSchema`)
  ReminderSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ReminderSchema ? mongoose.model('reminder', ReminderSchema) : null
