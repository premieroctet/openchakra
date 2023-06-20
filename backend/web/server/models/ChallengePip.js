const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ChallengePipSchema=null

try {
  ChallengePipSchema=require(`../plugins/${getDataModel()}/schemas/ChallengePipSchema`)
  ChallengePipSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ChallengePipSchema ? mongoose.model('challengePip', ChallengePipSchema) : null
