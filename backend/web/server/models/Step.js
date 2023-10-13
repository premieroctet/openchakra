const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let StepSchema=null

try {
  StepSchema=require(`../plugins/${getDataModel()}/schemas/StepSchema`)
  StepSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = StepSchema ? mongoose.model('step', StepSchema) : null
