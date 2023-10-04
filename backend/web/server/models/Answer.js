const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let AnswerSchema=null

try {
  AnswerSchema=require(`../plugins/${getDataModel()}/schemas/AnswerSchema`)
  AnswerSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = AnswerSchema ? mongoose.model('answer', AnswerSchema) : null
