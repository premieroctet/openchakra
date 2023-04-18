const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let SpoonGainSchema=null

try {
  SpoonGainSchema=require(`../plugins/${getDataModel()}/schemas/SpoonGainSchema`)
  SpoonGainSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = SpoonGainSchema ? mongoose.model('spoonGain', SpoonGainSchema) : null
