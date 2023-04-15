const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')
const Event = require(`./Event`)

let CollectiveChallenge = null
try {
  if (Event) {
    const CollectiveChallengeSchema = require(`../plugins/${getDataModel()}/schemas/CollectiveChallengeSchema`)
    CollectiveChallengeSchema.plugin(require('mongoose-lean-virtuals'))
    CollectiveChallenge = Event.discriminator('collectiveChallenge', CollectiveChallengeSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = CollectiveChallenge
