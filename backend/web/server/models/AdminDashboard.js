const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let AdminDashboardSchema=null

try {
  AdminDashboardSchema=require(`../plugins/${getDataModel()}/schemas/AdminDashboardSchema`)
  AdminDashboardSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = AdminDashboardSchema ? mongoose.model('adminDashboard', AdminDashboardSchema) : null
