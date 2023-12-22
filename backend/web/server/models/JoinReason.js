const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let JoinReasonSchema=null

try {
  JoinReasonSchema=require(`../plugins/${getDataModel()}/schemas/JoinReasonSchema`)
  JoinReasonSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = JoinReasonSchema ? mongoose.model('joinReason', JoinReasonSchema) : null
