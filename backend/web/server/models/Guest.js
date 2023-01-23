const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let GuestSchema=null

try {
  GuestSchema=require(`../plugins/${getDataModel()}/schemas/GuestSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

GuestSchema?.plugin(mongooseLeanVirtuals)
module.exports = GuestSchema ? mongoose.model('guest', GuestSchema) : null
