const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let InterestSchema=null

try {
  InterestSchema=require(`../plugins/${getDataModel()}/schemas/InterestSchema`)
  InterestSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = InterestSchema ? mongoose.model('interest', InterestSchema) : null
