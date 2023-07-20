const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let DietCommentSchema=null

try {
  DietCommentSchema=require(`../plugins/${getDataModel()}/schemas/DietCommentSchema`)
  DietCommentSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = DietCommentSchema ? mongoose.model('dietComment', DietCommentSchema) : null
