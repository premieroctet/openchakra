const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ResetTokenSchema=null

try {
  ResetTokenSchema=require(`../plugins/${getDataModel()}/schemas/ResetTokenSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

ResetTokenSchema?.plugin(mongooseLeanVirtuals)
module.exports = ResetTokenSchema ? mongoose.model('resetToken', ResetTokenSchema) : null
