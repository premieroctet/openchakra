const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ChartPointSchema=null

try {
  ChartPointSchema=require(`../plugins/${getDataModel()}/schemas/ChartPointSchema`)
  ChartPointSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ChartPointSchema ? mongoose.model('chartPoint', ChartPointSchema) : null
