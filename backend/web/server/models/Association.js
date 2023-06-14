const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let AssociationSchema=null

try {
  AssociationSchema=require(`../plugins/${getDataModel()}/schemas/AssociationSchema`)
  AssociationSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = AssociationSchema ? mongoose.model('association', AssociationSchema) : null
