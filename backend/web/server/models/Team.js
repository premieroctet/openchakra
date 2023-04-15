const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let TeamSchema=null

try {
  TeamSchema=require(`../plugins/${getDataModel()}/schemas/TeamSchema`)
  TeamSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = TeamSchema ? mongoose.model('team', TeamSchema) : null
