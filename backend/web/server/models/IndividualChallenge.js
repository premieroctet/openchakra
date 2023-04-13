const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let IndividualChallenge = null
try {
  const Event = require(`./Event`)
  if (Event) {
    const IndividualChallengeSchema = require(`../plugins/${getDataModel()}/schemas/IndividualChallengeSchema`)
    IndividualChallengeSchema.plugin(mongooseLeanVirtuals)
    IndividualChallenge = Event.discriminator('individualChallenge', IndividualChallengeSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = IndividualChallenge
