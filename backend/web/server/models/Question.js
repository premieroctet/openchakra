const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let QuestionSchema=null

try {
  QuestionSchema=require(`../plugins/${getDataModel()}/schemas/QuestionSchema`)
  QuestionSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = QuestionSchema ? mongoose.model('question', QuestionSchema) : null
