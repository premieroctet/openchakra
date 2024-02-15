const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let DietSchema=null

try {
  DietSchema=require(`../plugins/${getDataModel()}/schemas/DietSchema`)
  DietSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = DietSchema ? mongoose.model('diet', DietSchema) : null
