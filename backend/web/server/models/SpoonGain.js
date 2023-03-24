const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let SpoonGainSchema=null

try {
  SpoonGainSchema=require(`../plugins/${getDataModel()}/schemas/SpoonGainSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

SpoonGainSchema?.plugin(mongooseLeanVirtuals)
module.exports = SpoonGainSchema ? mongoose.model('spoonGain', SpoonGainSchema) : null
