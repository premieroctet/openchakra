const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let SpoonSchema=null

try {
  SpoonSchema=require(`../plugins/${getDataModel()}/schemas/SpoonSchema`)
  SpoonSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = SpoonSchema ? mongoose.model('spoon', SpoonSchema) : null
