const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')
const Event = require(`./Event`)

let Webinar = null
try {
  if (Event) {
    const WebinarSchema = require(`../plugins/${getDataModel()}/schemas/WebinarSchema`)
    WebinarSchema.plugin(mongooseLeanVirtuals)
    Webinar = Event.discriminator('webinar', WebinarSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = CollectiveChallenge
