const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let FilterPresentationSchema=null

try {
  FilterPresentationSchema=require(`../plugins/${getDataModel()}/schemas/FilterPresentationSchema`)
  FilterPresentationSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = FilterPresentationSchema ? mongoose.model('filterPresentation', FilterPresentationSchema) : null
