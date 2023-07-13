const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ChallengeUserPipSchema=null

try {
  ChallengeUserPipSchema=require(`../plugins/${getDataModel()}/schemas/ChallengeUserPipSchema`)
  ChallengeUserPipSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ChallengeUserPipSchema ? mongoose.model('challengeUserPip', ChallengeUserPipSchema) : null
