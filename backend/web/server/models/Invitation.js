const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let InvitationSchema=null

try {
  InvitationSchema=require(`../plugins/${getDataModel()}/schemas/InvitationSchema`)
  InvitationSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = InvitationSchema ? mongoose.model('invitation', InvitationSchema) : null
