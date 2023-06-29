const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let CoachingSchema=null

try {
  CoachingSchema=require(`../plugins/${getDataModel()}/schemas/CoachingSchema`)
  CoachingSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = CoachingSchema ? mongoose.model('coaching', CoachingSchema) : null
