const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let DeviceSchema=null

try {
  DeviceSchema=require(`../plugins/${getDataModel()}/schemas/DeviceSchema`)
  DeviceSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = DeviceSchema ? mongoose.model('device', DeviceSchema) : null
