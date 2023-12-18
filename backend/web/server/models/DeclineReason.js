const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let DeclineReasonSchema=null

try {
  DeclineReasonSchema=require(`../plugins/${getDataModel()}/schemas/DeclineReasonSchema`)
  DeclineReasonSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = DeclineReasonSchema ? mongoose.model('declineReason', DeclineReasonSchema) : null
