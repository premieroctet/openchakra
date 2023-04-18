const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let SessionSchema=null

try {
  SessionSchema=require(`../plugins/${getDataModel()}/schemas/SessionSchema`)
  SessionSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = SessionSchema ? mongoose.model('session', SessionSchema) : null
