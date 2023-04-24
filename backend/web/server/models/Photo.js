const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let PhotoSchema=null

try {
  PhotoSchema=require(`../plugins/${getDataModel()}/schemas/PhotoSchema`)
  PhotoSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = PhotoSchema ? mongoose.model('photo', PhotoSchema) : null
