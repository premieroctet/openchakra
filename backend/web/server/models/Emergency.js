const {getDataModel}=require('../../config/config')

let Emergency = null

try {
  const Content = require(`./Content`)
  if (Content) {
    const EmergencySchema=require(`../plugins/${getDataModel()}/schemas/EmergencySchema`)
    EmergencySchema.plugin(require('mongoose-lean-virtuals'))
    Emergency = Content.discriminator('emergency', EmergencySchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = Emergency
