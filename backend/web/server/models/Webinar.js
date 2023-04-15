const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')
const Event = require(`./Event`)

let Webinar = null
try {
  if (Event) {
    const WebinarSchema = require(`../plugins/${getDataModel()}/schemas/WebinarSchema`)
    WebinarSchema.plugin(require('mongoose-lean-virtuals'))
    Webinar = Event.discriminator('webinar', WebinarSchema)
  }
}
catch (err) {
  console.log('no webinar')
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = Webinar
