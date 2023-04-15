const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let TrophySchema=null

try {
  TrophySchema=require(`../plugins/${getDataModel()}/schemas/TrophySchema`)
  TrophySchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = TrophySchema ? mongoose.model('trophy', TrophySchema) : null
