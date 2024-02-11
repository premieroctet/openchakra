const {getDataModel}=require('../../config/config')
const { ROLE_CUSTOMER } = require('../plugins/smartdiet/consts')

let Patient = null

try {
  const User = require(`./User`)
  if (User) {
    const PatientSchema=require(`../plugins/${getDataModel()}/schemas/PatientSchema`)
    PatientSchema.plugin(require('mongoose-lean-virtuals'))
    Patient = User.discriminator(ROLE_CUSTOMER, PatientSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = Patient
