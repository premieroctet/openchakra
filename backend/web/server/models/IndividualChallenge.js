const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let IndividualChallenge = null
try {
  const Event = require(`./Event`)
  if (Event) {
    const IndividualChallengeSchema = require(`../plugins/${getDataModel()}/schemas/IndividualChallengeSchema`)
    IndividualChallengeSchema.plugin(require('mongoose-lean-virtuals'))
    IndividualChallenge = Event.discriminator('individualChallenge', IndividualChallengeSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = IndividualChallenge
