const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let CommentSchema=null

try {
  CommentSchema=require(`../plugins/${getDataModel()}/schemas/CommentSchema`)
  CommentSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = CommentSchema ? mongoose.model('comment', CommentSchema) : null
