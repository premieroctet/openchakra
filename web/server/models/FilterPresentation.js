const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let FilterPresentationSchema=null

try {
  FilterPresentationSchema=require(`./${getDataModel()}/FilterPresentationSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  FilterPresentationSchema=require(`./others/FilterPresentationSchema`)
}

FilterPresentationSchema?.plugin(mongooseLeanVirtuals)

module.exports = FilterPresentationSchema ? mongoose.model('filterPresentation', FilterPresentationSchema) : null
