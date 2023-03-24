const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let TrophySchema=null

try {
  TrophySchema=require(`../plugins/${getDataModel()}/schemas/TrophySchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

TrophySchema?.plugin(mongooseLeanVirtuals)
module.exports = TrophySchema ? mongoose.model('trophy', TrophySchema) : null
