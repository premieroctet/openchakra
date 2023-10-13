const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let LeadSchema=null

try {
  LeadSchema=require(`../plugins/${getDataModel()}/schemas/LeadSchema`)
  LeadSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = LeadSchema ? mongoose.model('lead', LeadSchema) : null
