const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let SpoonSchema=null

try {
  SpoonSchema=require(`../plugins/${getDataModel()}/schemas/SpoonSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

SpoonSchema?.plugin(mongooseLeanVirtuals)
module.exports = SpoonSchema ? mongoose.model('spoon', SpoonSchema) : null
